import { useEffect, useState } from 'react';
import { StudyCard, SpinnerIcon } from '@components';

import StudyListFilter from './StudyListFilter';
import { Ul, Li, ItemCard } from './StudyList.style';

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

type Filter = {
  mbti: string;
  topic: string;
  region: string;
};

export type OptionalFilter = {
  mbti?: string;
  topic?: string;
  region?: string;
};

function StudyList() {
  const [studyList, setStudyList] = useState<Study[]>([]);
  const [status, setStatus] = useState({
    loading: false,
    error: false,
  });
  const [filter, setFilter] = useState<Filter>({
    mbti: '',
    topic: '',
    region: '',
  });

  useEffect(() => {
    // 무한 스크롤 + 스터디 목록 api
    // observer가 div를 관찰하면
    // 스터디 목록 api -> request w/ lastStudyGroupId, size, mbti, topic, region
    // response -> setStudyList([...studyList, ...response.content])
  }, [filter]);

  const onFilterChange = (newFilter: OptionalFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  return (
    <div>
      {/* url이 '/'이면 && */}
      <StudyListFilter onFilterChange={onFilterChange} />
      <Ul>
        <Li>
          <StudyCard
            study={study}
            onDeleteBtnClick={(studyId) => {
              console.log(studyId, 'delete');
            }}
          />
        </Li>
        {/* !status.loading && !status.error && studyList.length === 0 && */}
        <Li>
          <ItemCard>모집 중인 스터디가 없습니다.</ItemCard>
        </Li>
        {/* status.error && */}
        <Li>
          <ItemCard>
            서버로부터 스터디 정보를 불러오지 못했습니다. 잠시 후 다시
            시도해주세요.
          </ItemCard>
        </Li>
        {/* status.loading && */}
        <Li>
          <ItemCard>
            <SpinnerIcon />
          </ItemCard>
        </Li>
      </Ul>
      <div />
    </div>
  );
}

export default StudyList;
