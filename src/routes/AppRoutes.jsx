import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import ProjectList from '../components/Projects/ProjectList';
import ProjectCreate from '../components/Projects/ProjectCreate';
import ProjectDetails from '../components/Projects/ProjectDetails';
import ScanDetails from '../components/Scans/ScanDetails';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<ProjectList />} />
        <Route path="/projects/create" element={<ProjectCreate />} />
        <Route path="/projects/:projectId" element={<ProjectDetails />} />
        <Route path="/scans/:id" element={<ScanDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;