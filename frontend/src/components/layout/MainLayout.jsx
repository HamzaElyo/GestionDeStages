import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children, isAuthenticated }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div className="d-flex flex-grow-1">
        {isAuthenticated && (
          <div style={{ width: '250px', backgroundColor: '#f8f9fa' }}>
            <Sidebar />
          </div>
        )}

        <main className={`flex-grow-1 p-4 bg-light ${!isAuthenticated ? 'w-100' : ''}`}>
          {children}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default MainLayout;
