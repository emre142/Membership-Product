import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { username, password };

    try {
      const response = await axios.post('http://localhost:8080/api/users/login', user);
      localStorage.setItem('user', JSON.stringify(response.data));
      setMessage('User logged in successfully!');
      navigate('/products');
    } catch (error) {
      console.error('Error logging in user:', error);
      setMessage('Error logging in user: ' + (error.response?.data || 'Unknown error'));
    }
  };

  return (
    <div className="container">
     <h2 className="title">
      <Link to="/" className="home-link">
        <FontAwesomeIcon icon={faHome} />
      </Link> &nbsp;&nbsp;Login
      </h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" className="btn-register">Login</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Login;
