import React, { useEffect, useState } from 'react';

const Leaderboard = () => {

  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol;
  const endpoint = codespaceName
    ? `${protocol}//${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : '/api/leaderboard/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching Leaderboard from:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Fetched Leaderboard data:', data);
        setLeaders(data.results || data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  if (loading) return <div>Loading Leaderboard...</div>;

  return (
    <div>
      <h2>Leaderboard</h2>
      <ul>
        {leaders.map((leader, idx) => (
          <li key={leader.id || idx}>{JSON.stringify(leader)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
