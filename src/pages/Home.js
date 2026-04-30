import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/actions/movieActions';
import MovieCard from '../components/MovieCard';

const ITEMS_PER_PAGE = 10;

const Home = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.allMovies);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (movies.length === 0) {
      dispatch(fetchMovies('2024'));
    }
  }, [dispatch, movies.length]);

  const totalPages = Math.ceil(movies.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentMovies = movies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      `}</style>

      <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
        🎬 Katalog Film Terbaru
      </h2>

      <div className="movie-grid">
        {currentMovies.map((item) => (
          <MovieCard
            key={`${item.imdbID}-${currentPage}`}
            movie={item}
            onNavigate={onNavigate}
          />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={paginationWrapperStyle}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={pageBtnStyle(currentPage === 1)}
          >
            ‹ Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              style={pageBtnStyle(false, page === currentPage)}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={pageBtnStyle(currentPage === totalPages)}
          >
            Next ›
          </button>
        </div>
      )}
    </div>
  );
};

const paginationWrapperStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '8px',
  marginTop: '30px',
  flexWrap: 'wrap',
};

const pageBtnStyle = (disabled = false, active = false) => ({
  padding: '8px 14px',
  border: 'none',
  borderRadius: '6px',
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontSize: '14px',
  fontWeight: active ? 'bold' : 'normal',
  backgroundColor: active ? '#007bff' : disabled ? '#e0e0e0' : '#f0f0f0',
  color: active ? 'white' : disabled ? '#aaa' : '#333',
  opacity: disabled ? 0.5 : 1,
  transition: '0.2s',
});

export default Home;
