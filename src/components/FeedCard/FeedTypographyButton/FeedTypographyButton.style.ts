import { Typography } from '@mui/material';
import styled from '@emotion/styled';

import { Props } from './FeedTypographyButton';

export const CustomTypography = styled(Typography)<Props>`
  display: inline-block;
  cursor: pointer;
  margin: ${({ margin }) => margin};

  &:hover {
    text-decoration: underline;
  }
`;
