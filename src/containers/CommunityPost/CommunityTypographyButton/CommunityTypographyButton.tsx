import React from 'react';
import { CustomTypography } from '@src/containers/CommunityPost/CommunityTypographyButton/CommunityTypographyButton.style';

export interface CommunityTypographyButtonType {
  name?: string | undefined;
  margin?: string;
  children?: string | number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

function CommunityTypographyButton({
  name,
  margin,
  children,
  onClick,
}: CommunityTypographyButtonType) {
  const getChildren = () => {
    if (name) return name + children;
    else return children;
  };
  return (
    <CustomTypography margin={margin} onClick={onClick}>
      {getChildren()}
    </CustomTypography>
  );
}

export default CommunityTypographyButton;
