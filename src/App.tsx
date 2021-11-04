import { Fragment } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import HomePage from './pages/home/home-page';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: lightgrey;
  }
`;

const AppWrapper = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  return (
    <Fragment>
      <GlobalStyle />
      <AppWrapper>
        <HomePage />
      </AppWrapper>
    </Fragment>
  );
}

export default App;
