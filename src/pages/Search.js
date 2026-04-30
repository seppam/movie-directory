import React, { useState } from 'react'; // Pakai useState untuk catat input
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../store/actions/movieActions';
import MovieCard from '../components/MovieCard';

const Search = () => {
  // 1. State lokal untuk mencatat apa yang diketik user
  const [keyword, setKeyword] = useState('');
  
  const dispatch = useDispatch();
  
  // 2. Ambil hasil pencarian dari Gudang Redux
  const movies = useSelector((state) => state.allMovies);

  // 3. Fungsi yang dijalankan saat tombol "Cari" diklik
  const handleSearch = (e) => {
    e.preventDefault(); // Supaya halaman tidak reload
    if (keyword !== '') {
      dispatch(fetchMovies(keyword)); // Kirim kata kunci ke Thunk
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Cari Film Favoritmu</h2>

      {/* Form Pencarian dengan Flexbox */}
      <form onSubmit={handleSearch} style={searchFormStyle}>
        <input 
          type="text" 
          placeholder="Ketik judul film... (misal: Batman)" 
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} // Catat setiap ketikan
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Cari</button>
      </form>

      {/* Tampilan Hasil Pencarian */}
      <div style={resultsGridStyle}>
        {movies.length > 0 ? (
          movies.map((item) => (
            <MovieCard key={item.imdbID} movie={item} />
          ))
        ) : (
          <p>Silahkan cari film yang kamu inginkan.</p>
        )}
      </div>
    </div>
  );
};

// --- Styling Sederhana ---
const searchFormStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
  marginBottom: '30px'
};

const inputStyle = {
  padding: '10px',
  width: '300px',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const resultsGridStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center'
};

export default Search;