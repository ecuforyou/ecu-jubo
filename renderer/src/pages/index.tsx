import { Wrapper } from '@/components/Wrapper';
import { Jubo } from '@/components/Jubo';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Metadata,
} from 'next';
import { GoogleSheetAPI } from './api/sheet';
import { JuboData, RawJuboData, SheetName } from '@/types';
import { MetadataContext } from '@/context/MetadataContext';

export default function Home(data: JuboData) {
  const { metadata } = data;
  return (
    <MetadataContext.Provider value={metadata}>
      <Wrapper>
        <Jubo {...data} metadata={metadata} />
      </Wrapper>
    </MetadataContext.Provider>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<JuboData>> {
  log('crawling started');

  const api = new GoogleSheetAPI();
  const targetSheetNames: SheetName[] = [
    'timetable',
    'evangelize',
    'notice',
    'metadata',
    'orders',
  ];
  const sizeDatas = await Promise.all(
    targetSheetNames.map(async (name) => {
      const data = await api.getData(`${name}!A1:B1`);
      return As2DString(data);
    })
  );
  log('crawled sizes');

  const datas = await Promise.all(
    sizeDatas.map(async (sizeData, i) => {
      const [rows, cols] = sizeData[0].map((e) => parseInt(e));
      const data = await api.getData(
        `${targetSheetNames[i]}!A2:${String.fromCharCode(65 + cols - 1)}${
          rows + 1
        }`
      );
      return { name: targetSheetNames[i], cols, rows, data: As2DString(data) };
    })
  );
  log('crawled important data');

  const prepared = datas.reduce((acc, { name, cols, rows, data }) => {
    acc[name] = { cols, rows, data: data.flat() };
    return acc;
  }, {} as RawJuboData);

  const metadata = Object.fromEntries(
    prepared.metadata.data.reduce((acc, e, i) => {
      const idx = Math.floor(i / 2);
      if (i % 2 === 0) acc.push([e]);
      else acc[idx].push(e);
      return acc;
    }, [] as string[][])
  ) as Metadata;

  const jubodata = { ...prepared, metadata } as JuboData;
  log('call finished');

  return {
    props: {
      ...jubodata,
    },
  };
}

function As2DString(data?: any[][] | null) {
  return data as string[][];
}

function log(data: any) {
  console.log(`[${new Date()}]`, data);
}
