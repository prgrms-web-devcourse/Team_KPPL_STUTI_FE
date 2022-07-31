import { CardMedia } from '@mui/material';
import styled from '@emotion/styled';

interface CardMediaType {
  component: string;
  image: string;
  alt?: string;
}

export const ContentsWrapper = styled.div`
  overflow: 'hidden';
  text-overflow: 'ellipsis';
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
`;

export const CustomCardMedia = styled(CardMedia)<CardMediaType>`
  border-radius: ${({ theme }) => theme.shape.borderRadius};
`;
