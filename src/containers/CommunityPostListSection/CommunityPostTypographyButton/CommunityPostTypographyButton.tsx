import React from 'react';
import { CustomTypography } from '@src/containers/CommunityPostListSection/CommunityPostTypographyButton/CommunityPostTypographyButton.style';
import { CommunityPostTypographyButtonType } from '@interfaces/community';

function CommunityPostTypographyButton({
  name,
  margin,
  children,
  onClick,
}: CommunityPostTypographyButtonType) {
  const getChildren = () => {
    if (name) return `${name} ` + children;
    else return children;
  };
  return (
    <CustomTypography margin={margin} onClick={onClick}>
      {getChildren()}
    </CustomTypography>
  );
}

export default CommunityPostTypographyButton;
