
import React from 'react';
import Header from '@/components/Layout/Header';
import ChatInterface from '@/components/Chat/ChatInterface';

const Chat = () => {
  // Mock user data
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Free Plan'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />
      <main className="flex-1 flex flex-col">
        <ChatInterface />
      </main>
    </div>
  );
};

export default Chat;
