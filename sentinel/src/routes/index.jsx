// src/routes/AppRoutes.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthLayout from '@/layouts/AuthLayout';
import MainLayout from '@/layouts/MainLayout';
import Home from '../pages/Home';
import PrivateRoute from './PrivateRoutes';
import PublicRoute from './PublicRoutes';
import Login from '../components/public/Login';

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<PublicRoute><MainLayout><Login /></MainLayout></PublicRoute>} />
      <Route path="/" element={<PrivateRoute><AuthLayout><Home/></AuthLayout></PrivateRoute>} />
      {/* Add more routes as needed */}
    </Routes>
  </Router>
);

export default AppRoutes;

