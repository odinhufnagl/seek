import { Dispatch } from 'react';

export interface Theme {
  black: string;
  white: string;
  transparent: string;
  brand: string;
  disabled: string;
  success: string;
  error: string;
  background: {
    primary: string;
    secondary: string;
    third: string;
  };
  glass: string;
  indicator: string;
  base: {
    primary: string;
    high: string;
    medium: string;
    low: string;
  };
}

export type ThemeContextProps = {
  theme: Theme;
  setTheme: Dispatch<any>;
};

export type ThemeProps = Theme;
