import { useEffect, useState } from 'react';
import { StudyListType } from '@interfaces/studyList';
import { useInterSectionObserver } from '@hooks/useIntersectionObserver';
import { StudyList } from '@components';
import { deleteStudy, getStudyList } from '@apis/studyGroups';

import StudyListFilter from '../StudyListFilter/StudyListFilter';

export type Filter = {
  mbti: string;
  topic: string;
  region: string;
};

export type OptionalFilter = {
  mbti?: string;
  topic?: string;
  region?: string;
};

function StudyListSection() {
  const [studyList, setStudyList] = useState<StudyListType>([]);
  const [filter, setFilter] = useState<Filter>({
    mbti: '',
    topic: '',
    region: '',
  });
  const [lastStudyId, setLastStudyId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const { targetRef } = useInterSectionObserver({
    onTargetObserve: () => {
      const newLastStudyId = studyList[studyList.length - 1].studyGroupId;
      setLastStudyId(newLastStudyId);
    },
    observerOptions: {},
  });

  useEffect(() => {
    if (!hasNext) return;
    (async () => {
      try {
        setLoading(true);
        const { contents: newStudylist, hasNext: newHasNext } =
          await getStudyList({
            lastStudyGroupId: lastStudyId,
            mbti: filter.mbti,
            topic: filter.topic,
            region: filter.region,
            size: 10,
          });
        setStudyList([...studyList, ...newStudylist]);
        setHasNext(newHasNext);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [lastStudyId, filter]);

  const onFilterChange = (newFilter: OptionalFilter) => {
    setFilter({ ...filter, ...newFilter });
    setStudyList([]);
    setLoading(false);
    setError(false);
    setHasNext(true);
    setLastStudyId(0);
  };

  const onFilterReset = () => {
    setFilter({
      mbti: '',
      topic: '',
      region: '',
    });
    setStudyList([]);
    setLoading(false);
    setError(false);
    setHasNext(true);
    setLastStudyId(0);
  };

  const onStudyDelete = async (studyId: number) => {
    try {
      await deleteStudy(studyId);
      const newStudyList = studyList.filter(
        (study) => study.studyGroupId !== studyId,
      );
      setStudyList(newStudyList);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section>
      <StudyListFilter
        filter={filter}
        onFilterChange={onFilterChange}
        onFilterReset={onFilterReset}
      />
      <StudyList
        studyList={studyList}
        loading={loading}
        error={error}
        onStudyDelete={onStudyDelete}
        ref={targetRef}
      />
    </section>
  );
}

export default StudyListSection;
