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
import { sheets_v4 } from 'googleapis';
import { As2DString, log } from '@/util';
import html2canvas from 'html2canvas';
import dayjs from 'dayjs';

const juboPngAreaId = 'jubo-png-area';
function saveJuboToPng() {
  const jubo = document.getElementById(juboPngAreaId);
  jubo &&
    html2canvas(jubo).then((res) => {
      const url = res.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = `${dayjs().format('YYYYMMDD')}.png`;
      link.click();
    });
}

export default function Home(data: JuboData) {
  const { metadata } = data;
  return (
    <MetadataContext.Provider value={metadata}>
      <div id={juboPngAreaId}>
        <Wrapper>
          <Jubo {...data} metadata={metadata} />
        </Wrapper>
      </div>
      <div
        style={{ textAlign: 'center', color: '#a4a5ab', marginBottom: 12 }}
        onClick={saveJuboToPng}
      >
        이미지로 저장
      </div>
    </MetadataContext.Provider>
  );
}

export async function getServerSideProps({
  req,
  res,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<JuboData>> {
  log('call started');

  const api = new GoogleSheetAPI();
  const targetSheetNames: SheetName[] = [
    'timetable',
    'evangelize',
    'notice',
    'metadata',
    'orders',
  ];
  const sizeRanges = targetSheetNames.map((name) => `${name}!A1:B1`);
  const batchedSizeDatas = (await api.getDatas(
    sizeRanges
  )) as sheets_v4.Schema$ValueRange[];
  const sizeDatas = batchedSizeDatas.map((s) => As2DString(s.values));

  const dataRanges = sizeDatas.map((sizeData, i) => {
    const [rows, cols] = sizeData[0].map((e) => parseInt(e));
    return `${targetSheetNames[i]}!A2:${String.fromCharCode(65 + cols - 1)}${
      rows + 1
    }`;
  });
  const batchedData = (await api.getDatas(
    dataRanges
  )) as sheets_v4.Schema$ValueRange[];
  const datas = batchedData
    .map((d) => As2DString(d.values))
    .map((data, i) => {
      const [rows, cols] = sizeDatas[i][0].map((e) => parseInt(e));
      return { name: targetSheetNames[i], cols, rows, data };
    });

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
