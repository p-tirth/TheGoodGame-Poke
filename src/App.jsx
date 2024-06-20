import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 20;

  useEffect(() => {
    fetchPokemons();
  }, [currentPage]);

  const fetchPokemons = async () => {
    const offset = (currentPage - 1) * limit;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    setPokemons(response.data.results);
    setTotalPages(Math.ceil(response.data.count / limit));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredPokemons = pokemons.filter(pokemon => 
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-4xl mb-4 text-center font-bold text-gray-800">Pokémon List</h1>
        <input 
          type="text" 
          placeholder="Search Pokémon" 
          className="mb-4 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-400"
          value={search}
          onChange={handleSearchChange}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPokemons.map((pokemon, index) => (
            <div key={index} className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`} 
                alt={pokemon.name} 
                className="w-full h-32 object-contain mb-4"
              />
              <h2 className="text-2xl text-center capitalize font-semibold text-gray-700">{pokemon.name}</h2>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
          <button 
            className="p-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="text-lg text-gray-700">Page {currentPage} of {totalPages}</span>
          <button 
            className="p-2 bg-blue-600 text-white rounded disabled:opacity-50 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
