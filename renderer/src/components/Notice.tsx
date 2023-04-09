import { Box } from '@/common/Box';
import { Container } from '@/common/Container';
import { TextBox } from '@/common/TextBox';
import { TYPO, WEIGHT } from '@/common/theme';

export function Notice() {
  return (
    <Container width={'80%'} extendedStyle={{ marginTop: 20 }}>
      <Box
        primary
        extendedStyle={{
          minHeight: 160,
        }}
      >
        <Container
          extendedStyle={{
            padding: '4%',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <TextBox size={TYPO.h3}>ECU 일정</TextBox>
          <TextBox size={TYPO.sm} extendedStyle={{ fontWeight: WEIGHT.normal }}>
            ▶ 5월 4일 - 6일 ,  중간 수련회
          </TextBox>
          <TextBox size={TYPO.sm} extendedStyle={{ fontWeight: WEIGHT.normal }}>
            ▶ 5월 20일 ,  전도 집회 및 소풍
          </TextBox>
          <TextBox size={TYPO.sm} extendedStyle={{ fontWeight: WEIGHT.normal }}>
            ▶ 5월 20일 ,  전도 집회 및 소풍
          </TextBox>
        </Container>
      </Box>
    </Container>
  );
}

// TODO: When no notice -> 박영덕 목사님 소개
function defaultNotice() {
  return <></>;
}
