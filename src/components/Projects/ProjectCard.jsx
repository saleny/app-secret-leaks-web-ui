import { Badge } from 'react-bootstrap';
import ProjectDelete from './ProjectDelete';
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';

const ProjectCard = ({ project, onDelete }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <h5 className="card-title mb-1">
              {project.project_name}
              <Badge bg="secondary" className="ms-2">
                v1.0
              </Badge>
            </h5>
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-decoration-none"
            >
              <small className="text-muted">
                <i className="bi bi-link-45deg me-1"></i>
                {project.repo_url}
              </small>
            </a>
          </div>
          <ProjectDelete
            projectId={project.id}
            ownerId={project.ownerId}
            onDelete={onDelete}
          />
        </div>

        <div className="mt-3">
          <div className="d-flex gap-2 text-muted">
            <small>
              <i className="bi bi-clock-history me-1"></i>
              {formatDistanceToNow(new Date(project.created_at), {
                addSuffix: true,
                locale: ru
              })}
            </small>
            <small>
              <i className="bi bi-shield-fill-check me-1"></i>
              {project.scan_count || 0} сканирований
            </small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;