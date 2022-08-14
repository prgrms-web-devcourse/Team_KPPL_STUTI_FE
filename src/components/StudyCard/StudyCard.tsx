import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { selectUser } from '@store/slices/user';
import { StudyItemType, RoleType } from '@interfaces/studyList';
import { MbtiTag, DefaultImage } from '@components';

import {
  Article,
  Flex,
  LeftColumn,
  P,
  TitleH3,
  SubtitleP,
  Ul,
  RightColumn,
  Img,
} from './StudyCard.style';
import MoreButton from './MoreButton/MoreButton';
interface Props {
  study: StudyItemType;
  role?: RoleType;
  onStudyDelete: (studyId: number) => void;
}

function StudyCard({ study, role, onStudyDelete }: Props) {
  const { user, isLogin } = useSelector(selectUser);
  const loggedInUserId = user?.id;

  const format = (date: string) => {
    return moment(date).format('YYYY.MM.DD');
  };

  return (
    <Article>
      <Link to={`/study/${study.studyGroupId}`}>
        <Flex>
          <LeftColumn>
            <div>
              <SubtitleP>{study.topic}</SubtitleP>
              <TitleH3>{study.title}</TitleH3>
              <Ul>
                {study.preferredMBTIs.map(
                  (mbti) =>
                    mbti !== 'NONE' && (
                      <li key={mbti}>
                        <MbtiTag
                          mbti={mbti}
                          variant='filled'
                          size='small'
                          cursor
                        />
                      </li>
                    ),
                )}
              </Ul>
            </div>
            <div>
              <P>{study.region}</P>
              <P>{`${format(study.startDateTime)} ~ ${format(
                study.endDateTime,
              )}`}</P>
              <P>{`인원 ${study.numberOfMembers} / ${study.numberOfRecruits}`}</P>
            </div>
          </LeftColumn>
          <RightColumn>
            {study.imageUrl ? (
              <Img src={study.imageUrl} alt='' loading='lazy' />
            ) : (
              <DefaultImage />
            )}
          </RightColumn>
        </Flex>
      </Link>
      {role !== 'STUDY_MEMBER' &&
        role !== 'STUDY_APPLICANT' &&
        isLogin &&
        loggedInUserId === study.memberId && (
          <MoreButton
            studyId={study.studyGroupId}
            onStudyDelete={onStudyDelete}
          />
        )}
    </Article>
  );
}

export default StudyCard;
