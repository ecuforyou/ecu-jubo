import { TextBox } from '@/common/TextBox';
import { COLOR, TYPO } from '@/common/theme';
import Image from 'next/image';
export function Title() {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* <Image
        id="logo"
        src="/logo.png"
        width={164}
        height={72}
        alt="title"
        quality={100}
      /> */}
      <img src="/logo.png" width={164} height={72} alt="title" />
      <TextBox
        size={TYPO.xlarge}
        extendedStyle={{
          color: COLOR.title,
          marginLeft: 24,
          fontFamily: 'KorailRoundGothicBold',
          letterSpacing: '-8px',
        }}
      >
        토요 모임
      </TextBox>
    </div>
  );
}
