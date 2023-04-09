import { Container } from '@/common/Container';
import { TextBox } from '@/common/TextBox';
import { COLOR, TYPO } from '@/common/theme';

export function Footer() {
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
        ECU 토요모임
      </TextBox>
      <TextBox size={TYPO.sm} extendedStyle={{ fontWeight: 700 }}>
        서울 강남구 논현로 87길 23 4층 ECU 선교본부
      </TextBox>
    </Container>
  );
}
