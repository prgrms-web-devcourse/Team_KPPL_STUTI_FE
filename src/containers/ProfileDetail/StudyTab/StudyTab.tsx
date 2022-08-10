import { useEffect, useState } from 'react';
import { StudyListType } from '@interfaces/studyList';
import { useInterSectionObserver } from '@hooks/useIntersectionObserver';
import { StudyList } from '@components';
import { getStudyList } from '@apis/studyGroups';

function StudyTab() {
  const [studyList, setStudyList] = useState<StudyListType>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [hasNext, setHasNext] = useState(true);
  const [lastStudyId, setLastStudyId] = useState(0);
  const { targetRef } = useInterSectionObserver({
    onTargetObserve: () => {
      if (lastStudyId < 2) setLastStudyId(lastStudyId + 1);
    },
    observerOptions: {},
  });

  useEffect(() => {
    if (!hasNext) return;
    (async () => {
      try {
        setLoading(true);
        const { content: newStudyList, hasNext: newHasNext } =
          await getStudyList({
            lastStudyGroupId: lastStudyId,
          });
        setStudyList([...studyList, ...newStudyList]);
        setHasNext(newHasNext);
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [lastStudyId]);

  const onStudyDelete = (studyId: number) => {
    console.log(studyId, 'delete');
  };

  return (
    <StudyList
      studyList={studyList}
      loading={loading}
      error={error}
      onStudyDelete={onStudyDelete}
      ref={targetRef}
    />
  );
}

export default StudyTab;
