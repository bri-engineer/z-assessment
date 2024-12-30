import '../App.css';
import { useState } from 'react';
import { useEmail } from '../AdminComponents/EmailContext';

function Birthdate() {
  const { email, setEmail } = useEmail();
  const [day, setDay] = useState(1);
  const [month, setMonth] = useState('January');
  const [year, setYear] = useState(2025);

  const handleBirthdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/users/updateBirthdate', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, day, month, year }),
      });
    } catch (error) {
      console.error('Error updating birthdate:', error);
    }
    setDay(1);
    setMonth('January');
    setYear(2025);
    setEmail('');
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const years = Array.from({ length: 126 }, (_, i) => 2025 - i);

  return (
    <div className='child'>
      <form onSubmit={handleBirthdateSubmit}>
        <div>
          <label htmlFor='day'>Day</label>
          <select id='day' name='day' value={day} required>
            {days.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='month'>Month</label>
          <select id='month' name='month' value={month} required>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor='year'>Year</label>
          <select id='year' name='year' value={year} required>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button type='submit'> Submit </button>
      </form>
    </div>
  );
}

export default Birthdate;
