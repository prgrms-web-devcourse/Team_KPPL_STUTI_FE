import { StudyCard } from '@components';

export default {
  title: 'Components/StudyCard',
  component: StudyCard,
};

const study = {
  studyGroupId: 1,
  leaderId: 2,
  thumbnailUrl: 'https://picsum.photos/300/200',
  topic: '자바스크립트',
  title: '자바스크립트 헬로우 월드',
  preferredMbtis: ['INTJ', 'INFP', 'ESTJ'],
  isOnline: false,
  region: '서울시',
  startDate: '2022-02-22 00:00:00',
  endDate: '2022-02-22 00:00:00',
  numberOfMembers: 0,
  numberOfRecruits: 5,
};

export const Default = () => (
  <StudyCard
    study={study}
    onDeleteBtnClick={(studyId) => {
      console.log(studyId, 'delete');
    }}
  />
);
