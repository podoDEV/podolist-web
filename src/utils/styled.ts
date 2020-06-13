import themeStyled, { CreateStyled } from "@emotion/styled";
import { Color } from "constants/Color";

export type Theme = {
  color: {
    primary: {
      main: Color.PRIMARY;
      contrastText: Color.PRIMARY;
    };
    gray: Color.LIGHT_GRAY;
  };
};

// export const theme: Theme = {
// color: {
//   primary: Color.PRIMARY,
//   gray: Color.LIGHT_GRAY
// }
// };

export type ThemeColorTypes = keyof Theme["color"];

export default themeStyled as CreateStyled<Theme>;
