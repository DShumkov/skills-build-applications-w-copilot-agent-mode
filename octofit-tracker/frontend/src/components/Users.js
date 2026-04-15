import React, { useEffect, useState } from 'react';

const Users = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol;
  const endpoint = codespaceName
    ? `${protocol}//${codespaceName}-8000.app.github.dev/api/users/`
    : '/api/users/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching Users from:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Fetched Users data:', data);
        setUsers(data.results || data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  if (loading) return <div>Loading Users...</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user, idx) => (
          <li key={user.id || idx}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
