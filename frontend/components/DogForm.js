import React, { useState, useEffect } from 'react'

const initialForm = { name: '', breed: '', adopted: false }

export default function DogForm({ onDogAdded }) {
  const [values, setValues] = useState(initialForm)
  const [breeds, setBreeds] = useState([])

  useEffect(() => {
    fetch('http://localhost:3003/api/dogs/breeds')
      .then(res => res.json())
      .then(data => setBreeds(data))
      .catch(err => console.error('Error fetching breeds:', err))
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    fetch('http://localhost:3003/api/dogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(newDog => {
        setValues(initialForm)
        if (onDogAdded) onDogAdded(newDog)
      })
      .catch(err => console.error('Error adding dog:', err))
  }

  const onChange = (event) => {
    const { name, value, type, checked } = event.target
    setValues({
      ...values, [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <div>
      <h2>Create Dog</h2>
      <form onSubmit={onSubmit}>
        <input
          name="name"
          value={values.name}
          onChange={onChange}
          placeholder="Name"
          aria-label="Dog's name"
          required
        />
        <select
          name="breed"
          value={values.breed}
          onChange={onChange}
          aria-label="Dog's breed"
          required
        >
          <option value="">---Select Breed---</option>
          {breeds.map((breed, index) => (
            <option key={index} value={breed}>{breed}</option>
          ))}
        </select>
        <label>
          Adopted:
          <input
            type="checkbox"
            name="adopted"
            checked={values.adopted}
            onChange={onChange}
            aria-label="Is the dog adopted?"
          />
        </label>
        <div>
          <button type="submit">Create Dog</button>
          <button type="button" onClick={() => setValues(initialForm)}>Reset</button>
        </div>
      </form>
    </div>
  )
}