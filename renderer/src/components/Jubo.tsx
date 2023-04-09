import { CSSProperties } from 'react';
import { EvangelizeTable } from './EvangelizeTable';
import { Footer } from './Footer';
import { Notice } from './Notice';
import { SubTitle } from './Subtitle';
import { TimeTable } from './TimeTable';
import { Title } from './Title';

export function Jubo() {
  return (
    <div style={juboStyle} id="jubo">
      <Title />
      <SubTitle />
      <TimeTable />
      <EvangelizeTable />
      <Notice />
      <Footer />
    </div>
  );
}

const juboStyle: CSSProperties = {
  minWidth: '794px',
  minHeight: '1123px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
};
