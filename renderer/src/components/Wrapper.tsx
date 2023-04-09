import { CSSProperties, PropsWithChildren } from 'react';

export function Wrapper(props: PropsWithChildren) {
  return <div style={wrapperStyle}>{props.children}</div>;
}
const wrapperStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
};
