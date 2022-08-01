import React from 'react';
import { CustomTypography } from '@containers/CommunityCard/CommunityTypographyButton.style';

export interface Props {
  children?: string;
  margin?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

function CommunityTypographyButton(props: Props) {
  return (
    <CustomTypography margin={props.margin} onClick={props.onClick}>
      {props.children}
    </CustomTypography>
  );
}

export default CommunityTypographyButton;
