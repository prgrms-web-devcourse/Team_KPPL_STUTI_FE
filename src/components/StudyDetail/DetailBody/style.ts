import { LinkItUrl } from 'react-linkify-it';
import styled from '@emotion/styled';

export const BodyWrapper = styled.div`
  width: 600px;
  margin: 0 auto;
`;

export const Description = styled.div`
  padding: 0.625rem 0.3125rem;
  white-space: pre-line;
`;

export const CustomLinkItUrl = styled(LinkItUrl)`
  &:hover {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
