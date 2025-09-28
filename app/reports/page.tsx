'use client'

import { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function Reports() {
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [reportData, setReportData] = useState({
    title: '',
    caseId: '',
    investigator: '',
    date: new Date().toISOString().split('T')[0]
  })

  const templates = [
    { id: 'standard', name: 'Standard Report', description: 'Basic forensic analysis report' },
    { id: 'detailed', name: 'Detailed Report', description: 'Comprehensive analysis with charts' },
    { id: 'executive', name: 'Executive Summary', description: 'High-level overview for management' },
    { id: 'technical', name: 'Technical Report', description: 'Detailed technical findings' }
  ]

  const recentReports = [
    { id: 'RPT-001', title: 'Mobile Device Analysis - John Doe', date: '2024-01-15', status: 'completed', pages: 24 },
    { id: 'RPT-002', title: 'Corporate Investigation Report', date: '2024-01-10', status: 'draft', pages: 18 },
    { id: 'RPT-003', title: 'Crypto Transaction Analysis', date: '2024-01-08', status: 'completed', pages: 31 },
    { id: 'RPT-004', title: 'Location Data Investigation', date: '2024-01-05', status: 'review', pages: 15 }
  ]

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="content-area">
          <div className="page-header">
            <h1 className="page-title">Reports</h1>
            <p className="page-subtitle">Generate and manage forensic reports</p>
          </div>

          <div className="reports-grid">
            <div className="report-builder-card">
              <div className="card-header">
                <h3>Report Builder</h3>
                <div className="card-badge">New</div>
              </div>
              <div className="builder-form">
                <div className="form-row">
                  <div className="form-group">
                    <label>Report Title</label>
                    <input
                      type="text"
                      value={reportData.title}
                      onChange={(e) => setReportData({...reportData, title: e.target.value})}
                      placeholder="Enter report title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Case ID</label>
                    <input
                      type="text"
                      value={reportData.caseId}
                      onChange={(e) => setReportData({...reportData, caseId: e.target.value})}
                      placeholder="Enter case ID"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Investigator</label>
                    <input
                      type="text"
                      value={reportData.investigator}
                      onChange={(e) => setReportData({...reportData, investigator: e.target.value})}
                      placeholder="Enter investigator name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Report Date</label>
                    <input
                      type="date"
                      value={reportData.date}
                      onChange={(e) => setReportData({...reportData, date: e.target.value})}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Template</label>
                  <select
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                  >
                    <option value="">Select template</option>
                    {templates.map(template => (
                      <option key={template.id} value={template.id}>
                        {template.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button 
                  className="generate-btn"
                  onClick={() => {
                    const reportContent = `
# Forensic Analysis Report
## Case: ${reportData.caseId || 'N/A'}
## Investigator: ${reportData.investigator || 'N/A'}
## Date: ${reportData.date}

### Executive Summary
This report contains the findings from the forensic analysis of the submitted evidence.

### Key Findings
- Evidence processed successfully
- AI analysis completed
- Risk assessment performed

### Recommendations
- Continue monitoring
- Additional evidence may be required

### Conclusion
Analysis completed with high confidence level.
                    `;
                    
                    const blob = new Blob([reportContent], { type: 'text/plain' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `forensic-report-${reportData.caseId || 'new'}.txt`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  }}
                >
                  Generate Report
                </button>
              </div>
            </div>

            <div className="recent-reports-card">
              <div className="card-header">
                <h3>Recent Reports</h3>
                <button className="view-all-btn">View All</button>
              </div>
              <div className="reports-grid-list">
                {recentReports.map(report => (
                  <div key={report.id} className="report-card">
                    <div className="report-header">
                      <div className="report-id">{report.id}</div>
                      <div className={`report-status ${report.status}`}>
                        {report.status}
                      </div>
                    </div>
                    <div className="report-title">{report.title}</div>
                    <div className="report-meta">
                      <span>{report.date}</span>
                      <span>{report.pages} pages</span>
                    </div>
                    <div className="report-actions">
                      <button className="action-btn primary">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>


          <div className="chain-of-custody">
            <h3>Chain of Custody</h3>
            <div className="custody-log">
              <div className="custody-entry">
                <div className="custody-time">2024-01-15 14:30</div>
                <div className="custody-action">Evidence collected by John Smith</div>
                <div className="custody-location">Crime Scene - Downtown Office</div>
              </div>
              <div className="custody-entry">
                <div className="custody-time">2024-01-15 15:45</div>
                <div className="custody-action">Transferred to Lab for analysis</div>
                <div className="custody-location">Forensic Lab - Building A</div>
              </div>
              <div className="custody-entry">
                <div className="custody-time">2024-01-16 09:15</div>
                <div className="custody-action">Analysis completed by AI system</div>
                <div className="custody-location">Digital Forensics Lab</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
