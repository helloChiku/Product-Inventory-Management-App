// src/App.tsx or main router file
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardPage from './pages/Dashboard';


const App = () => {
  

  return (
    <Router>
      <Toaster  position="bottom-center"
  reverseOrder={false} />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={ <Navigate to="/dashboard" />}
        />
       

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={
           
              <DashboardPage />
           
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
