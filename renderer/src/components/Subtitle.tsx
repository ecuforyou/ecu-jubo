import { Container } from '@/common/Container';
import { TextBox } from '@/common/TextBox';
import { WEIGHT } from '@/common/theme';
import { MetadataContext } from '@/context/MetadataContext';
import { useContext } from 'react';

interface SubTitleProps {}
export function SubTitle(props: SubTitleProps) {
  const metadata = useContext(MetadataContext);
  const texts = (metadata.words ?? '').split('\n');
  const words = texts.map((e, i) => {
    if (i - 1 === texts.length) return e;
    return (
      <div key={i}>
        {e}
        <br />
      </div>
    );
  });

  const at = metadata.at ?? '';
  return (
    <Container>
      <TextBox extendedStyle={{ fontWeight: WEIGHT.bold }}>{words}</TextBox>
      <TextBox extendedStyle={{ fontWeight: WEIGHT.normal }}>{at}</TextBox>
    </Container>
  );
}
