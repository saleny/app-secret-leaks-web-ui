import { createContext, useContext, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const addAlert = (message, type = 'info', timeout = 5000) => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, type }]);

    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, timeout);
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      {children}
      <div className="alert-container">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            variant={alert.type}
            dismissible
            onClose={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
          >
            {alert.message}
          </Alert>
        ))}
      </div>
    </AlertContext.Provider>
  );
};

export const useAlert = () => useContext(AlertContext);