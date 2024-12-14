import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:3000/cats');
      console.log(response);
      console.log(response.data);
      setPosts(response.data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((cat) => (
          <li key={cat.id}>{cat.name}:{cat.age}:{cat.breed}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;