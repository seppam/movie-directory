import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from '../components/MovieCard';

const Favorites = ({ onNavigate }) => {
  const favorites = useSelector((state) => state.favorites);

  return (
    <div style={{ padding: '20px' }}>
      <style>{`
        .movie-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .movie-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 560px) {
          .movie-grid { grid-template-columns: repeat(2, 1fr); }
        }
        .movie-grid > * { min-width: 0; }
      `}</style>

      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
        ❤️ Film Favoritmu
      </h2>

      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777', marginTop: '40px' }}>
          Belum ada film favorit. Tambahkan dari halaman film!
        </p>
      ) : (
        <div className="movie-grid">
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
