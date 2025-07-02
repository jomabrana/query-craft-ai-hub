
import React from 'react';
import Header from '@/components/Layout/Header';
import BenchmarksDashboard from '@/components/Benchmarks/BenchmarksDashboard';

const Benchmarks = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Free Plan'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BenchmarksDashboard />
      </main>
    </div>
  );
};

export default Benchmarks;
