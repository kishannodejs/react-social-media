// ProfileScreen.js
import React from 'react';
import { useAuth } from './AuthContext';

function ProfileScreen() {
  const { user } = useAuth();

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <p>Email: {user.email}</p> 
          {/* Display other user profile information here */}
        </>
      ) : (
        <div>Loading...</div> 
      )}
    </div>
  );
}

export default ProfileScreen;