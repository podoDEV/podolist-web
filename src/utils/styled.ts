import themeStyled, { CreateStyled } from "@emotion/styled";
import { Color } from "constants/Color";

export type Theme = {
  color: {
    primary: {
      main: Color.PRIMARY;
      contrastText: Color.
    };
    gray: Color.GRAY_300;
  };
};

export const theme: Theme = {
  color: {
    primary: Color.PRIMARY,
    gray: Color.GRAY_300
  }
};

export type ThemeColorTypes = keyof Theme["color"];

export default themeStyled as CreateStyled<Theme>;
