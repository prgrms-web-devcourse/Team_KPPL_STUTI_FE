import {
  UserInfoContainer,
  UserInfoWrapper,
  UserSubInfoWrapper,
} from '@src/components/UserInfo/style';
import { Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import MbtiTag from '@components/MbtiTag/MbtiTag';
import DefaultAvatar from '@components/DefaultAvatar/DefaultAvatar';

export interface Props {
  profileImageUrl: string;
  nickname: string;
  field: string;
  career: string;
  mbti: string;
  title?: string;
}

function UserInfo({
  profileImageUrl,
  nickname,
  field,
  career,
  mbti,
  title,
}: Props) {
  return (
    <UserInfoContainer>
      {title && <Typography variant='h5'>{title}</Typography>}
      <UserInfoWrapper>
        {typeof profileImageUrl === 'string' && profileImageUrl ? (
          <DefaultAvatar src={profileImageUrl} alt='profile-image' />
        ) : (
          <DefaultAvatar>
            <PersonIcon />
          </DefaultAvatar>
        )}
        <div>
          <Typography variant='h6'>{nickname}</Typography>
          <UserSubInfoWrapper>
            <Typography variant='body1' color='secondary'>
              {field}
            </Typography>
            <Typography variant='body1' color='secondary'>
              {career}
            </Typography>
            <MbtiTag mbti={mbti} size='small' variant='filled' />
          </UserSubInfoWrapper>
        </div>
      </UserInfoWrapper>
    </UserInfoContainer>
  );
}

export default UserInfo;
