import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #151718;
    color: white;
    line-height: 1.5;
  }

  h2, h3, h4, h5, h6 {
    color: #6a0dad;
  }

  button {
    background-color: #7b2cbf;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s ease;
  }

  button:hover {
    background-color: #5a189a;
  }

  .evento-card {
    background-color: #2e3234;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
  }

  .evento-titulo {
    color: #ffffff;
    font-weight: bold;
    font-size: 1.5rem;
  }

  .modal {
    background-color: #333;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    margin: 50px auto;
  }

  input {
    padding: 10px;
    margin: 10px 0;
    border-radius: 5px;
    border: 1px solid #ccc;
    width: 100%;
  }

  input[type="file"] {
    padding: 0;
  }
`;

export default GlobalStyle;
