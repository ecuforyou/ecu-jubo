import { CSSProperties } from 'react';
import { Box } from './Box';

interface TableProps {
  data: string[];
  isPrimary?: (index: number) => boolean;
  gap?: string;
  gridTemplateColumns?: string;
  primaryBoxStyle?: CSSProperties;
  defaultBoxStyle?: CSSProperties;
}
export function Table(props: TableProps) {
  const { data, isPrimary, primaryBoxStyle, defaultBoxStyle } = props;

  return (
    <div style={timeTableStyle(props)}>
      {data.map((d, i) => (
        <Box
          key={i}
          primary={isPrimary?.(i) ?? false}
          extendedStyle={isPrimary?.(i) ? primaryBoxStyle : defaultBoxStyle}
        >
          {d === '0' ? '' : d}
        </Box>
      ))}
    </div>
  );
}

const timeTableStyle = ({
  gap,
  gridTemplateColumns,
}: TableProps): CSSProperties => {
  return {
    width: '90%',
    display: 'grid',
    gap: gap ?? '6px 6px',
    gridTemplateColumns: gridTemplateColumns ?? '2fr 2fr 4fr',
  };
};
