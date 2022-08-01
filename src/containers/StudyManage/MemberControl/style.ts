import { Paper } from '@mui/material';
import styled from '@emotion/styled';

export const UserInfoWrapper = styled(Paper)`
  display: flex;
  justify-content: space-between;
  padding: 10px;
`;

export const NoUserWrapper = styled(Paper)`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

export const UserInfoButtonWrapper = styled.div`
  display: flex;
`;

export const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const MemberControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 600px;
  gap: 20px;
`;
