import styled from '@emotion/styled';

export const Article = styled.article`
  position: relative;
  max-width: 608px;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  background-color: ${({ theme }) => theme.palette.background.default};
  transition: box-shadow 300ms;

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows[2]};
  }
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  border-radius: 0.5rem;

  @media (max-width: 568px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 204px;
  padding: 1rem;
`;

export const TitleH3 = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.25rem;
  font-size: ${({ theme }) => theme.typography.h4.fontSize};
  line-height: ${({ theme }) => theme.typography.h4.lineHeight};
`;

export const SubtitleP = styled.p`
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
  font-weight: 500;
  line-height: ${({ theme }) => theme.typography.body2.lineHeight};
  color: ${({ theme }) => theme.palette.secondary.main};
`;

export const P = styled.p`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  line-height: ${({ theme }) => theme.typography.caption.lineHeight};
  color: ${({ theme }) => theme.palette.secondary.main};

  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`;

export const Ul = styled.ul`
  display: flex;
  justify-content: start;
  gap: 0.5rem;
`;

export const RightColumn = styled.div`
  flex-shrink: 0;
  width: 296px;
  height: 204px;

  @media (max-width: 568px) {
    width: 100%;
    order: -1;
  }
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
