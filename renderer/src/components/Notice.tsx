import { Box } from '@/common/Box';
import { Container } from '@/common/Container';
import { TextBox } from '@/common/TextBox';
import { TYPO, WEIGHT } from '@/common/theme';
import { ITable } from '@/types';

interface NoticeProps extends ITable {}

export function Notice(props: NoticeProps) {
  const { cols, rows, data } = props;
  return (
    <Container width={'80%'} extendedStyle={{ marginTop: 20 }}>
      <Box
        primary
        extendedStyle={{
          height: '100%',
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
          {data.map((e, i) => (
            <TextBox
              key={i}
              size={TYPO.sm}
              extendedStyle={{ fontWeight: WEIGHT.normal }}
            >
              {e}
            </TextBox>
          ))}
        </Container>
      </Box>
    </Container>
  );
}

// TODO: When no notice -> 박영덕 목사님 소개
function defaultNotice() {
  return <></>;
}
