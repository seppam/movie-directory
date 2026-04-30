import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovieDetail, toggleFavorite } from '../store/actions/movieActions';

const MovieCard = ({ movie, onNavigate }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((f) => f.imdbID === movie.imdbID);

  const goToDetail = () => {
    dispatch(fetchMovieDetail(movie.imdbID));
    onNavigate('detail');
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie));
  };

  return (
    <div style={cardStyle}>
      <div style={{ position: 'relative' }}>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x280?text=No+Image'}
          alt={movie.Title}
          style={imageStyle}
        />
        <button
          onClick={handleToggleFavorite}
          style={{
            ...heartBtnStyle,
            backgroundColor: isFavorite ? '#e74c3c' : 'rgba(0,0,0,0.5)',
          }}
          title={isFavorite ? 'Hapus dari favorit' : 'Tambah ke favorit'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div style={infoStyle}>
        <h4 style={titleStyle} title={movie.Title}>{movie.Title}</h4>
        <p style={yearStyle}>{movie.Year}</p>
        <button onClick={goToDetail} style={buttonStyle}>
          Lihat Detail
        </button>
      </div>
    </div>
  );
};

const cardStyle = {
  width: '200px',
  border: '1px solid #ddd',
  borderRadius: '12px',
  overflow: 'hidden',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  margin: '10px',
};

const imageStyle = {
  width: '100%',
  height: '280px',
  objectFit: 'cover',
};

const infoStyle = {
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  flexGrow: 1,
};

const titleStyle = {
  fontSize: '15px',
  margin: '5px 0',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};
const yearStyle = { color: '#777', fontSize: '14px' };
const buttonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  padding: '8px',
  borderRadius: '5px',
  cursor: 'pointer',
  marginTop: '5px',
};
const heartBtnStyle = {
  position: 'absolute',
  top: '8px',
  right: '8px',
  border: 'none',
  borderRadius: '50%',
  width: '36px',
  height: '36px',
  fontSize: '16px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export default MovieCard;
