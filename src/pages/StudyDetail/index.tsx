import { useEffect, useState } from 'react';
import { StudyDetailContainer } from '@pages/StudyDetail/style';
import { detailMemberType, studyDetailType } from '@interfaces/studyDetail';
import { StudyDetailMbtiRecommand } from '@containers';
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
    const { member = {} as detailMemberType } = data;

    const {
      profileImageUrl = '',
      nickName = '',
      field = '',
      career = '',
      mbti = '',
    } = member;

    return { profileImageUrl, nickName, field, career, mbti };
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
      <StudyDetailBody description={getDescription()} />
    </StudyDetailContainer>
  );
}

export default StudyDetail;
