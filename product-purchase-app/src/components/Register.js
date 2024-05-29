import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
  
    const user = { username, password, email };
  
    try {
      await axios.post('http://localhost:8080/api/users/register', user);
      setMessage('User registered successfully!');
      setMessageColor('green');
      setUsername('');
      setPassword('');
      setEmail('');
    } catch (error) {
      setMessage('Error registering user: ' + error.response.data.message);
      setMessageColor('red');
    }
  };
  
  return (
    <div className="container">
      <h2 className="title">
      <Link to="/" className="home-link">
        <FontAwesomeIcon icon={faHome} />
      </Link> Register
      </h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Username:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </div>
        <button type="submit" className="btn-register">Register</button>
      </form>
      {message && <p className="message" style={{ color: messageColor }}>{message}</p>}
    </div>
  );
};

export default Register;
