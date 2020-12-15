import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import MainContainer from './container/MainContainer';
import { getAllProducts } from './utils/api/products';
import './App.css';

const AppContext = createContext({});

const App = () => {
  const [products, setProducts] = useState();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((result) => setProducts(result));
    }
  }, [products]);

  const store = {
    products: { get: products, set: setProducts },
  };

  return (
    <div className="App">
      {products && (
        <AppContext.Provider value={store}>
          <BrowserRouter>
            <MainContainer>
              <Routes />
            </MainContainer>
          </BrowserRouter>
        </AppContext.Provider>
      )}
    </div>
  );
};

export { App, AppContext };
