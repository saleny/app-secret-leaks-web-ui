import { Badge } from 'react-bootstrap';
import { STATUS_COLORS } from '../../utils/constants';

const ScanStatusBadge = ({ status }) => {
  return (
    <Badge bg={STATUS_COLORS[status] || 'secondary'}>
      {status.toUpperCase()}
    </Badge>
  );
};

export default ScanStatusBadge;