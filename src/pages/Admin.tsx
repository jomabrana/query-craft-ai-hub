
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from '@/components/Layout/Header';
import ProvidersPanel from '@/components/Admin/ProvidersPanel';
import AnalyticsDashboard from '@/components/Admin/AnalyticsDashboard';

const Admin = () => {
  // Mock admin user data
  const adminUser = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header isAdmin={true} user={adminUser} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<AnalyticsDashboard />} />
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/providers" element={<ProvidersPanel />} />
        </Routes>
      </main>
    </div>
  );
};

export default Admin;
