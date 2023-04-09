export type TypoName = 'large' | 'h1' | 'h2' | 'h3' | 'h4' | 'sm' | 'xs';

export type TypoConfig = {
  [key in TypoName]: number;
};

export const TYPO: TypoConfig = {
  large: 40,
  h1: 36,
  h2: 32,
  h3: 28,
  h4: 24,
  sm: 16,
  xs: 12,
};

export const COLOR = {
  primary1: '#5258A7',
  primary2: '#D0D2EF',
  white: '#FFFFFF',
  background: '#F#F5FB',
};

export const WEIGHT = {
  bold: 700,
  normal: 500,
  light: 300,
};
