import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../store/actions/movieActions';

const Detail = ({ onBack }) => {
  const dispatch = useDispatch();
  const movie = useSelector((state) => state.selectedMovie);
  const favorites = useSelector((state) => state.favorites);

  if (!movie || movie.Response === 'False') return <p style={{ padding: '20px' }}>Film tidak ditemukan.</p>;

  const isFavorite = favorites.some((f) => f.imdbID === movie.imdbID);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(movie));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <button
        onClick={onBack}
        style={{
          marginBottom: '20px',
          cursor: 'pointer',
          padding: '8px 16px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          backgroundColor: '#f0f0f0',
        }}
      >
        &#8592; Kembali
      </button>

      <div style={containerStyle}>
        <div style={leftStyle}>
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450'}
            alt={movie.Title}
            style={posterStyle}
          />
        </div>

        <div style={rightStyle}>
          <h1 style={{ marginBottom: '5px' }}>{movie.Title}</h1>
          <p style={{ color: '#666', marginTop: 0 }}>{movie.Year} &bull; {movie.Genre}</p>

          <div style={metaRowStyle}>
            <span>⭐ {movie.imdbRating}/10</span>
            <span>🕒 {movie.Runtime}</span>
            <span>🌍 {movie.Country}</span>
          </div>

          {movie.Writer && movie.Writer !== 'N/A' && (
            <p><strong>Writer:</strong> {movie.Writer}</p>
          )}
          <p><strong>Aktor:</strong> {movie.Actors}</p>

          <hr style={{ margin: '15px 0' }} />

          <h3>Sinopsis</h3>
          <p style={{ lineHeight: 1.6 }}>{movie.Plot}</p>

          <button
            onClick={handleToggleFavorite}
            style={isFavorite ? unfavButtonStyle : favButtonStyle}
          >
            {isFavorite ? '💔 Hapus dari Favorit' : '❤️ Tambahkan ke Favorit'}
          </button>
        </div>
      </div>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  gap: '40px',
  flexWrap: 'wrap',
};

const leftStyle = { flex: '1', minWidth: '280px', textAlign: 'center' };
const rightStyle = { flex: '2', minWidth: '280px' };
const posterStyle = {
  width: '100%',
  maxWidth: '300px',
  borderRadius: '15px',
  boxShadow: '0 5px 20px rgba(0,0,0,0.25)',
};
const metaRowStyle = {
  display: 'flex',
  gap: '15px',
  marginBottom: '15px',
  fontWeight: 'bold',
  color: '#444',
};
const favButtonStyle = {
  padding: '12px 24px',
  backgroundColor: '#e74c3c',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px',
};
const unfavButtonStyle = {
  padding: '12px 24px',
  backgroundColor: '#aaa',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '16px',
  marginTop: '10px',
};

export default Detail;
