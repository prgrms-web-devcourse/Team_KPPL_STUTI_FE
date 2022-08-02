import { Paper } from '@mui/material';
import styled from '@emotion/styled';

export const UserInfoWrapper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: 0.625rem;
`;

export const NoUserWrapper = styled(Paper)`
  display: flex;
  justify-content: center;
  padding: 1.25rem;
`;

export const UserInfoButtonWrapper = styled.div`
  display: flex;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const MemberControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  gap: 1.25rem;
`;
