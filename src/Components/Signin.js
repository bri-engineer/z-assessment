import '../App.css';
import React, { useState } from 'react';
import { useEmail } from '../AdminComponents/EmailContext';

function Signin() {
  const { email, setEmail } = useEmail();
  const [password, setPassword] = useState('');

  const handleMemberSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
    } catch (error) {
      console.error('Error posting a new user:', error);
    }
    setEmail(email);
    setPassword('');
  };

  return (
    <div className='child'>
      <form onSubmit={handleMemberSubmit}>
        <label htmlFor='email'>e-mail</label> {'  '}
        <input
          type='text'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Member e-mail'
        />
        <br /> <br />
        <label htmlFor='password'>Password</label> {'  '}
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Member password'
        />
        {'  '}
        <button type='submit'> Submit </button>
      </form>
    </div>
  );
}

export default Signin;
