import { CSSProperties, PropsWithChildren } from 'react';

interface ContainerProps extends PropsWithChildren {
  width?: string;
  extendedStyle?: CSSProperties;
}
export function Container(props: ContainerProps) {
  return <div style={containerStyle(props)}>{props.children}</div>;
}

const containerStyle = (props: ContainerProps): CSSProperties => {
  return {
    width: props.width ?? '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    ...props.extendedStyle,
  };
};
