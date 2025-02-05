import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import DogForm from './DogForm';
import DogsList from './DogsList';

export default function App() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = () => {
    fetch('http://localhost:3003/api/dogs')
      .then(response => response.json())
      .then(data => setDogs(data))
      .catch(error => console.error('Error fetching dogs:', error));
  };

  const handleDogAdded = () => {
    fetchDogs();
  };

  return (
    <div>
      <nav>
        <NavLink to="/">Dogs</NavLink>
        <NavLink to="/form">Form</NavLink>
      </nav>
      <Routes>
        <Route path="/" element={<DogsList dogs={dogs} fetchDogs={fetchDogs} />} />
        <Route path="/form" element={<DogForm onDogAdded={handleDogAdded} />} />
      </Routes>
    </div>
  );
}
