import { CSSProperties, PropsWithChildren, useMemo } from 'react';
import { COLOR, TYPO } from './theme';

interface TextBoxProps extends PropsWithChildren {
  size?: number;
  extendedStyle?: CSSProperties;
}

export function TextBox(props: TextBoxProps) {
  const textBoxStyle: CSSProperties = useMemo(
    () => ({
      textAlign: 'center',
      fontSize: props.size ?? TYPO.sm,
      color: COLOR.primary1,
      lineHeight: 1.5,
      ...props.extendedStyle,
    }),
    [props.size, props.extendedStyle]
  );
  return <div style={textBoxStyle}>{props.children}</div>;
}
