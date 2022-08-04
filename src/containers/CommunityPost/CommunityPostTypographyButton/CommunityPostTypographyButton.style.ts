import { Typography } from '@mui/material';
import styled from '@emotion/styled';
import { CommunityPostTypographyButtonType } from '@containers/CommunityPost/CommunityPostTypographyButton/CommunityPostTypographyButton';

export const CustomTypography = styled(
  Typography,
)<CommunityPostTypographyButtonType>`
  display: inline-block;
  cursor: pointer;
  margin: ${({ margin }) => margin};

  &:hover {
    text-decoration: underline;
  }
`;
