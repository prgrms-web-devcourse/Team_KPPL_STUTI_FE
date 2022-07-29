import { Global, css } from '@emotion/react';

const styles = css`
  /* reset */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;

    &::before,
    &::after {
      box-sizing: border-box;
    }
  }

  /* input {
    border: 0;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  } */

  /* textarea {
    border: 0;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    resize: none;
  } */

  /* select {
    border: 0;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  } */

  fieldset {
    border: 0;
  }

  /* button {
    border: 0;
    background-color: transparent;
    color: inherit;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    cursor: pointer;
  } */

  a {
    color: inherit;
    text-decoration: none;
  }

  ul,
  ol {
    list-style: none;
  }

  table {
    border: 0;
    border-collapse: collapse;
    border-spacing: 0;
  }

  dialog {
    border: 0;
  }

  /* img {
    max-width: 100%;
    height: auto;
  } */

  /* fonts */
  body {
    font-family: 'Spoqa Han Sans Neo', 'sans-serif';
    color: '#111827';
    line-height: 1.5;
  }
`;

export function GlobalStyle() {
  return <Global styles={styles} />;
}
