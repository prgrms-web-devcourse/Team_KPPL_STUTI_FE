import Typography, { TypographyTypeMap } from '@mui/material/Typography';

interface Props {
  title: string;
  variant?: TypographyTypeMap['props']['variant'];
}

function DetailHeader({ title, variant = 'h4' }: Props) {
  return <Typography variant={variant}>{title}</Typography>;
}

export default DetailHeader;
