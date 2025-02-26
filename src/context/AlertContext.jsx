import { createContext, useContext, useState } from 'react';
import Alert from 'react-bootstrap/Alert';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (message, variant = 'primary') => {
    const id = Date.now();
    setAlerts(prev => [...prev, { id, message, variant }]);

    setTimeout(() => {
      setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, 5000);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="alert-container">
        {alerts.map(alert => (
          <Alert
            key={alert.id}
            variant={alert.variant}
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