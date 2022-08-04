import { CardMedia, Card } from '@mui/material';
import styled from '@emotion/styled';

interface ContentsWrapperType {
  maxLine?: number | string;
}
interface CardMediaType {
  component: string;
  image: string;
  alt?: string;
}

interface CardType {
  margin?: string;
}

export const ContentsWrapper = styled.div<ContentsWrapperType>`
  overflow: 'hidden';
  text-overflow: 'ellipsis';
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ maxLine }) => maxLine};
  -webkit-box-orient: vertical;
`;

export const CustomCardMedia = styled(CardMedia)<CardMediaType>`
  border-radius: ${({ theme }) => theme.shape.borderRadius};
`;

export const CustomCard = styled(Card)<CardType>`
  margin: ${({ margin }) => margin};
  width: '608px';
`;
