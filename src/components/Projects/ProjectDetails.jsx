import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Tab, Tabs } from 'react-bootstrap';
import ScanList from '../Scans/ScanList';
import { getProject } from '../../services/projects';

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
        try {
          const data = await getProject(projectId);
          setProject(data);
        } catch (err) {

        }
    };
    fetchProject();
  }, [projectId]);


  if (!project) return <div>Loading...</div>;

  return (
    <Card>
      <Card.Header>
        <h4>{project.project_name}</h4>
        <small className="text-muted">{project.repo_url}</small>
      </Card.Header>
      <Card.Body>
        <Tabs defaultActiveKey="scans">
          <Tab eventKey="scans" title="Scan History">
            <ScanList />
          </Tab>
          <Tab eventKey="settings" title="Settings">
            <div className="mt-3">
              Project Settings (TODO)
            </div>
          </Tab>
        </Tabs>
      </Card.Body>
    </Card>
  );
};


export default ProjectDetails;