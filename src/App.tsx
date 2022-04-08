import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { defaultTheme, Provider, Button, Flex, Grid, View } from '@adobe/react-spectrum';
import Catalog from './components/Catalog';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import CatalogBreed from './components/CatalogBreed';

function App() {

  return (
    <Provider theme={defaultTheme}>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Catalog />} />
            <Route path={'/breeds/:breedId'} element={<CatalogBreed />} />
          </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
