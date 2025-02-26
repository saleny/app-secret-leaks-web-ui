import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../services/api';

const ProjectCreate = () => {
  const [repoUrl, setRepoUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects/', { repo_url: repoUrl });
      alert('Project created successfully!');
      setRepoUrl('');
    } catch (error) {
      alert('Error creating project');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Repository URL</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter GitHub URL"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Project
      </Button>
    </Form>
  );
};

export default ProjectCreate;