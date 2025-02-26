import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import ProjectCard from './ProjectCard';
import { getProjects } from '../../services/projects';
import { useAuth } from '../../context/AuthContext';
import { useAlert } from '../../context/AlertContext';
import Loader from '../UI/Loader';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError(err.message);
        showAlert('Failed to load projects', 'danger');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchProjects();
    }
  }, [user, showAlert]);

  if (loading) return <Loader />;

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Row className="g-4">
        {projects.map(project => (
          <Col key={project.id} xs={12} md={6} lg={4}>
            <ProjectCard project={project} />
          </Col>
        ))}
        {projects.length === 0 && (
          <Col>
            <Alert variant="info">No projects found. Create your first project!</Alert>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default ProjectList;