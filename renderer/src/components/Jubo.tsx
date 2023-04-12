import { CSSProperties } from 'react';
import { EvangelizeTable } from './EvangelizeTable';
import { Footer } from './Footer';
import { Notice } from './Notice';
import { SubTitle } from './Subtitle';
import { TimeTable } from './TimeTable';
import { Title } from './Title';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';

export interface IJubo {
  data: {
    timetable: ITable;
    evangelize: ITable;
  };
}
export interface ITable {
  rows: number;
  cols: number;
  data: string[];
}

export function Jubo(props: IJubo) {
  // useEffect or fetch to google sheets
  // give data to each components' props
  const { timetable, evangelize } = props.data;
  return (
    <div style={juboStyle} id="jubo">
      <Title />
      <SubTitle />
      <TimeTable {...timetable} />
      <EvangelizeTable {...evangelize} />
      <Notice />
      <Footer />
    </div>
  );
}

const juboStyle: CSSProperties = {
  minWidth: '794px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 24,
  paddingBottom: 24,
};
