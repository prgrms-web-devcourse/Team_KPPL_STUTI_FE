import styled from '@emotion/styled';

export const OutlinedMbtiBox = styled.div`
  transition: all 0.3s ease-in-out;
  width: 5rem;
  height: 5rem;
  color: ${(props) => props.color};
  background-color: ${(props) =>
    props.color === '' ? props.theme.palette.grey[200] : 'none'};
  border: ${(props) => (props.color === '' ? '' : '2px solid')};
  border-radius: 0.5rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.color === '' ? 0.3 : 1)};
`;

export const FilledMbtiBox = styled.div`
  width: 5rem;
  height: 5rem;
  color: #fff;
  background-color: ${(props) => props.color};
  border-radius: 0.5rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
