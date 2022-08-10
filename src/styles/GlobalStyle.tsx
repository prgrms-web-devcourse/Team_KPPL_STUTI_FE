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

  a {
    color: inherit;
    text-decoration: none;
  }

  ul,
  ol {
    list-style: none;
  }

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
