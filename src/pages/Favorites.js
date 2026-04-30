import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';

const Favorites = ({ onNavigate }) => {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>❤️ Film Favoritmu</h2>

      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777', marginTop: '40px' }}>
          Belum ada film favorit. Tambahkan dari halaman film!
        </p>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {favorites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
