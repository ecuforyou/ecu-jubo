import { CSSProperties, PropsWithChildren } from 'react';

export function Wrapper(props: PropsWithChildren<{ juboPngAreaId: string }>) {
  return (
    <div id={props.juboPngAreaId} style={wrapperStyle}>
      {props.children}
    </div>
  );
}
const wrapperStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 1200,
  backgroundColor: '#f4f5fb',
};
