import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { selectUser } from '@store/slices/user';
import { selectQuestion, setQuestions } from '@store/slices/question';
import { openAlert } from '@store/slices/flashAlert';
import { HOME } from '@router/path';
import {
  LoadingWrapper,
  StudyDetailButtonWrapper,
  StudyDetailContainer,
} from '@pages/StudyDetail/style';
import { Button } from '@mui/material';
import { UserProfileType } from '@interfaces/userProfile';
import { studyDetailQuestionType } from '@interfaces/studyDetailQuestion';
import { detailMemberType, studyDetailType } from '@interfaces/studyDetail';
import { errorType } from '@interfaces/error';
import {
  StudyDetailMbtiRecommend,
  StudyDetailStudyInfo,
  StudyDetailStudyQuestion,
} from '@containers';
import {
  SpinnerIcon,
  StudyDetailBody,
  StudyDetailHeader,
  UserInfo,
} from '@components';
import {
  getStudyDetailInfomation,
  getStudyQuestionInformation,
  joinStudyGroup,
} from '@apis/studyDetail';

function StudyDetail() {
  const [data, setData] = useState({} as studyDetailType);
  const [loading, setLoading] = useState(false);

  const questions = useSelector(selectQuestion);
  const dispatch = useDispatch();

  type userType = {
    user: UserProfileType;
    isLogin: boolean;
  };

  const { user, isLogin } = useSelector(selectUser) as userType;

  const isLoginUserStudy = (user: UserProfileType) => {
    if (!isLogin) return false;

    if (!user) return false;

    if (user.id !== getLeaderInfo().memberId) return false;

    return true;
  };

  const navigate = useNavigate();

  const { study_id = '0' } = useParams();

  const initialSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudyDetailInfomation(study_id);
        setData(res);
      } catch (error) {
        console.error(error);
        const { response } = error as AxiosError;
        const { data }: { data: errorType } = response as AxiosResponse;
        const { errorCode } = data;

        if (errorCode === 'SG002') {
          dispatch(
            openAlert({
              severity: 'error',
              title: '스터디 그룹을 찾지 못했습니다!',
              content: '홈으로 갔다가 다시 시도해주세요!',
            }),
          );
          return;
        }

        dispatch(
          openAlert({
            severity: 'error',
            title: '죄송합니다',
            content: '스터디 상세 정보를 가져오는데 실패했습니다.',
          }),
        );
      }
    };

    const fetchQuestion = async () => {
      try {
        const res: studyDetailQuestionType = await getStudyQuestionInformation(
          study_id,
          initialSize,
        );
        dispatch(setQuestions(res));
      } catch (error) {
        console.error(error);
        const { response } = error as AxiosError;
        const { data }: { data: errorType } = response as AxiosResponse;
        const { errorCode } = data;

        if (errorCode === 'SG002') {
          dispatch(
            openAlert({
              severity: 'error',
              title: '스터디 그룹을 찾지 못했습니다!',
              content: '홈으로 갔다가 다시 시도해주세요!',
            }),
          );
          return;
        }

        dispatch(
          openAlert({
            severity: 'error',
            title: '죄송합니다',
            content: '스터디 질문 정보를 가져오는데 실패했습니다.',
          }),
        );
      }
    };

    setLoading(true);
    Promise.all([fetchData(), fetchQuestion()]).then(() => {
      setLoading(false);
    });
  }, []);

  const getpreferredMBTIs = () => {
    const { preferredMBTIs = [] } = data;

    return preferredMBTIs;
  };

  const getTopic = () => {
    const { topic = '' } = data;

    return topic;
  };

  const getTitle = () => {
    const { title = '' } = data;

    return title;
  };

  const getDescription = () => {
    const { description = '' } = data;

    return description;
  };

  const getLeaderInfo = () => {
    const { leader = {} as detailMemberType } = data;

    const {
      memberId,
      profileImageUrl = '',
      nickname = '',
      field = '',
      career = '',
      mbti = '',
    } = leader;

    return { memberId, profileImageUrl, nickname, field, career, mbti };
  };

  const getIsOnline = () => {
    const { isOnline = true } = data;

    return isOnline;
  };

  const getRegion = () => {
    const { region = '' } = data;

    return region;
  };

  const getStartDateTime = () => {
    const { startDateTime = '2022-00-00 00:00:00' } = data;

    const [date, time] = startDateTime.split(' ');

    return date;
  };

  const getEndDateTime = () => {
    const { endDateTime = '2022-00-00 00:00:00' } = data;

    const [date, time] = endDateTime.split(' ');

    return date;
  };

  const getNumberOfMembers = () => {
    const { numberOfMembers = 0 } = data;

    return numberOfMembers;
  };

  const getNumberOfRecruits = () => {
    const { numberOfRecruits = 0 } = data;

    return numberOfRecruits;
  };

  const isHaveDescription = (description: string): boolean => {
    return description.length > 0 ? true : false;
  };

  const enterStudyGroup = async (study_id: string) => {
    if (!user) {
      dispatch(
        openAlert({
          severity: 'warning',
          title: '로그인이 필요한 서비스입니다!',
          content: '로그인을 먼저하고 지원부탁드려요~!',
        }),
      );
      return;
    }

    try {
      await joinStudyGroup(study_id);
      dispatch(
        openAlert({
          severity: 'success',
          title: '신청되었습니다!',
          content: '스터디 그룹에 성공적으로 지원했습니다!',
        }),
      );
    } catch (error) {
      console.error(error);
      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;

      if (errorCode === 'S001') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '로그인 상태를 확인해주세요!!',
            content: '로그인을 눌러 로그인 후 요청 부탁드립니다!!',
          }),
        );
        return;
      }

      if (errorCode === 'SG004') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '이미 가입된 스터디입니다!!',
            content: '다른 스터디에 가입해주세요!!',
          }),
        );
        return;
      }

      if (errorCode === 'SG005') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '유저정보를 찾는데 실패했습니다!',
            content: '다시 로그인하여 시도해주세요!',
          }),
        );
        navigate(HOME, { replace: true });
        return;
      }

      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '스터디 그룹에 지원하는데 실패했습니다.',
        }),
      );
    }
  };

  return (
    <StudyDetailContainer>
      {loading ? (
        <LoadingWrapper>
          <SpinnerIcon />
        </LoadingWrapper>
      ) : (
        <>
          <StudyDetailHeader
            topic={getTopic()}
            title={getTitle()}
            imageUrl={data.imageUrl}
          />
          {isLoginUserStudy(user) && (
            <StudyDetailButtonWrapper>
              <Button
                component={Link}
                to={`/study/${data.studyGroupId}/edit`}
                fullWidth
              >
                스터디 수정
              </Button>
              <Button
                component={Link}
                to={`/study/${data.studyGroupId}/manage`}
                fullWidth
              >
                스터디 관리
              </Button>
            </StudyDetailButtonWrapper>
          )}
          <UserInfo
            title='리더 정보'
            profileImageUrl={getLeaderInfo().profileImageUrl}
            nickname={getLeaderInfo().nickname}
            field={getLeaderInfo().field}
            career={getLeaderInfo().career}
            mbti={getLeaderInfo().mbti}
          />
          <StudyDetailMbtiRecommend preferredMBTIs={getpreferredMBTIs()} />
          <StudyDetailStudyInfo
            isOnline={getIsOnline()}
            region={getRegion()}
            startDateTime={getStartDateTime()}
            endDateTime={getEndDateTime()}
            numberOfMembers={getNumberOfMembers()}
            numberOfRecruits={getNumberOfRecruits()}
          />
          {isHaveDescription(getDescription()) && (
            <StudyDetailBody description={getDescription()} />
          )}
          <StudyDetailStudyQuestion
            {...questions}
            size={initialSize}
            study_id={study_id}
            title='질문 & 답변'
          />
          <Button
            disabled={isLoginUserStudy(user)}
            onClick={() => {
              enterStudyGroup(study_id);
            }}
          >
            {isLoginUserStudy(user)
              ? '자신이 만든 스터디에는 지원할 수 없습니다'
              : '지원하기'}
          </Button>
        </>
      )}
    </StudyDetailContainer>
  );
}

export default StudyDetail;
