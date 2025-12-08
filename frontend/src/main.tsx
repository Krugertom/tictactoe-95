import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { styleReset } from 'react95';
import original from 'react95/dist/themes/original';
import { App } from '@/App';
import { ensureReact95FontsLoaded } from '@/styles/fonts';

// Followed mostly from REACT95 Startup Guide - {https://www.npmjs.com/package/react95}
const GlobalStyles = createGlobalStyle`
  ${styleReset}

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body, input, select, textarea {
    font-family: 'ms_sans_serif', Arial, sans-serif;
  }

  body {
    min-height: 100vh;
    margin: 0;
    background: ${({ theme }) => theme.desktopBackground};
    color: #000;
  }

  #root {
    height: 100vh;
  }
`;

void ensureReact95FontsLoaded();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={original}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
