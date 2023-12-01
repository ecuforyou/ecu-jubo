import { CSSProperties, createContext } from 'react';
import { EvangelizeTable } from './EvangelizeTable';
import { Footer } from './Footer';
import { Notice } from './Notice';
import { SubTitle } from './Subtitle';
import { TimeTable } from './TimeTable';
import { Title } from './Title';
import { JuboData, Metadata } from '@/types';
import { Version } from '@/common/Version';

export function Jubo(props: JuboData) {
  const { timetable, evangelize, notice, metadata } = props;
  return (
    <div style={juboStyle} id="jubo">
      <Version />
      <Title />
      <SubTitle />
      <TimeTable {...timetable} />
      <EvangelizeTable {...evangelize} />
      <Notice {...notice} />
      <Footer />
    </div>
  );
}

const juboStyle: CSSProperties = {
  minWidth: 800,
  marginLeft: 360,
  marginRight: 360,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingTop: 24,
  paddingBottom: 24,
};
