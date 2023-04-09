import { CSSProperties } from 'react';
import { COLOR, TYPO } from './theme';

interface BoxProps {
  value?: string;
  primary?: boolean;
  extendedStyle?: CSSProperties;
}

const defaultStyle: CSSProperties = {
  color: COLOR.primary1,
  fontSize: TYPO.sm,
  borderRadius: 2,
  backgroundColor: COLOR.white,
  marginTop: 12,
};
const primaryStyle: CSSProperties = {
  fontSize: TYPO.h4,
  fontWeight: 600,
  backgroundColor: COLOR.primary2,
};

export function Box(props: BoxProps) {
  const style = props.primary
    ? { ...defaultStyle, ...primaryStyle, ...props.extendedStyle }
    : { ...defaultStyle, ...props.extendedStyle };
  return <div style={style}>{props.value}</div>;
}
