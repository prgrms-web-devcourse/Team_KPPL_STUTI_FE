import { setMbtiColor } from '@utils/setMbtiColor';

import { TextWrapper } from './style';

interface Props {
  mbtis: string[];
}

function StudyCreateMbtiRecommend({ mbtis }: Props) {
  return (
    <TextWrapper>
      추천 MBTI는
      {mbtis &&
        mbtis.map((mbti) => {
          return (
            <div
              key={mbti}
              style={{ color: setMbtiColor(mbti), margin: '0 2px' }}
            >
              {mbti}
            </div>
          );
        })}
      입니다.
    </TextWrapper>
  );
}

export default StudyCreateMbtiRecommend;
