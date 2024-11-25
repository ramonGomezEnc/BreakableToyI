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
  }

  #root {
    max-width: 1600px;
    margin: 0 auto;
  }

  input, select, button {
    width: 100%;
    max-width: 600px
    margin-bottom: 10px;
  }

  table {
    width: 100%
    max-width: 1200px;
    margin: 20px auto
    border-collapse: collapse;
  }

  th, td {
    padding: 10px;
    text-align: left;
  }

  th {
    background-color: #ddd
  }

  td {
    border-bottom: 1px solid #ccc
  }

  button {
    display: block;
    width: fit-content;
    padding: 10px 20px;
  }
`;
