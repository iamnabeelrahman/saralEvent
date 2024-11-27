"use client";
import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import EventList from './components/EventList';
import Pagination from './components/Pagination';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useRouter } from 'next/navigation';
import styles from '../app/styles/home/page.module.css'; // Import the CSS module

export default function Home() {
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null); 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const router = useRouter();

  const eventsPerPage = 6;

  const fetchEvents = async (page = 1, query = '') => {
    try {
      const apiUrl = query
        ? `https://saralevent.onrender.com/api/events?populate=*&filters[Event_Name][$contains]=${query}`
        : `https://saralevent.onrender.com/api/events?populate=*&pagination[page]=${page}&pagination[pageSize]=${eventsPerPage}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setEvents(data.data);
      setTotalPages(query ? 1 : data.meta.pagination.pageCount);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [currentPage]);

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('user');
    setUser(null);
    setDropdownOpen(false);
    router.push('/');
  };

  return (
    <div className={styles.container}> {/* Use container class from CSS module */}
      <div className={styles.userControls}> {/* Use userControls class */}
        {user ? (
          <div style={{ position: 'relative' }}>
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className={styles.userButton}> {/* Use userButton class */}
              {user.firstname}
            </button>
            {dropdownOpen && (
              <div className={styles.dropdown}> {/* Use dropdown class */}
                <button onClick={handleLogout} className={styles.logoutButton}> {/* Use logoutButton class */}
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <button onClick={() => setIsLoginOpen(true)} className={styles.button}> {/* Use button class */}
              Login
            </button>
            <button onClick={() => setIsRegisterOpen(true)} className={`${styles.button} ${styles.registerButton}`}> {/* Use button class with additional styles for register */}
              Register
            </button>
          </>
        )}
      </div>

      {isLoginOpen && <LoginForm onClose={() => setIsLoginOpen(false)} setUser={setUser} />}
      {isRegisterOpen && <RegisterForm onClose={() => setIsRegisterOpen(false)} />}

      <h1 className={styles.heading}>Events near you</h1> {/* Use heading class */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={() => fetchEvents(1, searchQuery)} />
      <EventList events={events} />
      {!searchQuery && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          goToPreviousPage={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          goToNextPage={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        />
      )}
    </div>
  );
}
