/** @jsx jsx */
import { Global, css, jsx } from "@emotion/core";

export const GlobalStyle = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
      }

      button:active,
      button:focus,
      input:active,
      input:focus {
        outline: none;
      }
    `}
  />
);
