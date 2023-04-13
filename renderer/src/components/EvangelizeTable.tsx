import { Container } from '@/common/Container';
import { Table } from '@/common/Table';
import { TextBox } from '@/common/TextBox';
import { TYPO, WEIGHT } from '@/common/theme';
import { MetadataContext } from '@/context/MetadataContext';
import { ITable, Metadata } from '@/types';
import { useContext } from 'react';

interface EvangelizeTableProps extends ITable {}

export function EvangelizeTable(props: EvangelizeTableProps) {
  const metadata = useContext(MetadataContext);
  const { cols, rows, data } = props;
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
        {metadata.campus_list ?? ''}
      </TextBox>
    </Container>
  );
}
