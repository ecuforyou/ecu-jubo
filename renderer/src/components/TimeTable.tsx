import { Container } from '@/common/Container';
import { Table } from '@/common/Table';
import { TextBox } from '@/common/TextBox';
import { TYPO, WEIGHT } from '@/common/theme';

export function TimeTable() {
  // TODO: Crawl from google sheets
  const cols = 3;
  const data = [
    '일정',
    '시간',
    '내용 및 담당',
    '찬양, 기도 / 봉독',
    '14:00~',
    '신용혁, 구자훈',
    '설교',
    '~15:30',
    '마태복음 9:11~21 - 박영덕 목사님',
    '성경 공부',
    '15:30 ~ 17:00',
    '사무엘상 6장',
    '기도회',
    '17:00 ~ 17:30',
    '박승주 전도사님',
    '식사 교제',
    '17:30~',
    '-',
  ];
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
