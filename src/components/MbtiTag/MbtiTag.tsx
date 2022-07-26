import React from 'react';
import { CustomChip } from '@src/components/MbtiTag/style';

export interface props {
  width?: string;
  height?: string;
  mbti: string;
  cursor?: boolean;
}

function MbtiTag({ width, height, mbti, cursor }: props) {
  return (
    <CustomChip
      label={mbti}
      variant='outlined'
      width={width}
      height={height}
      mbti={mbti}
      cursor={cursor}
    />
  );
}

export default MbtiTag;
