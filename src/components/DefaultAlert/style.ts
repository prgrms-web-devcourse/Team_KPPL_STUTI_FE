import { Alert } from '@mui/material';
import styled from '@emotion/styled';

export const CustomAlert = styled(Alert)`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000000;
  color: #fff;
`;
