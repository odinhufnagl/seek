import { Dispatch } from 'react';

export interface ITheme {
  black: string;
  white: string;
  transparent: string;
  backgroundColor: string;
  brandColor: string;
  primaryColor: string;
  disabledColor: string;
  successColor: string;
  errorColor: string;
  textPrimaryColor: string;
  textHighColor: string;
  textMediumColor: string;
  textLowColor: string;
  textGreyColor: string;
}

export type ThemeContextProps = {
  theme: ITheme;
  setTheme: Dispatch<any>;
};

export type ThemeProps = ITheme;
