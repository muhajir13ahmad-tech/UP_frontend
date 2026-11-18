import React from 'react';
import { GraduationCap, Database, RefreshCw } from 'lucide-react';

export default function Navbar({ onRefresh, loading, totalCount }) {
  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="brand-icon">
            <GraduationCap size={28} color="#ffffff" />
          </div>
          <div>
            <h1 className="brand-title">SIM Data Siswa</h1>
            <p className="brand-subtitle">Skema Pengembangan Web Node.js & React</p>
          </div>
        </div>

        <div className="nav-actions">
          <div className="db-badge">
            <span className="status-indicator"></span>
            <Database size={15} />
            <span>SQLite Connected</span>
          </div>

          <div className="count-badge">
            Total Siswa: <strong>{totalCount}</strong>
          </div>

          <button 
            className="btn-refresh" 
            onClick={onRefresh} 
            title="Refresh Data"
            disabled={loading}
          >
            <RefreshCw size={17} className={loading ? 'spinning' : ''} />
            <span className="btn-text">Segarkan</span>
          </button>
        </div>
      </div>
    </header>
  );
}
