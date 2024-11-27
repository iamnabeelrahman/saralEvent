import React from 'react';

const Pagination = ({ currentPage, totalPages, goToPreviousPage, goToNextPage }) => {
  return (
    <div style={paginationContainerStyles}>
      <button
        style={{
          ...buttonStyles,
          marginRight: '15px',
          opacity: currentPage === 1 ? '0.5' : '1',
        }}
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span style={pageNumberStyles}>
        Page {currentPage} of {totalPages}
      </span>
      <button
        style={{
          ...buttonStyles,
          marginLeft: '15px',
          opacity: currentPage === totalPages ? '0.5' : '1',
        }}
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

const paginationContainerStyles = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '30px',
  padding: '10px 0',
};

const buttonStyles = {
  padding: '12px 25px',
  fontSize: '16px',
  color: 'white',
  backgroundColor: 'rgb(248, 68, 100)',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.3s ease',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const pageNumberStyles = {
  fontSize: '18px',
  fontWeight: '500',
  color: '#555',
  margin: '0 15px',
  textAlign: 'center',
};

export default Pagination;
