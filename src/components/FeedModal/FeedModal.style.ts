import { Card } from '@mui/material';
import styled from '@emotion/styled';
export const PreviewImage = styled.img`
  width: 100%;
  height: 342px;
  margin-top: 1rem;
  border-radius: 8px;
`;

export const CardWrapper = styled(Card)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 608px;
  bgcolor: background.paper;
  border-radius: 8px;
  boxshadow: 24;
`;
