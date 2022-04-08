import React from 'react';
import './App.css';
import { defaultTheme, Provider } from '@adobe/react-spectrum';
import Catalog from './components/Catalog';
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import CatalogBreed from './components/CatalogBreed';
import CatalogCompare from './components/CatalogCompare';

function App() {

  return (
    <Provider theme={defaultTheme}>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Catalog />} />
              <Route path={'/breeds/:breedId'} element={<CatalogBreed />} />
              <Route path={'/compare/:breedOne/:breedTwo'} element={<CatalogCompare />} />
          </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
