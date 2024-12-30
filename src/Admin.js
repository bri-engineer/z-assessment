import React, { useEffect, useState } from 'react';

const Admin = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchConfig = async () => {
    try {
      const response = await fetch('/admin');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      console.log('Fetched config data:', data);
      setConfig(data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfig();
    console.log('Config in Admin:', config);
  }, []);

  const handleSelect = async (component, page, e) => {
    const updatedConfig = { ...config, [component]: page };
    //Ensuring at least 1 and at most 2 components are in page2
    const page2Count = Object.values(updatedConfig).filter(
      (p) => p === 'page2',
    ).length;
    if (page2Count > 2 || page2Count < 1) return;
    setConfig(updatedConfig);
    try {
      const response = await fetch('/admin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          biography: updatedConfig['biography'],
          address: updatedConfig['address'],
          birthdate: updatedConfig['birthdate'],
        }),
      });
    } catch (error) {
      console.error('Error updating configs:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className='box'>
      <h2>Admin Page</h2>
      <div>
        <h3>
          <label>Page 1: </label>{' '}
        </h3>
        <label>{'Sign-in'}:</label>
        <select value={'Page1'}>
          <option key={'Page1'} value={'Page 1'}>
            {'Page 1'}
          </option>
        </select>

        <h3>
          <label>Page 2 & 3: </label>
        </h3>
      </div>{' '}
      {Object.keys(config).map((component) => (
        <div key={component}>
          <label>{component}:</label>
          <select
            onChange={(e) => handleSelect(component, e.target.value, e)}
            value={config[component] || ''}
          >
            <option value='page3'>Page 3</option>
            <option value='page2'>Page 2</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Admin;
