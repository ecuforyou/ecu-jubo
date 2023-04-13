import { Container } from '@/common/Container';
import { TextBox } from '@/common/TextBox';
import { COLOR, TYPO } from '@/common/theme';
import { MetadataContext } from '@/context/MetadataContext';
import { useContext } from 'react';

interface FooterProps {}
export function Footer(props: FooterProps) {
  const metadata = useContext(MetadataContext);
  return (
    <Container
      width={'76%'}
      extendedStyle={{
        padding: '0 2% 0 2%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderLeft: `4px solid ${COLOR.primary1}`,
        borderRight: `4px solid ${COLOR.primary1}`,
        marginTop: 20,
      }}
    >
      <TextBox size={TYPO.sm} extendedStyle={{ fontWeight: 700 }}>
        {metadata.meeting_name ?? ''}
      </TextBox>
      <TextBox size={TYPO.sm} extendedStyle={{ fontWeight: 700 }}>
        {metadata.address ?? ''}
      </TextBox>
    </Container>
  );
}
