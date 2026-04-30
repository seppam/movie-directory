import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/actions/movieActions';
import MovieCard from '../components/MovieCard';

const Search = ({ onNavigate }) => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.allMovies);

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim() !== '') {
      dispatch(fetchMovies(keyword.trim()));
    }
  };

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
        .search-form {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin: 0 auto 24px;
          max-width: 1100px;
        }
        .search-input {
          padding: 10px 14px;
          width: 300px;
          borderRadius: 8px;
          border: 1px solid #ccc;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        .search-input:focus { border-color: #007bff; }
        .search-btn {
          padding: 10px 24px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 15px;
        }
      `}</style>

      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
        🔍 Cari Film Favoritmu
      </h2>

      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Ketik judul film... (misal: Batman)"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn">Cari</button>
      </form>

      {movies.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777', marginTop: '40px' }}>
          Ketik judul film di atas untuk mencari.
        </p>
      ) : (
        <div className="movie-grid">
          {movies.map((item) => (
            <MovieCard
              key={item.imdbID}
              movie={item}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
