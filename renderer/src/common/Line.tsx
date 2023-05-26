import { CSSProperties, PropsWithChildren, useMemo } from 'react';
import { COLOR, TYPO } from './theme';

interface LinePropx extends PropsWithChildren {
  width?: number;
  height?: number;
  extendedStyle?: CSSProperties;
}

export function Line(props: LinePropx) {
  const lineStyle: CSSProperties = useMemo(
    () => ({
      width: props.width ?? 28,
      height: props.height ?? 6,
      backgroundColor: COLOR.primary1,
      ...props.extendedStyle,
    }),
    [props.width, props.height, props.extendedStyle]
  );
  return <div style={lineStyle}></div>;
}
