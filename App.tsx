import React from 'react';
import { UserProvider } from './contexts/UserContext';
import { MainDashboard } from './components/MainDashboard';

function App() {
  return (
    <UserProvider>
      <MainDashboard />
    </UserProvider>
  );
}

export default App;
