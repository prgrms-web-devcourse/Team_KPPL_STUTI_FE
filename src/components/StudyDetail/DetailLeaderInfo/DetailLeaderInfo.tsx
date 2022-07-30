import {
  LeaderInfoContainer,
  LeaderInfoWrapper,
  LeaderProfileImage,
  LeaderProfileImageWrapper,
  LeaderSubInfoWrapper,
} from '@src/components/StudyDetail/DetailLeaderInfo/style';
import { Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MbtiTag from '@components/MbtiTag/MbtiTag';

export interface Props {
  profileImageUrl: string;
  nickName: string;
  field: string;
  career: string;
  mbti: string;
}

function DetailLeaderInfo({
  profileImageUrl,
  nickName,
  field,
  career,
  mbti,
}: Props) {
  return (
    <LeaderInfoContainer>
      <Typography variant='h5'>리더 정보</Typography>
      <LeaderInfoWrapper>
        {typeof profileImageUrl === 'string' && profileImageUrl ? (
          <LeaderProfileImageWrapper>
            <LeaderProfileImage src={profileImageUrl} alt='profile-image' />
          </LeaderProfileImageWrapper>
        ) : (
          <AccountCircleIcon fontSize='large' color='secondary' />
        )}
        <div>
          <Typography variant='h6'>{nickName}</Typography>
          <LeaderSubInfoWrapper>
            <Typography variant='subtitle2' color='#6B7280'>
              {field}
            </Typography>
            <Typography variant='subtitle2' color='#6B7280'>
              {career}
            </Typography>
            <MbtiTag mbti={mbti} size='small' />
          </LeaderSubInfoWrapper>
        </div>
      </LeaderInfoWrapper>
    </LeaderInfoContainer>
  );
}

export default DetailLeaderInfo;
