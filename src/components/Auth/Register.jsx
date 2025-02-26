import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import api from '../../services/api';
import { useAlert } from '../../context/AlertContext';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user'
  });
  const { showAlert } = useAlert();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/users/', formData);
      showAlert('User created successfully!', 'success');
    } catch (error) {
      showAlert('Registration failed: ' + error.response?.data?.detail, 'danger');
    }
  };

  return (
    <div className="register-form">
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;