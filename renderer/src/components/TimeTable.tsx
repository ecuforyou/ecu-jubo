import { Container } from '@/common/Container';
import { Table } from '@/common/Table';
import { TextBox } from '@/common/TextBox';
import { TYPO, WEIGHT } from '@/common/theme';
import { ITable } from './Jubo';

interface TimeTableProps extends ITable {}
export function TimeTable(props: TimeTableProps) {
  const { cols, rows, data } = props;

  const cleaner = '3조';
  return (
    <Container width={'90%'} extendedStyle={{ marginTop: 20 }}>
      <TextBox size={TYPO.h1} extendedStyle={{ fontWeight: 700 }}>
        일정 안내
      </TextBox>
      <Table isPrimary={(idx) => idx < cols} data={data} />
      <TextBox
        size={TYPO.xs}
        extendedStyle={{ width: '90%', textAlign: 'end', marginTop: 8 }}
      >
        청소: {cleaner}
      </TextBox>
    </Container>
  );
}
