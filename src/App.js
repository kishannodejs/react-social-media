import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Assuming you're using axios for API calls

function App() {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/auth/login', { username, password }); // Replace with your API endpoint
      console.log(response)
      localStorage.setItem('token', response.data.token); // Store token in local storage
      setIsLoggedIn(true);
      setUserData(response.data);
      getUserData();
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login errors (e.g., display error message)
    }
  };

  const getUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get('http://localhost:3000/auth/profile', config); // Replace with your API endpoint
      console.log(response)
      setUserData(response.data);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      // Handle errors (e.g., log out the user)
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      getUserData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUserData(null);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <h2>Welcome, {userData?.data.payload.name}!</h2> {/* Display user data */}
          <p>Email: {userData?.data.payload.email}</p> 
          {/* Display other user data as needed */}
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="UserEmail"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}

export default App;