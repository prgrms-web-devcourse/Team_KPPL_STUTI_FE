import { setMbtiColor } from '@utils/setMbtiColor';
import styled from '@emotion/styled';

interface Props {
  mbti: string;
  filled?: boolean;
  disabled?: boolean;
}

export const OutlinedMbtiBox = styled.div<Props>`
  transition: all 0.3s ease-in-out;
  width: 5rem;
  height: 5rem;
  color: ${({ theme, disabled, mbti }) =>
    disabled ? theme.palette.grey[400] : setMbtiColor(mbti)};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.palette.grey[200] : ''};
  border: ${({ disabled }) => (disabled ? '' : '2px solid')};
  border-radius: 0.5rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const FilledMbtiBox = styled.div<Props>`
  width: 5rem;
  height: 5rem;
  color: #fff;
  background-color: ${({ mbti }) => setMbtiColor(mbti)};
  border-radius: 0.5rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
`;
