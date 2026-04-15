import React, { useEffect, useState } from 'react';

const Teams = () => {

  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol;
  const endpoint = codespaceName
    ? `${protocol}//${codespaceName}-8000.app.github.dev/api/teams/`
    : '/api/teams/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching Teams from:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Fetched Teams data:', data);
        setTeams(data.results || data);
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  if (loading) return <div>Loading Teams...</div>;

  return (
    <div>
      <h2>Teams</h2>
      <ul>
        {teams.map((team, idx) => (
          <li key={team.id || idx}>{JSON.stringify(team)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Teams;
