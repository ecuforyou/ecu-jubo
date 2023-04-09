import { CSSProperties, PropsWithChildren } from 'react';
import { COLOR, TYPO } from './theme';

interface BoxProps extends PropsWithChildren {
  primary?: boolean;
  extendedStyle?: CSSProperties;
}

const defaultStyle: CSSProperties = {
  width: '100%',
  height: TYPO.h4 + 16,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: COLOR.primary1,
  fontSize: TYPO.sm,
  borderRadius: 2,
  backgroundColor: COLOR.white,
  wordBreak: 'keep-all',
  textAlign: 'center',
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
  return <div style={style}>{props.children}</div>;
}
