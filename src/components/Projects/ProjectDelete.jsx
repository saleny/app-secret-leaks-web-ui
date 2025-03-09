import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { deleteProject } from '../../services/projects';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ProjectDelete = ({ projectId, ownerId, onDelete }) => {
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (!user?.is_admin && user?.id !== ownerId) return null;

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteProject(projectId);
      onDelete(projectId);
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setIsDeleting(false);
      setShowModal(false);
    }
  };

  return (
    <>
      <Button
        variant="outline-danger"
        onClick={() => setShowModal(true)}
        size="sm"
        className="mt-2"
      >
        <i className="bi bi-trash"></i> Удалить
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Подтверждение удаления</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Вы уверены, что хотите навсегда удалить этот проект?</p>
          <small className="text-muted">
            Все связанные сканирования также будут удалены
          </small>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={isDeleting}
          >
            Отмена
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                />
                Удаление...
              </>
            ) : 'Да, удалить'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectDelete;