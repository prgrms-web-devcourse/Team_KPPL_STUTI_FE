import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { openAlert } from '@store/slices/flashAlert';
import { StudyListType } from '@interfaces/studyList';
import { errorType } from '@interfaces/error';
import { useInterSectionObserver } from '@hooks/useIntersectionObserver';
import { StudyList } from '@components';
import { getAllStudies, deleteStudy } from '@apis/studyList';

import StudyListFilter from '../StudyListFilter/StudyListFilter';

export type FilterType = {
  mbti: string | null;
  topic: string | null;
  region: string | null;
};

export type OptionalFilterType = {
  mbti?: string | null;
  topic?: string | null;
  region?: string | null;
};

function StudyListSection() {
  const dispatch = useDispatch();
  const [studyList, setStudyList] = useState<StudyListType>([]);
  const [filter, setFilter] = useState<FilterType>({
    mbti: null,
    topic: null,
    region: null,
  });
  const [lastStudyId, setLastStudyId] = useState<number | null>(null);
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
          await getAllStudies({
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

  const onFilterChange = (newFilter: OptionalFilterType) => {
    setFilter({ ...filter, ...newFilter });
    setStudyList([]);
    setLoading(false);
    setError(false);
    setHasNext(true);
    setLastStudyId(null);
  };

  const onFilterReset = () => {
    setFilter({
      mbti: null,
      topic: null,
      region: null,
    });
    setStudyList([]);
    setLoading(false);
    setError(false);
    setHasNext(true);
    setLastStudyId(null);
  };

  const onStudyDelete = async (studyId: number) => {
    try {
      await deleteStudy(studyId);
      const newStudyList = studyList.filter(
        (study) => study.studyGroupId !== studyId,
      );
      setStudyList(newStudyList);
    } catch (e) {
      const { response } = e as AxiosError;
      const {
        data: { errorCode },
      } = response as AxiosResponse<errorType>;

      switch (errorCode) {
        case 'SG002':
          dispatch(
            openAlert({
              severity: 'error',
              title: '스터디 삭제에 실패했습니다.',
              content: '스터디 정보를 찾을 수 없습니다.',
            }),
          );
          break;
        case 'SG003':
          dispatch(
            openAlert({
              severity: 'error',
              title: '스터디 삭제에 실패했습니다.',
              content: '스터디 삭제 권한이 없습니다.',
            }),
          );
          break;
        default:
          dispatch(
            openAlert({
              severity: 'error',
              title: '스터디 삭제에 실패했습니다. ',
              content: '잠시후 다시 시도해 주세요.',
            }),
          );
      }
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
