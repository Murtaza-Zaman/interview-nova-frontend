/**
 * @file frontend/src/router/AppRouter.jsx
 * @description Application route table and nested layout route composition.
 */
import App from '../App.jsx';
import AiHome from '../features/ai/pages/AiHome.jsx';
import InterviewReport from '../features/ai/pages/InterviewReport.jsx';
import Login from '../features/auth/pages/Login.jsx';
import Register from '../features/auth/pages/Register.jsx';
import { GuestRoute } from './RouteGuards.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><App /></ProtectedRoute>} />
        <Route path="/ai" element={<ProtectedRoute><AiHome /></ProtectedRoute>} />
        <Route path="/interview-report/*" element={<ProtectedRoute><InterviewReport /></ProtectedRoute>} />
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />
      </Routes>
    </Router>
  );
};