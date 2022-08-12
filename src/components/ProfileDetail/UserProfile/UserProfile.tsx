import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { selectUser } from '@store/slices/user';
import { Button, Avatar } from '@mui/material';
import LinkIcon from '@mui/icons-material/Link';
import { UserType } from '@interfaces/user';
import { fieldOptions, careerOptions } from '@constants/selectOptions';
import { MbtiTag } from '@components';

import { Content, H3, P, Dl, Flex, Dt, A } from './UserProfile.style';

type Option = {
  value: string;
  label: string;
};

const getOptionLabel = (
  options: Option[],
  optionValue: string | number,
): string => {
  if (optionValue === '') {
    return '';
  }

  const option = options.find((option) => option.value === optionValue);

  if (!option) {
    console.error(`optionValue: ${optionValue} - invalid option value`);
    return '';
  }

  return option.label;
};

const getFieldLabel = (fieldValue: string): string => {
  return getOptionLabel(fieldOptions, fieldValue);
};

export const getCareerLabel = (careerValue: string): string => {
  return getOptionLabel(careerOptions, careerValue);
};

interface Props {
  userProfile: UserType;
}

function UserProfile({ userProfile }: Props) {
  const { user_id: paramUserId } = useParams<{ user_id: string }>();
  const { user, isLogin } = useSelector(selectUser);
  const loggedInUserId = user?.id;

  return (
    <Content>
      <Avatar
        src={userProfile.profileImageUrl}
        alt=''
        sx={{ width: '7.5rem', height: '7.5rem' }}
      />
      <H3>{userProfile.nickname}</H3>
      <MbtiTag mbti={userProfile.MBTI} variant='filled' size='small' />
      <P>
        {`${getFieldLabel(userProfile.field)} · ${getCareerLabel(
          userProfile.career,
        )}`}
      </P>
      {userProfile.githubUrl && userProfile.blogUrl && (
        <Dl>
          <Flex>
            <Dt>
              <LinkIcon fontSize='small' />
              github
            </Dt>
            <dd>
              <A
                href={userProfile.githubUrl}
                target='_blank'
                rel='noreferrer noopener'
              >
                {userProfile.githubUrl}
              </A>
            </dd>
          </Flex>
          <Flex>
            <Dt>
              <LinkIcon fontSize='small' />
              blog
            </Dt>
            <dd>
              <A
                href={userProfile.blogUrl}
                target='_blank'
                rel='noreferrer noopener'
              >
                {userProfile.blogUrl}
              </A>
            </dd>
          </Flex>
        </Dl>
      )}
      {isLogin && loggedInUserId === Number(paramUserId) && (
        <Button component={Link} to={`/user/${userProfile.id}/edit`} fullWidth>
          프로필 수정
        </Button>
      )}
    </Content>
  );
}

export default UserProfile;
