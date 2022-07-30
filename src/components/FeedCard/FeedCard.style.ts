import Box from '@mui/material/Box';
import styled from '@emotion/styled';

import { BoxProps } from './FeedCard';

export const ContentsWrapper = styled.div`
  overflow: 'hidden',
  textOverflow: 'ellipsis';
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  `;

export const FeedBoxWrapper = styled(Box)<BoxProps>`
  margin: ${({ margin }) => margin};
`;
