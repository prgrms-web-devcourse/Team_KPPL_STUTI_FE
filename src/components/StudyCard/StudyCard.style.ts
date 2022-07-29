import styled from '@emotion/styled';

export const Article = styled.article`
  position: relative;
  overflow: hidden;
  max-width: 608px;
  border-radius: 0.5rem;
  box-shadow: ${({ theme }) => theme.shadows[1]};
`;

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 568px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 208px;
  padding: 1rem;
`;

export const P = styled.p`
  font-size: ${({ theme }) => theme.typography.caption.fontSize};
  line-height: ${({ theme }) => theme.typography.caption.lineHeight};
  color: ${({ theme }) => theme.palette.secondary.main};

  &:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`;

export const H3 = styled.h3`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 0.25rem;
  font-size: ${({ theme }) => theme.typography.h4.fontSize};
  line-height: ${({ theme }) => theme.typography.h4.lineHeight};
`;

export const Ul = styled.ul`
  display: flex;
  justify-content: start;
  gap: 0.5rem;
`;

export const RightColumn = styled.div`
  flex-shrink: 0;
  width: 296px;
  height: 208px;

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

export const DefaultBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;
