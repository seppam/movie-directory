// pages/Home.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/actions/movieActions'; // Jalurnya berubah!
import MovieCard from '../components/MovieCard'; // Ambil bingkainya!

const Home = ({ onNavigate }) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.allMovies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Katalog Film Terbaru</h2>
      
      {/* Container utama pakai Flexbox agar kartu-kartu berjejer ke samping */}
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap',    // Kalau penuh, pindah ke bawah
        justifyContent: 'center' // Kartu ada di tengah halaman
      }}>
        {movies.map((item) => (
          <MovieCard 
            key={item.imdbID} 
            movie={item} 
            onNavigate={onNavigate} // <--- Oper lagi ke bawah
          />
        ))}
      </div>
    </div>
  );
};

export default Home;