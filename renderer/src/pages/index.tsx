import { Wrapper } from '@/components/Wrapper';
import { IJubo, ITable, Jubo } from '@/components/Jubo';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { GoogleSheetAPI } from './api/sheet';

export default function Home(data: IJubo) {
  return (
    <Wrapper>
      <Jubo {...data} />
    </Wrapper>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IJubo>> {
  const api = new GoogleSheetAPI();
  const timetable = As2DString(await api.getData('timetable!A1:C7'));
  const evangelize = As2DString(await api.getData('evangelize!A1:H5'));

  return {
    props: {
      data: {
        timetable: makeTableData(timetable),
        evangelize: makeTableData(evangelize),
      },
    },
  };
}

function As2DString(data?: any[][] | null) {
  return data as string[][];
}

function makeTableData(raw: string[][]) {
  const rows = parseInt(raw[0][0]);
  const cols = parseInt(raw[0][1]);
  const data = raw.slice(1).flat();
  return { rows, cols, data };
}
