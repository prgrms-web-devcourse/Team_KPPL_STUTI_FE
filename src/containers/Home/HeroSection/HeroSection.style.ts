import styled from '@emotion/styled';

export const Section = styled.section`
  padding: 1rem 1rem 0 1rem;
`;

export const Banner = styled.div`
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  padding: 1rem;

  @media (max-width: 568px) {
    flex-direction: column;
  }
`;

export const Title = styled.div`
  padding-top: 2rem;

  @media (max-width: 568px) {
    text-align: center;
  }
`;
