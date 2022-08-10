import { CardMedia, Box } from '@mui/material';
import styled from '@emotion/styled';

interface ContentsWrapperType {
  maxLine?: number | string;
}
interface CardMediaType {
  component: string;
  image: string;
  alt?: string;
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

export const CommunityPostCommentWrapper = styled(Box)`
  margin: -0.5rem 1rem 1rem;
`;
