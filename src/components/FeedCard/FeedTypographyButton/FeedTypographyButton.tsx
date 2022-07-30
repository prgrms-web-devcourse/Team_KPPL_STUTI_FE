import React from 'react';
import { CustomTypography } from '@src/components/FeedCard/FeedTypographyButton/FeedTypographyButton.style';

export interface Props {
  children?: string;
  margin?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

function FeedTypographyButton(props: Props) {
  return (
    <CustomTypography margin={props.margin} onClick={props.onClick}>
      {props.children}
    </CustomTypography>
  );
}

export default FeedTypographyButton;
