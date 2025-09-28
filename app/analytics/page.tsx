'use client'

import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import dynamic from 'next/dynamic'

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false,
  loading: () => <div className="map-loading">Loading map...</div>
})

export default function Analytics() {
  const [activeTab, setActiveTab] = useState('communications')
  const [graphData, setGraphData] = useState(null)

  // Simulate graph data
  useEffect(() => {
    const mockGraphData = {
      nodes: [
        { id: 'person1', label: 'John Doe', group: 'person', size: 20 },
        { id: 'person2', label: 'Jane Smith', group: 'person', size: 15 },
        { id: 'person3', label: 'Mike Johnson', group: 'person', size: 18 },
        { id: 'phone1', label: '+1-555-0123', group: 'device', size: 12 },
        { id: 'phone2', label: '+1-555-0456', group: 'device', size: 10 },
        { id: 'email1', label: 'john@email.com', group: 'contact', size: 8 },
        { id: 'email2', label: 'jane@email.com', group: 'contact', size: 8 },
        { id: 'location1', label: 'Downtown Office', group: 'location', size: 14 },
        { id: 'location2', label: 'Residential Area', group: 'location', size: 12 }
      ],
      edges: [
        { from: 'person1', to: 'phone1', label: 'owns', width: 3 },
        { from: 'person2', label: 'phone2', label: 'owns', width: 2 },
        { from: 'person1', to: 'email1', label: 'uses', width: 2 },
        { from: 'person2', to: 'email2', label: 'uses', width: 2 },
        { from: 'person1', to: 'person2', label: 'calls', width: 5 },
        { from: 'person1', to: 'person3', label: 'texts', width: 3 },
        { from: 'person1', to: 'location1', label: 'visited', width: 4 },
        { from: 'person2', to: 'location2', label: 'visited', width: 3 },
        { from: 'phone1', to: 'phone2', label: 'connected', width: 2 }
      ]
    }
    setGraphData(mockGraphData)
  }, [])

  const communicationStats = {
    totalCalls: 1247,
    totalMessages: 3421,
    uniqueContacts: 89,
    suspiciousPatterns: 12
  }

  const locationStats = {
    uniqueLocations: 45,
    frequentPlaces: 8,
    unusualMovements: 3,
    geofenceViolations: 2
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-area">
          <div className="page-header">
            <h1 className="page-title">Analytics</h1>
            <p className="page-subtitle">Advanced data analysis and visualization</p>
          </div>

          <div className="analytics-tabs">
            <button 
              className={`tab ${activeTab === 'communications' ? 'active' : ''}`}
              onClick={() => setActiveTab('communications')}
            >
              📞 Communications
            </button>
            <button 
              className={`tab ${activeTab === 'locations' ? 'active' : ''}`}
              onClick={() => setActiveTab('locations')}
            >
              📍 Locations
            </button>
            <button 
              className={`tab ${activeTab === 'graph' ? 'active' : ''}`}
              onClick={() => setActiveTab('graph')}
            >
              🔗 Link Graph
            </button>
            <button 
              className={`tab ${activeTab === 'anomalies' ? 'active' : ''}`}
              onClick={() => setActiveTab('anomalies')}
            >
              ⚠️ Anomalies
            </button>
          </div>

          {activeTab === 'communications' && (
            <div className="analytics-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">📞</div>
                  <div className="stat-value">{communicationStats.totalCalls}</div>
                  <div className="stat-label">Total Calls</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">💬</div>
                  <div className="stat-value">{communicationStats.totalMessages}</div>
                  <div className="stat-label">Messages</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-value">{communicationStats.uniqueContacts}</div>
                  <div className="stat-label">Unique Contacts</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⚠️</div>
                  <div className="stat-value">{communicationStats.suspiciousPatterns}</div>
                  <div className="stat-label">Suspicious Patterns</div>
                </div>
              </div>

              <div className="chart-container">
                <h3>Communication Frequency</h3>
                <div className="frequency-chart">
                  <div className="chart-bar" style={{ height: '80%' }}>
                    <span className="bar-label">Mon</span>
                    <div className="bar-fill" style={{ height: '80%' }}></div>
                  </div>
                  <div className="chart-bar" style={{ height: '60%' }}>
                    <span className="bar-label">Tue</span>
                    <div className="bar-fill" style={{ height: '60%' }}></div>
                  </div>
                  <div className="chart-bar" style={{ height: '90%' }}>
                    <span className="bar-label">Wed</span>
                    <div className="bar-fill" style={{ height: '90%' }}></div>
                  </div>
                  <div className="chart-bar" style={{ height: '70%' }}>
                    <span className="bar-label">Thu</span>
                    <div className="bar-fill" style={{ height: '70%' }}></div>
                  </div>
                  <div className="chart-bar" style={{ height: '50%' }}>
                    <span className="bar-label">Fri</span>
                    <div className="bar-fill" style={{ height: '50%' }}></div>
                  </div>
                  <div className="chart-bar" style={{ height: '30%' }}>
                    <span className="bar-label">Sat</span>
                    <div className="bar-fill" style={{ height: '30%' }}></div>
                  </div>
                  <div className="chart-bar" style={{ height: '40%' }}>
                    <span className="bar-label">Sun</span>
                    <div className="bar-fill" style={{ height: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'locations' && (
            <div className="analytics-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-value">{locationStats.uniqueLocations}</div>
                  <div className="stat-label">Unique Locations</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{locationStats.frequentPlaces}</div>
                  <div className="stat-label">Frequent Places</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{locationStats.unusualMovements}</div>
                  <div className="stat-label">Unusual Movements</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{locationStats.geofenceViolations}</div>
                  <div className="stat-label">Geofence Violations</div>
                </div>
              </div>

              <div className="map-container">
                <h3>Location Heatmap</h3>
                <MapComponent />
              </div>
            </div>
          )}

          {activeTab === 'graph' && (
            <div className="analytics-content">
              <div className="graph-container">
                <h3>Relationship Graph</h3>
                <div className="graph-visualization">
                  <svg width="100%" height="600" viewBox="0 0 1000 600">
                    {/* Background */}
                    <rect width="1000" height="600" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2"/>
                    
                    {/* Grid pattern */}
                    <defs>
                      <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#e2e8f0" strokeWidth="0.5" opacity="0.3"/>
                      </pattern>
                    </defs>
                    <rect width="1000" height="600" fill="url(#grid)"/>
                    
                    {/* Connection lines - More detailed network */}
                    <line x1="200" y1="200" x2="350" y2="150" stroke="#2563eb" strokeWidth="3" opacity="0.7"/>
                    <line x1="350" y1="150" x2="500" y2="200" stroke="#2563eb" strokeWidth="2" opacity="0.6"/>
                    <line x1="200" y1="200" x2="350" y2="300" stroke="#2563eb" strokeWidth="4" opacity="0.8"/>
                    <line x1="350" y1="300" x2="500" y2="200" stroke="#2563eb" strokeWidth="2" opacity="0.6"/>
                    <line x1="350" y1="300" x2="650" y2="250" stroke="#2563eb" strokeWidth="3" opacity="0.7"/>
                    <line x1="500" y1="200" x2="650" y2="250" stroke="#2563eb" strokeWidth="2" opacity="0.6"/>
                    <line x1="650" y1="250" x2="650" y2="350" stroke="#2563eb" strokeWidth="2" opacity="0.6"/>
                    <line x1="200" y1="200" x2="200" y2="400" stroke="#2563eb" strokeWidth="2" opacity="0.5"/>
                    <line x1="350" y1="300" x2="500" y2="400" stroke="#2563eb" strokeWidth="2" opacity="0.5"/>
                    <line x1="500" y1="200" x2="800" y2="150" stroke="#2563eb" strokeWidth="2" opacity="0.4"/>
                    <line x1="650" y1="250" x2="800" y2="300" stroke="#2563eb" strokeWidth="2" opacity="0.4"/>
                    
                    {/* Nodes - More detailed network */}
                    {/* People */}
                    <circle cx="200" cy="200" r="25" fill="#2563eb" stroke="#1d4ed8" strokeWidth="3">
                      <animate attributeName="r" values="25;30;25" dur="3s" repeatCount="indefinite"/>
                    </circle>
                    <text x="200" y="205" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">John</text>
                    
                    <circle cx="350" cy="150" r="20" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2">
                      <animate attributeName="r" values="20;25;20" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                    <text x="350" y="155" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">Jane</text>
                    
                    <circle cx="350" cy="300" r="22" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2">
                      <animate attributeName="r" values="22;27;22" dur="2.8s" repeatCount="indefinite"/>
                    </circle>
                    <text x="350" y="305" textAnchor="middle" fontSize="11" fill="white" fontWeight="bold">Mike</text>
                    
                    <circle cx="200" cy="400" r="18" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2">
                      <animate attributeName="r" values="18;23;18" dur="2.3s" repeatCount="indefinite"/>
                    </circle>
                    <text x="200" y="405" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Sarah</text>
                    
                    <circle cx="500" cy="400" r="16" fill="#2563eb" stroke="#1d4ed8" strokeWidth="2">
                      <animate attributeName="r" values="16;21;16" dur="2.7s" repeatCount="indefinite"/>
                    </circle>
                    <text x="500" y="405" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Alex</text>
                    
                    {/* Devices */}
                    <circle cx="500" cy="200" r="18" fill="#059669" stroke="#047857" strokeWidth="2">
                      <animate attributeName="r" values="18;23;18" dur="2.2s" repeatCount="indefinite"/>
                    </circle>
                    <text x="500" y="205" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Phone</text>
                    
                    <circle cx="650" cy="250" r="20" fill="#059669" stroke="#047857" strokeWidth="2">
                      <animate attributeName="r" values="20;25;20" dur="2.6s" repeatCount="indefinite"/>
                    </circle>
                    <text x="650" y="255" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Laptop</text>
                    
                    <circle cx="800" cy="150" r="16" fill="#059669" stroke="#047857" strokeWidth="2">
                      <animate attributeName="r" values="16;21;16" dur="2.4s" repeatCount="indefinite"/>
                    </circle>
                    <text x="800" y="155" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">Tablet</text>
                    
                    <circle cx="800" cy="300" r="14" fill="#059669" stroke="#047857" strokeWidth="2">
                      <animate attributeName="r" values="14;19;14" dur="2.1s" repeatCount="indefinite"/>
                    </circle>
                    <text x="800" y="305" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">Watch</text>
                    
                    {/* Locations */}
                    <circle cx="650" cy="350" r="16" fill="#64748b" stroke="#475569" strokeWidth="2">
                      <animate attributeName="r" values="16;21;16" dur="3.2s" repeatCount="indefinite"/>
                    </circle>
                    <text x="650" y="355" textAnchor="middle" fontSize="10" fill="white" fontWeight="bold">Office</text>
                    
                    <circle cx="200" cy="100" r="14" fill="#64748b" stroke="#475569" strokeWidth="2">
                      <animate attributeName="r" values="14;19;14" dur="2.9s" repeatCount="indefinite"/>
                    </circle>
                    <text x="200" y="105" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">Home</text>
                    
                    <circle cx="500" cy="500" r="12" fill="#64748b" stroke="#475569" strokeWidth="2">
                      <animate attributeName="r" values="12;17;12" dur="3.5s" repeatCount="indefinite"/>
                    </circle>
                    <text x="500" y="505" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">Cafe</text>
                    
                    {/* Contact info */}
                    <circle cx="100" cy="200" r="14" fill="#0284c7" stroke="#0369a1" strokeWidth="2">
                      <animate attributeName="r" values="14;19;14" dur="2.8s" repeatCount="indefinite"/>
                    </circle>
                    <text x="100" y="205" textAnchor="middle" fontSize="9" fill="white" fontWeight="bold">Email</text>
                    
                    <circle cx="100" cy="300" r="12" fill="#0284c7" stroke="#0369a1" strokeWidth="2">
                      <animate attributeName="r" values="12;17;12" dur="2.6s" repeatCount="indefinite"/>
                    </circle>
                    <text x="100" y="305" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">SMS</text>
                    
                    <circle cx="100" cy="400" r="10" fill="#0284c7" stroke="#0369a1" strokeWidth="2">
                      <animate attributeName="r" values="10;15;10" dur="2.4s" repeatCount="indefinite"/>
                    </circle>
                    <text x="100" y="405" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">Call</text>
                    
                    {/* Financial */}
                    <circle cx="900" cy="200" r="12" fill="#dc2626" stroke="#b91c1c" strokeWidth="2">
                      <animate attributeName="r" values="12;17;12" dur="2.5s" repeatCount="indefinite"/>
                    </circle>
                    <text x="900" y="205" textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">Bank</text>
                    
                    <circle cx="900" cy="300" r="10" fill="#dc2626" stroke="#b91c1c" strokeWidth="2">
                      <animate attributeName="r" values="10;15;10" dur="2.3s" repeatCount="indefinite"/>
                    </circle>
                    <text x="900" y="305" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">Crypto</text>
                    
                    {/* Additional connections */}
                    <line x1="100" y1="200" x2="200" y2="200" stroke="#0284c7" strokeWidth="2" opacity="0.6"/>
                    <line x1="100" y1="300" x2="200" y2="200" stroke="#0284c7" strokeWidth="2" opacity="0.6"/>
                    <line x1="100" y1="400" x2="200" y2="400" stroke="#0284c7" strokeWidth="2" opacity="0.6"/>
                    <line x1="800" y1="150" x2="900" y2="200" stroke="#dc2626" strokeWidth="2" opacity="0.6"/>
                    <line x1="800" y1="300" x2="900" y2="300" stroke="#dc2626" strokeWidth="2" opacity="0.6"/>
                  </svg>
                </div>
                <div className="graph-legend">
                  <div className="legend-item">
                    <div className="legend-color person"></div>
                    <span>People (5)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color device"></div>
                    <span>Devices (4)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color contact"></div>
                    <span>Communications (3)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color location"></div>
                    <span>Locations (3)</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color financial"></div>
                    <span>Financial (2)</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'anomalies' && (
            <div className="analytics-content">
              <div className="anomalies-list">
                <div className="anomaly-item high">
                  <div className="anomaly-icon">🚨</div>
                  <div className="anomaly-content">
                    <h4>Unusual Communication Pattern</h4>
                    <p>Multiple calls to unknown numbers at 3 AM</p>
                    <span className="anomaly-score">Risk Score: 95%</span>
                  </div>
                </div>
                <div className="anomaly-item medium">
                  <div className="anomaly-icon">⚠️</div>
                  <div className="anomaly-content">
                    <h4>Location Anomaly</h4>
                    <p>Device location changed 5 times in 10 minutes</p>
                    <span className="anomaly-score">Risk Score: 78%</span>
                  </div>
                </div>
                <div className="anomaly-item low">
                  <div className="anomaly-icon">📱</div>
                  <div className="anomaly-content">
                    <h4>App Usage Spike</h4>
                    <p>Unusual spike in encrypted messaging app usage</p>
                    <span className="anomaly-score">Risk Score: 65%</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
