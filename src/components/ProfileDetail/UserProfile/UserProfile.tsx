import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import LinkIcon from '@mui/icons-material/Link';
import { UserProfileType } from '@interfaces/userProfile';
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
  userProfile: UserProfileType;
}

function UserProfile({ userProfile }: Props) {
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
      {userProfile.githubUrl !== '' && userProfile.blogUrl !== '' && (
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
      {/* userProfile.id === loggedInUserId */}
      <Button component={Link} to={`/user/${userProfile.id}/edit`} fullWidth>
        프로필 수정
      </Button>
    </Content>
  );
}

export default UserProfile;
