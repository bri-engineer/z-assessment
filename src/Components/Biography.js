import '../App.css';
import { useState } from 'react';
import { useEmail } from '../AdminComponents/EmailContext';

function Biography() {
  const { email, setEmail } = useEmail();
  const [biography, setBiography] = useState('');

  const handleBiographySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/updateBiography', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, biography }),
      });
    } catch (error) {
      console.error('Error updating biography:', error);
    }
    setBiography('');
  };

  return (
    <div className='child'>
      <label htmlFor='about-me'>About Me</label>
      <form onSubmit={handleBiographySubmit}>
        <input
          id='textbox'
          type='text'
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
          placeholder='Write about me'
        />
        <br />
        <button type='submit'> Submit </button>
      </form>
    </div>
  );
}

export default Biography;
