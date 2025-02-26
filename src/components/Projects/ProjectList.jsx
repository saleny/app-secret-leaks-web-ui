import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useAlert } from '../../context/AlertContext'; // Добавьте этот импорт
import ProjectCard from './ProjectCard';
import { getProjects } from '../../services/projects';
import Loader from '../UI/Loader';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { showAlert } = useAlert(); // Получаем функцию из контекста

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
        showAlert('Failed to load projects', 'danger'); // Правильное использование
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [showAlert]); // Добавляем зависимость

  if (loading) return <Loader />;

  return (
    <Container className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="g-4">
        {projects.map(project => (
          <Col key={project.id} xs={12} md={6} lg={4}>
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProjectList;