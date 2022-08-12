import { Avatar } from '@mui/material';

interface Props {
  children?: JSX.Element;
  src?: string;
  alt?: string;
}

function DefaultAvatar({ children, src, alt }: Props) {
  return (
    <Avatar src={src} alt={alt}>
      {children}
    </Avatar>
  );
}

export default DefaultAvatar;
