import styled from '@emotion/styled';

export const Section = styled.section`
  padding: 1rem 1rem 0 1rem;
`;

export const Imgcontainer = styled.div`
  height: 328px;
  border-radius: 0.5rem;
  overflow: hidden;
  background-color: ${({ theme }) => theme.palette.grey[200]};
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
