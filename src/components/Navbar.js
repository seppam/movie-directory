import React from 'react';

const Navbar = ({ onNavigate }) => {
  return (
    <nav style={navStyle}>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>🎬 MovieMania</div>
      <div style={menuStyle}>
        <button onClick={() => onNavigate('home')} style={navButtonStyle}>Home</button>
        <button onClick={() => onNavigate('search')} style={navButtonStyle}>Search</button>
        <button onClick={() => onNavigate('favorites')} style={navButtonStyle}>Favorites</button>
      </div>
    </nav>
  );
};

// --- Styling dengan Flexbox ---
const navStyle = {
  display: 'flex',
  justifyContent: 'space-between', // Judul di kiri, Menu di kanan
  alignItems: 'center',
  padding: '15px 50px',
  backgroundColor: '#1a1a1a',
  color: 'white',
  boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
};

const menuStyle = {
  display: 'flex',
  gap: '20px' // Jarak antar tombol
};

const navButtonStyle = {
  backgroundColor: 'transparent',
  color: 'white',
  border: '1px solid #555',
  padding: '8px 15px',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: '0.3s'
};

export default Navbar;