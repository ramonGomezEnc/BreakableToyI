import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
  }

  #root {
    margin: 0 auto;
    padding: 20px;
  }

  input, select, button {
    width: 100%;
    max-width: 100%;
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    max-width: 100%;
    margin: 20px auto;
    border-collapse: collapse;
  }

  th, td {
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }

  button {
    display: block;
    width: fit-content;
    padding: 8px 16px;

  }
`;
