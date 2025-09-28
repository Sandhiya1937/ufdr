'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function Cases() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')

  const cases = [
    { id: '2024-001', title: 'Mobile Device Analysis - John Doe', status: 'active', date: '2024-01-15', evidence: 247, priority: 'high' },
    { id: '2024-002', title: 'Corporate Investigation - ABC Corp', status: 'completed', date: '2024-01-10', evidence: 189, priority: 'medium' },
    { id: '2024-003', title: 'Crypto Transaction Analysis', status: 'processing', date: '2024-01-12', evidence: 156, priority: 'high' },
    { id: '2024-004', title: 'Location Data Investigation', status: 'active', date: '2024-01-08', evidence: 98, priority: 'low' },
    { id: '2024-005', title: 'Communication Pattern Analysis', status: 'completed', date: '2024-01-05', evidence: 312, priority: 'medium' }
  ]

  const filteredCases = cases.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         case_.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === 'all' || case_.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-area">
          <div className="page-header">
            <h1 className="page-title">Cases</h1>
            <p className="page-subtitle">Manage and analyze forensic cases</p>
          </div>

          <div className="cases-controls">
            <div className="search-section">
              <input
                type="text"
                placeholder="Search cases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            <div className="filter-section">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Cases</option>
                <option value="active">Active</option>
                <option value="processing">Processing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button className="new-case-btn" onClick={() => document.getElementById('file-upload')?.click()}>
              New Case
            </button>
            <input
              id="file-upload"
              type="file"
              accept=".xml,.json,.zip"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  alert(`File selected: ${e.target.files[0].name}`);
                }
              }}
            />
          </div>

          <div className="cases-grid">
            {filteredCases.map((case_) => (
              <div key={case_.id} className="case-card">
                <div className="case-header">
                  <div className="case-id">{case_.id}</div>
                  <div className={`case-status ${case_.status}`}>
                    {case_.status}
                  </div>
                </div>
                <div className="case-title">{case_.title}</div>
                <div className="case-meta">
                  <div className="case-date">📅 {case_.date}</div>
                  <div className="case-evidence">🔍 {case_.evidence} items</div>
                </div>
                <div className="case-priority">
                  <span className={`priority-badge ${case_.priority}`}>
                    {case_.priority} priority
                  </span>
                </div>
                <div className="case-actions">
                  <button className="action-btn primary">View Details</button>
                  <button className="action-btn secondary">Edit</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
