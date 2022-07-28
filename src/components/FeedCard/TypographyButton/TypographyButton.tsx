import React from 'react';
import { CustomTypography } from '@src/components/FeedCard/TypographyButton/style';

export interface Props {
  children?: string;
  margin?: string;
}

function TypographyButton(props: Props) {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    console.log(event);
  };

  return (
    <CustomTypography margin={props.margin} onClick={handleClick}>
      {props.children}
    </CustomTypography>
  );
}

export default TypographyButton;
