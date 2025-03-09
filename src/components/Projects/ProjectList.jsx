import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import ProjectCard from './ProjectCard';
import { getProjects } from '../../services/projects';
import Loader from '../UI/Loader';

const ProjectList = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]); // Всегда инициализируем массивом
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await getProjects(user?.isAdmin);
        // Гарантируем, что данные - массив
        const data = response?.data ?? [];
        setProjects(data);
      } catch (err) {
        setError(err.message || 'Ошибка загрузки проектов');
        setProjects([]); // Сбрасываем на пустой массив при ошибке
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [user?.isAdmin]);

  if (loading) return <Loader />;

  return (
    <Container className="mt-4">
      {error && <Alert variant="danger">{error}</Alert>}
      <Row className="g-4">
        {/* Проверяем наличие проектов перед рендерингом */}
        {projects.length > 0 ? (
          projects.map(project => (
            <Col key={project.id} xs={12} md={6} lg={4}>
              <ProjectCard project={project} />
            </Col>
          ))
        ) : (
          <Col>
            <Alert variant="info">Нет доступных проектов</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProjectList;