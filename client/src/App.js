import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import MainContainer from './container/MainContainer';
import { getAllProducts } from './utils/api/products';
import './App.css';

const AppContext = createContext({});

const App = () => {
  const [products, setProducts] = useState();
  const [totals, setTotals] = useState();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!products) {
      getAllProducts().then((result) => {
        setProducts(result);
        setTotals(result.length);
      });
    }
  }, [products]);

  const store = {
    products: { get: products, set: setProducts },
    pagination: {
      totals: {
        get: totals,
        set: setTotals,
      },
      page: {
        get: page,
        set: setPage,
      },
    },
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
