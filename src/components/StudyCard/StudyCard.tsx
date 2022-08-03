import { Link } from 'react-router-dom';
import moment from 'moment';
import { getRegionLabel, getTopicLabel } from '@utils/getOptionLabel';
import PhotoIcon from '@mui/icons-material/Photo';
import { StudyItemType } from '@interfaces/studyList';
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
import MoreButton from './MoreButton/MoreButton';

interface Props {
  study: StudyItemType;
  onStudyDelete: (studyId: number) => void;
}

function StudyCard({ study, onStudyDelete }: Props) {
  const format = (date: string) => {
    return moment(date).format('YYYY.MM.DD');
  };

  return (
    <Article>
      <Link to={`/study/${study.studyGroupId}`}>
        <Flex>
          <LeftColumn>
            <div>
              <P>{getTopicLabel(study.topic)}</P>
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
              <P>{study.isOnline ? '온라인' : getRegionLabel(study.region)}</P>
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
      {/* study.leaderId === loggedInUserId && */}
      <MoreButton studyId={study.studyGroupId} onStudyDelete={onStudyDelete} />
    </Article>
  );
}

export default StudyCard;
