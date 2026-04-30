import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Detail from './pages/Detail';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={setCurrentPage} />;
      case 'search':
        return <Search onNavigate={setCurrentPage} />;
      case 'favorites':
        return <Favorites onNavigate={setCurrentPage} />;
      case 'detail':
        return <Detail onBack={() => setCurrentPage('home')} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div>
      <Navbar onNavigate={setCurrentPage} />
      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
