import Typography from '@mui/material/Typography';

import { MuiProvider } from '../../styles';

export default {
  title: 'Mui/Typography',
  component: Typography,
};

export const Default = () => (
  <MuiProvider>
    <Typography variant='h1'>h1</Typography>
    <Typography variant='h2'>h2</Typography>
    <Typography variant='h3'>h3</Typography>
    <Typography variant='h4'>h4</Typography>
    <Typography variant='h5'>h5</Typography>
    <Typography variant='h6'>h6</Typography>
    <Typography variant='subtitle1'>subtitle 1</Typography>
    <Typography variant='subtitle2'>subtitle 2</Typography>
    <Typography variant='body1'>body 1</Typography>
    <Typography variant='body2'>body 2</Typography>
    <Typography variant='button'>button</Typography>
    <br />
    <Typography variant='caption'>caption</Typography>
    <br />
    <Typography variant='overline'>overline</Typography>
  </MuiProvider>
);
