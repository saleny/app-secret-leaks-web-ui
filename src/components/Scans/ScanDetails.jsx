import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Card } from 'react-bootstrap';
import { getScanDetails } from '../../services/scans';

const ScanDetails = () => {
  const { id } = useParams();
  const [scan, setScan] = useState(null);

  useEffect(() => {
    const fetchScan = async () => {
      const data = await getScanDetails(id);
      setScan(data);
    };
    fetchScan();
  }, [id]);

  if (!scan) return <div>Loading...</div>;

  return (
    <Card>
      <Card.Header>Scan Results</Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Rule ID</th>
              <th>Description</th>
              <th>File</th>
              <th>Line</th>
            </tr>
          </thead>
          <tbody>
            {scan.findings?.map((finding, index) => (
              <tr key={index}>
                <td>{finding.ruleId}</td>
                <td>{finding.description}</td>
                <td>{finding.file}</td>
                <td>{finding.line}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default ScanDetails;