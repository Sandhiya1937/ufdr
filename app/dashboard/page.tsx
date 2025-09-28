'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    totalCases: 24,
    activeCases: 8,
    completedCases: 16,
    totalEvidence: 1247,
    aiInsights: 89,
    riskAlerts: 3
  }

  const recentActivity = [
    { id: 1, type: 'case', action: 'New case uploaded', case: 'Case #2024-001', time: '2 hours ago', status: 'processing' },
    { id: 2, type: 'ai', action: 'AI analysis completed', case: 'Case #2024-002', time: '4 hours ago', status: 'completed' },
    { id: 3, type: 'evidence', action: 'Evidence correlation found', case: 'Case #2024-003', time: '6 hours ago', status: 'alert' },
    { id: 4, type: 'report', action: 'Report generated', case: 'Case #2024-004', time: '1 day ago', status: 'completed' }
  ]

  const quickActions = [
    { title: 'Upload New Case', icon: '📁', color: 'blue', href: '/cases/new' },
    { title: 'AI Analysis', icon: '🤖', color: 'purple', href: '/ai' },
    { title: 'Generate Report', icon: '📄', color: 'green', href: '/reports' },
    { title: 'View Analytics', icon: '📊', color: 'orange', href: '/analytics' }
  ]

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-area">
          <div className="dashboard">
            <div className="dashboard-header">
              <h1 className="dashboard-title">Dashboard</h1>
              <p className="dashboard-subtitle">AI-powered forensic data analysis platform</p>
            </div>

            {/* Stats Overview */}
            <div className="stats-grid">
              <div className="stat-card main-balance">
                <div className="stat-header">
                  <div className="stat-title">Total Cases</div>
                  <div className="stat-icon">📊</div>
                </div>
                <div className="stat-value">{stats.totalCases}</div>
                <div className="stat-subtitle">Active: {stats.activeCases} | Completed: {stats.completedCases}</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-title">Evidence Items</div>
                  <div className="stat-icon">🔍</div>
                </div>
                <div className="stat-value">{stats.totalEvidence.toLocaleString()}</div>
                <div className="stat-subtitle">Across all cases</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-title">AI Insights</div>
                  <div className="stat-icon">🤖</div>
                </div>
                <div className="stat-value">{stats.aiInsights}</div>
                <div className="stat-subtitle">Generated this month</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <div className="stat-title">Risk Alerts</div>
                  <div className="stat-icon">⚠️</div>
                </div>
                <div className="stat-value">{stats.riskAlerts}</div>
                <div className="stat-subtitle">Require attention</div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="dashboard-grid">
              {/* Recent Activity */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3 className="card-title">Recent Activity</h3>
                  <button className="card-action">View All</button>
                </div>
                <div className="activity-list">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="activity-item">
                      <div className="activity-icon">
                        {activity.type === 'case' && '📁'}
                        {activity.type === 'ai' && '🤖'}
                        {activity.type === 'evidence' && '🔍'}
                        {activity.type === 'report' && '📄'}
                      </div>
                      <div className="activity-content">
                        <div className="activity-text">{activity.action}</div>
                        <div className="activity-case">{activity.case}</div>
                      </div>
                      <div className="activity-meta">
                        <div className="activity-time">{activity.time}</div>
                        <div className={`activity-status ${activity.status}`}>
                          {activity.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3 className="card-title">Quick Actions</h3>
                </div>
                <div className="quick-actions">
                  {quickActions.map((action, index) => (
                    <a key={index} href={action.href} className={`quick-action ${action.color}`}>
                      <div className="quick-action-icon">{action.icon}</div>
                      <div className="quick-action-title">{action.title}</div>
                    </a>
                  ))}
                </div>
              </div>

              {/* System Health */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3 className="card-title">System Health</h3>
                  <div className="health-status good">All Systems Operational</div>
                </div>
                <div className="health-metrics">
                  <div className="health-metric">
                    <div className="metric-label">AI Processing</div>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{ width: '85%' }}></div>
                    </div>
                    <div className="metric-value">85%</div>
                  </div>
                  <div className="health-metric">
                    <div className="metric-label">Storage Usage</div>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{ width: '62%' }}></div>
                    </div>
                    <div className="metric-value">62%</div>
                  </div>
                  <div className="health-metric">
                    <div className="metric-label">Processing Queue</div>
                    <div className="metric-bar">
                      <div className="metric-fill" style={{ width: '23%' }}></div>
                    </div>
                    <div className="metric-value">23%</div>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="dashboard-card">
                <div className="card-header">
                  <h3 className="card-title">AI Insights</h3>
                  <button className="card-action">View All</button>
                </div>
                <div className="insights-list">
                  <div className="insight-item">
                    <div className="insight-icon">🔍</div>
                    <div className="insight-content">
                      <div className="insight-title">Pattern Detected</div>
                      <div className="insight-description">Unusual communication patterns found in Case #2024-001</div>
                    </div>
                    <div className="insight-confidence">92%</div>
                  </div>
                  <div className="insight-item">
                    <div className="insight-icon">📍</div>
                    <div className="insight-content">
                      <div className="insight-title">Location Correlation</div>
                      <div className="insight-description">Multiple devices at same location detected</div>
                    </div>
                    <div className="insight-confidence">87%</div>
                  </div>
                  <div className="insight-item">
                    <div className="insight-icon">💰</div>
                    <div className="insight-content">
                      <div className="insight-title">Crypto Activity</div>
                      <div className="insight-description">Bitcoin transactions linked to suspect</div>
                    </div>
                    <div className="insight-confidence">95%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
