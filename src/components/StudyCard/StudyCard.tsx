import { Link } from 'react-router-dom';
import moment from 'moment';
import PhotoIcon from '@mui/icons-material/Photo';
import { MbtiTag } from '@components';

import {
  Article,
  Flex,
  LeftColumn,
  P,
  H3,
  Ul,
  RightColumn,
  Img,
  DefaultBackground,
} from './StudyCard.style';
import MoreButton from './MoreButton';

type Study = {
  studyGroupId: number;
  leaderId: number;
  thumbnailUrl: string;
  topic: string;
  title: string;
  preferredMbtis: string[];
  isOnline: boolean;
  region: string;
  startDate: string;
  endDate: string;
  numberOfMembers: number;
  numberOfRecruits: number;
};

interface Props {
  study: Study;
  onDeleteBtnClick: (studyId: number) => void;
}

function StudyCard({ study, onDeleteBtnClick }: Props) {
  const format = (date: string) => {
    return moment(date).format('YYYY.MM.DD');
  };

  return (
    <Article>
      <Link to={`/study/${study.studyGroupId}`}>
        <Flex>
          <LeftColumn>
            <div>
              <P>{study.topic}</P>
              <H3>{study.title}</H3>
              <Ul>
                {study.preferredMbtis.map((mbti) => (
                  <li key={mbti}>
                    <MbtiTag mbti={mbti} size='small' />
                  </li>
                ))}
              </Ul>
            </div>
            <div>
              <P>{study.isOnline ? '온라인' : `${study.region}`}</P>
              <P>{`${format(study.startDate)} ~ ${format(study.endDate)}`}</P>
              <P>{`인원 ${study.numberOfMembers} / ${study.numberOfRecruits}`}</P>
            </div>
          </LeftColumn>
          <RightColumn>
            {study.thumbnailUrl ? (
              <Img src={study.thumbnailUrl} alt='' />
            ) : (
              <DefaultBackground>
                <PhotoIcon fontSize='large' color='secondary' />
              </DefaultBackground>
            )}
          </RightColumn>
        </Flex>
      </Link>
      {/* study.leaderId === userId && */}
      <MoreButton
        studyId={study.studyGroupId}
        onDeleteBtnClick={onDeleteBtnClick}
      />
    </Article>
  );
}

export default StudyCard;
