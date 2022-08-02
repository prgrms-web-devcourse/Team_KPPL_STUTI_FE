import { Typography } from '@mui/material';
import styled from '@emotion/styled';

export const ReplyInputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin: 10px 0;
`;

export const ReplyContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ReplyProfileWrapper = styled.div`
  margin-top: 10px;
`;

export const ReplyInfoWrapper = styled.div`
  flex-grow: 1;
`;

export const ReplyControlWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ReplyControlTypography = styled(Typography)`
  cursor: pointer;
`;
