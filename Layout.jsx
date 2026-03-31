// src/Layout.jsx
import React from 'react';

export default function Layout({ children }) {
  return (
    <div>
      <header>
        <h1>Asset Tracker UI</h1>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <p>© 2026 Asset Tracker</p>
      </footer>
    </div>
  );
}