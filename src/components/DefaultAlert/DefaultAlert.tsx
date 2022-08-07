import { CustomAlert } from '@src/components/DefaultAlert/style';
import { AlertTitle } from '@mui/material';

interface Props {
  variant?: 'outlined' | 'filled';
  severity?: 'error' | 'warning' | 'info' | 'success';
  title: string;
  content?: string;
}

function DefaultAlert({
  title,
  content,
  variant = 'filled',
  severity = 'info',
}: Props) {
  return (
    <CustomAlert variant={variant} severity={severity}>
      <AlertTitle sx={{ color: '#fff' }}>{title}</AlertTitle>
      {content}
    </CustomAlert>
  );
}

export default DefaultAlert;
