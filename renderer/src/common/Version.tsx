import { CSSProperties, PropsWithChildren, useContext, useMemo } from 'react';
import { COLOR, TYPO } from './theme';
import { Container } from './Container';
import { TextBox } from './TextBox';
import { MetadataContext } from '@/context/MetadataContext';
import { parseVersion } from '@/util/dayjs';
import { WEIGHT } from './theme';

interface VersionProps extends PropsWithChildren {}

export function Version(props: VersionProps) {
  const { version } = useContext(MetadataContext);
  const date = parseVersion(version);
  return (
    <Container
      width={'80%'}
      extendedStyle={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        height: '0px',
      }}
    >
      <TextBox extendedStyle={{ fontWeight: WEIGHT.bold }}>{date}</TextBox>
    </Container>
  );
}
