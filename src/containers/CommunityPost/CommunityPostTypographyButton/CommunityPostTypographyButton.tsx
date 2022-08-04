import React from 'react';
import { CustomTypography } from '@src/containers/CommunityPost/CommunityPostTypographyButton/CommunityPostTypographyButton.style';

export interface CommunityPostTypographyButtonType {
  name?: string | undefined;
  margin?: string;
  children?: string | number;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

function CommunityPostTypographyButton({
  name,
  margin,
  children,
  onClick,
}: CommunityPostTypographyButtonType) {
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

export default CommunityPostTypographyButton;
