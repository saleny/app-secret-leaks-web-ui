import React, { useEffect, useState } from 'react';
import { Table, Badge } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getProjectScans } from '../../services/projects';
import { formatDate } from '../utils/helpers';

const ScanList = () => {
  const { projectId } = useParams();
  const [scans, setScans] = useState([]);

  useEffect(() => {
    const fetchScans = async () => {
      const data = await getProjectScans(projectId);
      setScans(data);
    };
    fetchScans();
  }, [projectId]);

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Scan Date</th>
          <th>Status</th>
          <th>Findings</th>
        </tr>
      </thead>
      <tbody>
        {scans.map(scan => (
          <tr key={scan.id}>
            <td>{formatDate(scan.scanned_at)}</td>
            <td>
              <Badge bg={scan.status === 'completed' ? 'success' : 'danger'}>
                {scan.status}
              </Badge>
            </td>
            <td>{scan.findings?.length || 0} issues found</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ScanList;