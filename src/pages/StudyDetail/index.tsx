import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { selectQuestion, setQuestions } from '@store/slices/question';
import { openAlert } from '@store/slices/flashAlert';
import {
  LoadingWrapper,
  StudyDetailButtonWrapper,
  StudyDetailContainer,
} from '@pages/StudyDetail/style';
import { Button } from '@mui/material';
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
import NoImage from '@assets/noImage.jpeg';
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

  const { study_id = '0' } = useParams();

  const initialSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudyDetailInfomation(study_id);
        setData(res);
      } catch (error) {
        dispatch(
          openAlert({
            severity: 'error',
            title: '죄송합니다',
            content: '스터디 상세 정보를 가져오는데 실패했습니다.',
          }),
        );
        console.error(error);
        const { response } = error as AxiosError;
        const { data }: { data: errorType } = response as AxiosResponse;
        const { errorCode } = data;
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
        dispatch(
          openAlert({
            severity: 'error',
            title: '죄송합니다',
            content: '스터디 질문 정보를 가져오는데 실패했습니다.',
          }),
        );
        console.error(error);
        const { response } = error as AxiosError;
        const { data }: { data: errorType } = response as AxiosResponse;
        const { errorCode } = data;
      }
    };

    setLoading(true);
    Promise.all([fetchData(), fetchQuestion()]).then(() => {
      setLoading(false);
    });
  }, []);

  const getPreferredMbtis = () => {
    const { preferredMbtis = [] } = data;

    return preferredMbtis;
  };

  const getTopic = () => {
    const { topic = '' } = data;

    return topic;
  };

  const getTitle = () => {
    const { title = '' } = data;

    return title;
  };

  const getImageUrl = () => {
    const { imageUrl = NoImage } = data;

    return imageUrl ? imageUrl : NoImage;
  };

  const getDescription = () => {
    const { description = '' } = data;

    return description;
  };

  const getLeaderInfo = () => {
    const { leader = {} as detailMemberType } = data;

    const {
      profileImageUrl = '',
      nickname = '',
      field = '',
      career = '',
      mbti = '',
    } = leader;

    return { profileImageUrl, nickname, field, career, mbti };
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
      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '스터디 그룹에 지원하는데 실패했습니다.',
        }),
      );
      console.error(error);
      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;
      if (errorCode === 'SG003') {
        alert('이미 신청한 스터디입니다!');
      }
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
            imageUrl={getImageUrl()}
          />
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
          <UserInfo
            title='리더 정보'
            profileImageUrl={getLeaderInfo().profileImageUrl}
            nickname={getLeaderInfo().nickname}
            field={getLeaderInfo().field}
            career={getLeaderInfo().career}
            mbti={getLeaderInfo().mbti}
          />
          <StudyDetailMbtiRecommend preferredMbtis={getPreferredMbtis()} />
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
            onClick={() => {
              enterStudyGroup(study_id);
            }}
          >
            지원하기
          </Button>
        </>
      )}
    </StudyDetailContainer>
  );
}

export default StudyDetail;
