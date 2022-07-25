import React from 'react';
import { CustomChip } from '@src/components/MbtiTag/style';

export interface props {
  width?: string;
  height?: string;
  mbti: string;
}

function MbtiTag({ width, height, mbti }: props) {
  return (
    <CustomChip
      label={mbti}
      variant='outlined'
      width={width}
      height={height}
      mbti={mbti}
    />
  );
}

export default MbtiTag;
