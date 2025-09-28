'use client'

import { useState } from 'react'

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search cases, evidence, or ask AI..." 
            className="search-input"
          />
        </div>
      </div>

      <div className="navbar-right">
        <div className="user-profile">
          <div className="user-avatar">
            <div className="avatar-initial">F</div>
          </div>
          <div className="user-info">
            <div className="user-name">Franklin</div>
            <div className="user-role">Super admin</div>
          </div>
        </div>
      </div>
    </div>
  )
}
