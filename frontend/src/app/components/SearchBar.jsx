import React from 'react';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <div className="row mb-4">
      <div className="col-md-8">
        <input
          type="text"
          className="form-control"
          placeholder="Search Event by Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="col-md-4">
      <button
  className="btn w-100"
  style={{
    backgroundColor: '#ff5733', // Button background color
    borderColor: '#ff5733', // Border color to match background
    color: 'white', // Text color
    fontWeight: 'bold', // Optional: make the text bold
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
  }}
  onClick={handleSearch}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#e04d2d')} // Darker color on hover
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#ff5733')} // Reset color on mouse out
>
  Search
</button>
      </div>
    </div>
  );
};

export default SearchBar;

