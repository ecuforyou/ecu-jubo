import { TextBox } from '@/common/TextBox';
import { WEIGHT } from '@/common/theme';
import { useMemo } from 'react';

export function SubTitle() {
  // TODO : read from google sheet
  const words = useMemo(() => {
    const texts = `그의 계명은 이것이니
      곧 그 이름 예수 그리스도의 이름을 믿고
      그가 우리에게 주신 계명대로 서로 사랑할 것이니라`.split('\n');
    return texts.map((e, i) => {
      if (i - 1 === texts.length) return e;
      return (
        <div key={i}>
          {e}
          <br />
        </div>
      );
    });
  }, []);
  const from = useMemo(() => `요한일서 3장 23절`, []);

  return (
    <>
      <TextBox extendedStyle={{ fontWeight: WEIGHT.bold }}>{words}</TextBox>
      <TextBox extendedStyle={{ fontWeight: WEIGHT.normal }}>{from}</TextBox>
    </>
  );
}
