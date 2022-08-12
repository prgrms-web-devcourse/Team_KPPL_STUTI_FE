import { Typography } from '@mui/material';
import styled from '@emotion/styled';

export const ReplyInputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;
  margin: 0.625rem 0;
`;

export const ReplyContainer = styled.div`
  display: flex;
  gap: 0.625rem;
`;

export const ReplyProfileWrapper = styled.div`
  margin-top: 0.625rem;
`;

export const ReplyInfoWrapper = styled.div`
  flex-grow: 1;
`;

export const ReplyControlWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.625rem;
`;

type ExtraProps = {
  component?: React.ElementType;
};

export const ReplyControlTypography = styled(Typography)<ExtraProps>`
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: none;
`;
