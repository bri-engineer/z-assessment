import React, { useState, useEffect } from 'react';

const Data = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/users');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setUsers(data);
      // console.log('Fetched data:', data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  const formatDate = (ISOdate) => {
    if (ISOdate !== null) {
      const date = new Date(ISOdate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      return formattedDate;
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>User Data Table</h1>
      <table border='1' cellPadding='5' cellSpacing='0'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Password</th>
            <th>Biography</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Zip Code</th>
            <th>Birthday</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan='2'>Fetching data</td>
            </tr>
          ) : (
            users.map((user, index) => (
              <tr key={index}>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.biography}</td>
                <td>{user.street}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.zip_code}</td>
                <td>{formatDate(user.birth_date)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Data;
