import React, { ReactElement } from 'react';
import { Routes, Route } from 'react-router-dom';

import Search from '../pages/Search';
import Results from '../pages/Results';

function AppRoutes(): ReactElement {
  return (
    <Routes>
      <Route path="/*" element={<Search />} />
      <Route path="/results" element={<Results />} />
    </Routes>
  );
}

export default AppRoutes;
