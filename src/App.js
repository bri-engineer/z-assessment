import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rendering from './AdminComponents/Rendering.js';
import Admin from './Admin';
import Data from './Data';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Welcome to User Onboarding!</h1>
        <Routes>
          <Route path='/admin' element={<Admin />} />
          <Route path='/data' element={<Data />} />
          <Route path='/' element={<Rendering />} />
        </Routes>
        <hr />
      </div>
    </Router>
  );
};

export default App;
