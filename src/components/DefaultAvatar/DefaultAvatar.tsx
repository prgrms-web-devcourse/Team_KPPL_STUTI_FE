import { Avatar } from '@mui/material';

interface Props {
  children?: JSX.Element;
  src?: string;
  alt?: string;
}

function DefaultAvatar({ children, src, alt }: Props) {
  return (
    <Avatar
      src={src}
      alt={alt}
      sx={{ backgroundColor: '#D1D5DB', color: '#ffffff' }}
    >
      {children}
    </Avatar>
  );
}

export default DefaultAvatar;
