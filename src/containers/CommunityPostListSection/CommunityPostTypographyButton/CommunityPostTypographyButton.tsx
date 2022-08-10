import { CommunityPostTypographyButtonType } from '@interfaces/community';
import { CustomTypography } from '@containers/CommunityPostListSection/CommunityPostTypographyButton/CommunityPostTypographyButton.style';

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
