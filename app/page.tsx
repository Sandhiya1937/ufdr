'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (!isLogin) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required'
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required'
      }
      if (!formData.contactNumber) {
        newErrors.contactNumber = 'Contact number is required'
      } else if (!/^\d{10}$/.test(formData.contactNumber)) {
        newErrors.contactNumber = 'Contact number must be 10 digits'
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData)
      alert(isLogin ? 'Login successful!' : 'Registration successful!')
      // Redirect to dashboard after successful login
      window.location.href = '/dashboard'
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">
            <div className="logo-icon">UF</div>
            <div className="logo-text">
              <div className="logo-main">UFDR</div>
              <div className="logo-sub">Analytic Tool</div>
            </div>
          </div>
          <h1 className="login-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="login-subtitle">
            {isLogin ? 'Sign in to your account' : 'Join us today and get started'}
          </p>
        </div>

      <form className="form" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-row">
            <div className="form-group">
              <label className="label" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter your first name"
              />
              {errors.firstName && <div className="error">{errors.firstName}</div>}
            </div>
            <div className="form-group">
              <label className="label" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter your last name"
              />
              {errors.lastName && <div className="error">{errors.lastName}</div>}
            </div>
          </div>
        )}

        <div className="form-group">
          <label className="label" htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="input"
            placeholder="Enter your email"
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className="form-group">
          <label className="label" htmlFor="password">Password</label>
          <div className="password-toggle">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input"
              placeholder="Enter your password"
            />
            <span className="eye-icon" onClick={togglePasswordVisibility}>
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </span>
          </div>
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        {!isLogin && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-toggle">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="Confirm your password"
                />
                <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </span>
              </div>
              {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
            </div>

            <div className="form-group">
              <label className="label" htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleInputChange}
                className="input"
                placeholder="Enter your contact number"
              />
              {errors.contactNumber && <div className="error">{errors.contactNumber}</div>}
            </div>

          </>
        )}

        <button type="submit" className="submit-btn">
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="toggle-form">
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            className="toggle-link"
            onClick={() => {
              setIsLogin(!isLogin)
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                contactNumber: ''
              })
              setErrors({})
            }}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
      </div>
    </div>
  )
}
