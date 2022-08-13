import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { openAlert } from '@store/slices/flashAlert';
import { StudyListType, RoleType } from '@interfaces/studyList';
import { errorType } from '@interfaces/error';
import { useInterSectionObserver } from '@hooks/useIntersectionObserver';
import { StudyList } from '@components';
import { deleteStudy, getUserStudies } from '@apis/studyList';

import RoleFilter from '../RoleFilter/RoleFilter';

function StudyTab() {
  const dispatch = useDispatch();
  const { user_id: userId } = useParams<{ user_id: string }>();
  const [studyList, setStudyList] = useState<StudyListType>([]);
  const [role, setRole] = useState<RoleType>(null);
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
    (async function requestGetUserStudies() {
      try {
        setLoading(true);
        const { contents: newStudyList, hasNext: newHasNext } =
          await getUserStudies(Number(userId), {
            studyGroupMemberRole: role,
            lastStudyGroupId: lastStudyId,
            size: 10,
          });
        setStudyList([...studyList, ...newStudyList]);
        setHasNext(newHasNext);
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [lastStudyId, role]);

  const requestDeleteStudy = async (studyId: number) => {
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

  const onRoleChange = (role: RoleType) => {
    setRole(role);
    setStudyList([]);
    setLastStudyId(null);
    setLoading(false);
    setError(false);
    setHasNext(true);
  };

  return (
    <>
      <RoleFilter role={role} onRoleChange={onRoleChange} />
      <StudyList
        studyList={studyList}
        loading={loading}
        error={error}
        onStudyDelete={requestDeleteStudy}
        ref={targetRef}
      />
    </>
  );
}

export default StudyTab;
