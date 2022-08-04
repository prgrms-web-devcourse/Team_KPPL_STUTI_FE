import { Link, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setQuestions } from '@store/slices/question';
import {
  StudyDetailButtonWrapper,
  StudyDetailContainer,
} from '@pages/StudyDetail/style';
import { Button } from '@mui/material';
import { studyDetailQuestionType } from '@interfaces/studyDetailQuestion';
import { detailMemberType, studyDetailType } from '@interfaces/studyDetail';
import {
  StudyDetailMbtiRecommend,
  StudyDetailStudyInfo,
  StudyDetailStudyQuestion,
} from '@containers';
import { StudyDetailBody, StudyDetailHeader, UserInfo } from '@components';
import NoImage from '@assets/noImage.jpeg';
import {
  getStudyDetailInfomation,
  getStudyQuestionInformation,
} from '@apis/studyDetail';

function StudyDetail() {
  const [data, setData] = useState({} as studyDetailType);
  const [question, setQuestion] = useState({} as studyDetailQuestionType);

  const dispatch = useDispatch();

  const { study_id = '0' }: { study_id: string } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudyDetailInfomation(study_id);
        setData(res);
      } catch (error) {
        new Error('스터디 상세 정보를 가져오는데 실패했습니다.');
      }
    };

    const fetchQuestion = async () => {
      const res: studyDetailQuestionType = await getStudyQuestionInformation(
        study_id,
      );
      setQuestion(res);
      dispatch(setQuestions(res.contents));
    };

    fetchData();
    fetchQuestion();
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

  return (
    <StudyDetailContainer>
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
      <StudyDetailStudyQuestion {...question} />
      <Button>지원하기</Button>
    </StudyDetailContainer>
  );
}

export default StudyDetail;
