import React from 'react';

export default function DogsList({ dogs, fetchDogs }) {
  const handleDelete = (id) => {
    fetch(`http://localhost:3003/api/dogs/${id}`, {
      method: 'DELETE',
    })
      .then(() => fetchDogs()) // Refresh the list after deleting
      .catch((error) => console.error('Error deleting dog:', error));
  };

  return (
    <div>
      <h2>Dogs Shelter</h2>
      <ul>
        {dogs.length > 0 ? (
          dogs.map(dog => (
            <li key={dog.id}>
              {dog.name}, {dog.breed}, {dog.adopted ? 'Adopted' : 'Not Adopted'}
              <div>
                <button onClick={() => handleDelete(dog.id)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <p>Loading dogs...</p>
        )}
      </ul>
    </div>
  );
}