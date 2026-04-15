import React, { useEffect, useState } from 'react';

const Workouts = () => {

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol;
  const endpoint = codespaceName
    ? `${protocol}//${codespaceName}-8000.app.github.dev/api/workouts/`
    : '/api/workouts/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching Workouts from:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Fetched Workouts data:', data);
        setWorkouts(data.results || data);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  if (loading) return <div>Loading Workouts...</div>;

  return (
    <div>
      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout, idx) => (
          <li key={workout.id || idx}>{JSON.stringify(workout)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Workouts;
