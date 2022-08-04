import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { CommunityTypographyButtonType } from '@containers/CommunityPost/CommunityTypographyButton/CommunityTypographyButton';

export const CustomTypography = styled(
  Typography,
)<CommunityTypographyButtonType>`
  display: inline-block;
  cursor: pointer;
  margin: ${({ margin }) => margin};

  &:hover {
    text-decoration: underline;
  }
`;
