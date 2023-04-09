import { Container } from '@/common/Container';
import { Table } from '@/common/Table';
import { TextBox } from '@/common/TextBox';
import { TYPO, WEIGHT } from '@/common/theme';

export function EvangelizeTable() {
  // TODO: Crawl from google sheets
  const cols = 7;
  const rows = 4;
  const data = [
    '구분',
    '4월 1주',
    '4월 2주',
    '4월 3주',
    '4월 4주',
    '4월 총계',
    '2023년 누계',
    '만난 사람',
    '',
    '',
    '',
    '',
    '',
    '-',
    '복음 들은 사람',
    '',
    '',
    '',
    '',
    '234',
    '-',
    '영접한 사람',
    '',
    '',
    '',
    '',
    '',
    '-',
  ];

  return (
    <Container width={'90%'}>
      <TextBox size={TYPO.h1} extendedStyle={{ fontWeight: WEIGHT.bold }}>
        전도
      </TextBox>
      <Table
        isPrimary={(idx) =>
          idx < cols || idx % cols === 0 || idx % cols === cols - 1
        }
        data={data}
        gap={'4px 4px'}
        gridTemplateColumns={`7fr repeat(${cols - 1}, 5fr)`}
        primaryBoxStyle={{ fontSize: TYPO.xs }}
        defaultBoxStyle={{ fontWeight: WEIGHT.bold }}
      />
      <TextBox size={TYPO.xs} extendedStyle={{ marginTop: 8, fontWeight: 700 }}>
        가천대 / 건국대 / 서울교대 / 연세대 / 한양대 / Wisconsin-Madison
      </TextBox>
    </Container>
  );
}
