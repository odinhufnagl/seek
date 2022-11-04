import React, { useState } from 'react';
import { ITheme } from '../types';
import ThemeContext from './ThemeContext';

type Props = {
  theme: ITheme;
  children: JSX.Element;
};

const ThemeProvider: React.FC<Props> = ({ theme: defaultTheme, children }) => {
  const [theme, setTheme] = useState(defaultTheme);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
