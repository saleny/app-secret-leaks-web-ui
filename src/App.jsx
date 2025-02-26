import { AuthProvider } from './context/AuthContext';
import { AlertProvider } from './context/AlertContext';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/UI/Navbar';
import Footer from './components/UI/Footer';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Navbar />
        <div className="container mt-4">
          <AppRoutes />
        </div>
        <Footer />
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;