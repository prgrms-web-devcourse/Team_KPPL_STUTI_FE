import { useTheme } from '@mui/material';
import { LogoIcon } from '@components';

import { Container } from './DefaultImage.style';

function DefaultImage() {
  const theme = useTheme();
  return (
    <Container>
      <LogoIcon color={theme.palette.secondary.main} />
    </Container>
  );
}
export default DefaultImage;
