import '../App.css';
import { useState } from 'react';
import { useEmail } from '../AdminComponents/EmailContext';

function Address() {
  const { email, setEmail } = useEmail();
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const handleAddressSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/updateAddress', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, street, city, state, zip_code: zip }),
      });
    } catch (error) {
      console.error('Error updating address:', error);
    }
    setStreet('');
    setCity('');
    setState('');
    setZip('');
  };

  return (
    <div className='child'>
      <form onSubmit={handleAddressSubmit}>
        <div>
          <label htmlFor='street-address'>Street Address</label>
          <input
            type='text'
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            placeholder='Street address'
          />
        </div>
        <br></br>
        <div>
          <label htmlFor='city'>City</label>
          <input
            type='text'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder='City'
          />
        </div>
        <br></br>
        <div>
          <label htmlFor='state'>State</label>
          <input
            type='text'
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder='State'
          />
        </div>
        <br></br>
        <div>
          <label htmlFor='zip-code'>Zip Code</label>
          <input
            type='number'
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder='Zip Code'
          />
        </div>
        <br></br>
        <button type='submit'> Submit </button>
      </form>
    </div>
  );
}

export default Address;
