import styled from '@emotion/styled';

export const Hero = styled.div`
  padding: 1rem 1rem 0 1rem;
`;

export const ImgConatiner = styled.div`
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
