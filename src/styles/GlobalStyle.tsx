import { createGlobalStyle } from 'styled-components';
import React from 'react';
import { SlickStyle } from './SlickStyle';

const InitStyle = createGlobalStyle`
  * {
    font-family: 'Spoqa Han Sans', '나눔고딕', 'Malgun Gothic', sans-serif;
    box-sizing: border-box;
  }
  body {
    color: ${props => props.theme.color.text};
  }
  body, p, pre,
  h1, h2, h3, h4, h5, h6,
  ul, ol, li, figure, button {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  h1, h2, h3, h4, h5, h6 {
    font-size: inherit;
    font-weight: normal;
  }
  strong, b {
    font-weight: bold;
  }
  i, em, cite, address {
    font-style: normal;
  }
  small {
    font-size: inherit;
  }
  a {
    &:link,
    &:visited,
    &:hover,
    &:active {
      color: ${props => props.theme.color.tertiary};
      text-decoration: inherit;
    }
  }
  input,
  select,
  button {
    -webkit-appearance: none;
    background: none;
    border: none;
    font-size: inherit;
    color: inherit;

    &:focus {
      outline: none;
    }
    &:disabled {
      cursor: not-allowed;
    }
  }
  a, button {
    cursor: pointer;
  }
  pre {
    white-space: pre-line;
  }
`;

const UtilStyles = createGlobalStyle`
  .invisible {
    position: absolute;
    visibility: hidden !important;
  }
  .d-none {
    display: none !important;
  }
  .prevent-body {
    @media screen and (max-width: 800px) {
      position: fixed;
      width: 100%;
      padding: 0;
      overflow: hidden;
      margin: 0;
      -webkit-overflow-scrolling: touch;
    }
  }
`;

const GlobalStyle: React.FunctionComponent = () => (
  <>
    <InitStyle />
    <SlickStyle />
    <UtilStyles />
  </>
);

export default GlobalStyle;
