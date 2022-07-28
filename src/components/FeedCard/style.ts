import Box from '@mui/material/Box';
import styled from '@emotion/styled';

export const ContentsWrapper = styled.div`               
  overflow: 'hidden',
  textOverflow: 'ellipsis';
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  `;

export const FeedContent = styled(Box)`
  margin: 20px 0 0 16.5;
  display: flex;
`;
