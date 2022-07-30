import { useEffect, useState } from 'react';
import { StudyDetailContainer } from '@pages/StudyDetail/style';
import { Button } from '@mui/material';
import { detailMemberType, studyDetailType } from '@interfaces/studyDetail';
import { StudyDetailMbtiRecommand, StudyDetailStudyInfo } from '@containers';
import {
  StudyDetailBody,
  StudyDetailHeader,
  StudyDetailLeaderInfo,
} from '@components';
import NoImage from '@assets/noImage.jpeg';
import { getStudyDetailInfomation } from '@apis/studyDetail';

function StudyDetail() {
  const [data, setData] = useState({} as studyDetailType);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getStudyDetailInfomation();
      setData(res);
    };

    fetchData();
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
      nickName = '',
      field = '',
      career = '',
      mbti = '',
    } = leader;

    return { profileImageUrl, nickName, field, career, mbti };
  };

  const getIsOnline = () => {
    const { isOnline = true } = data;

    return isOnline;
  };

  const getRegion = () => {
    const { region = '' } = data;

    return region;
  };

  const getStudyPeriod = () => {
    const defaultStudyPeriod = {
      startDate: '2022.00.00',
      endDate: '2022.00.00',
    };

    const { studyPeriod = defaultStudyPeriod } = data;

    return studyPeriod;
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
      <StudyDetailLeaderInfo
        profileImageUrl={getLeaderInfo().profileImageUrl}
        nickName={getLeaderInfo().nickName}
        field={getLeaderInfo().field}
        career={getLeaderInfo().career}
        mbti={getLeaderInfo().mbti}
      />
      <StudyDetailMbtiRecommand preferredMbtis={getPreferredMbtis()} />
      <StudyDetailStudyInfo
        isOnline={getIsOnline()}
        region={getRegion()}
        studyPeriod={getStudyPeriod()}
        numberOfMembers={getNumberOfMembers()}
        numberOfRecruits={getNumberOfRecruits()}
      />
      {isHaveDescription(getDescription()) && (
        <StudyDetailBody description={getDescription()} />
      )}
      <Button>지원하기</Button>
    </StudyDetailContainer>
  );
}

export default StudyDetail;
