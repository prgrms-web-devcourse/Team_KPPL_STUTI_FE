import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { UserType } from '@interfaces/user';
import { UserProfile } from '@components';
import { getUserProfile } from '@apis/members';

import { Section, Loading, Error } from './InfoSection.style';

function InfoSection() {
  const { user_id: paramUserId } = useParams<{ user_id: string }>();

  const [userProfile, setUserProfile] = useState<UserType>({
    id: 0,
    email: '',
    profileImageUrl: '',
    nickname: '',
    field: '',
    career: '',
    MBTI: '',
    githubUrl: '',
    blogUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const userId = Number(paramUserId);
        const res = await getUserProfile(userId);
        setUserProfile(res);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [paramUserId]);

  return (
    <Section>
      {!loading && !error && <UserProfile userProfile={userProfile} />}
      {error && (
        <Error>
          서버로부터 사용자 정보를 불러오지 못했습니다. 잠시 후 다시
          시도해주세요.
        </Error>
      )}
      {loading && (
        <Loading>
          <CircularProgress color='secondary' />
        </Loading>
      )}
    </Section>
  );
}

export default InfoSection;
