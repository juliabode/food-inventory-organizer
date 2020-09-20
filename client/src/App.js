import React from 'react';
import MainContainer from './container/MainContainer';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainContainer>
          <Routes />
        </MainContainer>
      </BrowserRouter>
    </div>
  );
}

export default App;
