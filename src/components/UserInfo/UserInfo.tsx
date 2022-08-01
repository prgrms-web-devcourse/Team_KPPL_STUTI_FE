import {
  UserInfoContainer,
  UserInfoWrapper,
  UserProfileImage,
  UserProfileImageWrapper,
  UserSubInfoWrapper,
} from '@src/components/UserInfo/style';
import { Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MbtiTag from '@components/MbtiTag/MbtiTag';

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
          <UserProfileImageWrapper>
            <UserProfileImage src={profileImageUrl} alt='profile-image' />
          </UserProfileImageWrapper>
        ) : (
          <AccountCircleIcon fontSize='large' color='secondary' />
        )}
        <div>
          <Typography variant='h6'>{nickname}</Typography>
          <UserSubInfoWrapper>
            <Typography variant='subtitle2' color='#6B7280'>
              {field}
            </Typography>
            <Typography variant='subtitle2' color='#6B7280'>
              {career}
            </Typography>
            <MbtiTag mbti={mbti} size='small' />
          </UserSubInfoWrapper>
        </div>
      </UserInfoWrapper>
    </UserInfoContainer>
  );
}

export default UserInfo;
