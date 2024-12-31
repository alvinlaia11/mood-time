import React, { useState } from 'react';
import Help from './Help';

function Header() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <header className="app-header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-brand">
            <div className="brand-logo">
              <svg className="mood-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h1>Mood Time</h1>
            </div>
            <p>Lacak dan pahami mood Anda setiap hari</p>
          </div>
          <div className="header-nav">
            <button className="header-button" onClick={() => setShowHelp(true)}>
              <svg className="button-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Bantuan</span>
            </button>
          </div>
        </div>
      </div>
      {showHelp && <Help onClose={() => setShowHelp(false)} />}
    </header>
  );
}

export default Header;
