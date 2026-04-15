import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;
  const protocol = window.location.protocol;
  const endpoint = codespaceName
    ? `${protocol}//${codespaceName}-8000.app.github.dev/api/activities/`
    : '/api/activities/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching Activities from:', endpoint);
        const response = await fetch(endpoint);
        const data = await response.json();
        console.log('Fetched Activities data:', data);
        setActivities(data.results || data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  if (loading) return <div className="text-center mt-4">Loading Activities...</div>;

  return (
    <div className="card shadow-sm mt-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary">Activities</h2>
        {activities.length === 0 ? (
          <div className="alert alert-info">No activities found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  {Object.keys(activities[0]).map((key) => (
                    <th key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    {Object.values(activity).map((value, i) => (
                      <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activities;
