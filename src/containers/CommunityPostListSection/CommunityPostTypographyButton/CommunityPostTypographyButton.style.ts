import { Typography } from '@mui/material';
import { CommunityPostTypographyButtonType } from '@interfaces/community';
import styled from '@emotion/styled';

export const CustomTypography = styled(
  Typography,
)<CommunityPostTypographyButtonType>`
  display: inline-block;
  cursor: pointer;
  margin: ${({ margin }) => margin};
  color: ${({ theme }) => theme.palette.text.secondary};

  &:hover {
    text-decoration: underline;
  }
`;
