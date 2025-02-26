import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';

const ProjectCard = ({ project }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body className="d-flex flex-column">
        <Card.Title className="mb-3">
          {project.project_name}
          <Badge bg="secondary" className="ms-2">
            {project.scan_results?.length || 0} scans
          </Badge>
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted small">
          Created: {formatDate(project.created_at)}
        </Card.Subtitle>
        <Card.Text className="text-truncate flex-grow-1">
          <i className="bi bi-git me-2"></i>
          {project.repo_url}
        </Card.Text>
        <div className="d-grid">
          <Button
            as={Link}
            to={`/projects/${project.id}`}
            variant="outline-primary"
            size="sm"
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;