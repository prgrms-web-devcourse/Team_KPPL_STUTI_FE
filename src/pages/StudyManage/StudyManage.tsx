import { Link, useLinkClickHandler } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { openAlert } from '@store/slices/flashAlert';
import { HOME } from '@router/path';
import {
  LoadingWrapper,
  StudyManageButtonWrapper,
  StudyManageContainer,
} from '@pages/StudyManage/style';
import { CircularProgress, Button, Typography } from '@mui/material';
import { studyManageType } from '@interfaces/studyManage';
import { errorType } from '@interfaces/error';
import { StudyManageMemberControl } from '@containers';
import { deleteStudy, getStudyManageInformation } from '@apis/studyManage';

function StudyManage() {
  const [data, setData] = useState({} as studyManageType);
  const [loading, setLoading] = useState(false);
  const [deleteStudyLoading, setDeleteStudyLoading] = useState(false);

  const dispatch = useDispatch();

  const { study_id = '0' } = useParams();

  const handleClickLink = useLinkClickHandler('/');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getStudyManageInformation(study_id);
        setData(res);
        setLoading(false);
      } catch (error) {
        console.error(error);
        const { response } = error as AxiosError;
        const { data }: { data: errorType } = response as AxiosResponse;
        const { errorCode } = data;

        if (errorCode === 'SG002') {
          dispatch(
            openAlert({
              severity: 'error',
              title: '스터디 그룹을 찾지 못했습니다!',
              content: '홈으로 갔다가 다시 시도해주세요!',
            }),
          );
          navigate(HOME, { replace: true });
          return;
        }

        dispatch(
          openAlert({
            severity: 'error',
            title: '죄송합니다',
            content: '스터디 관리 정보를 가져오는데 실패했습니다.',
          }),
        );
      }
    };

    fetchData();
  }, []);

  const getTopic = () => {
    const { topic = '' } = data;
    return topic;
  };

  const getTitle = () => {
    const { title = '' } = data;
    return title;
  };

  const removeStudy = async (
    studyId: string,
    e: React.MouseEvent<HTMLAnchorElement>,
  ) => {
    setDeleteStudyLoading(true);
    try {
      await deleteStudy(studyId);
      setDeleteStudyLoading(false);
      dispatch(
        openAlert({
          severity: 'success',
          title: '삭제되었습니다!',
          content: '스터디를 성공적으로 삭제했습니다!',
        }),
      );
      handleClickLink(e);
    } catch (error) {
      setDeleteStudyLoading(false);

      console.error(error);
      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;

      if (errorCode === 'SG002') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '스터디 그룹을 찾지 못했습니다!',
            content: '홈으로 갔다가 다시 시도해주세요!',
          }),
        );
        navigate(HOME, { replace: true });

        return;
      }

      if (errorCode === 'SG003') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '스터디 그룹의 리더만 스터디 삭제가 가능합니다!',
            content: '로그인 정보를 다시 확인해주세요!',
          }),
        );
        return;
      }

      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '스터디를 삭제하는데 실패했습니다.',
        }),
      );
    }
  };

  const onClickStudyDelete = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    removeStudy(study_id, e);
  };

  return (
    <StudyManageContainer>
      {loading ? (
        <LoadingWrapper>
          <CircularProgress />
        </LoadingWrapper>
      ) : (
        <>
          <div>
            <Typography variant='body1' color='secondary'>
              {getTopic()}
            </Typography>
            <Typography variant='h3'>{getTitle()}</Typography>
          </div>
          <StudyManageButtonWrapper>
            <Button
              component={Link}
              to={`/study/${data.studyGroupId}/edit`}
              fullWidth
            >
              스터디 수정
            </Button>
            {deleteStudyLoading ? (
              <Button sx={{ height: '3rem' }} fullWidth color='error'>
                <CircularProgress
                  color='secondary'
                  size='1.5rem'
                  sx={{ margin: '-0.25rem' }}
                />
              </Button>
            ) : (
              <Button
                component={Link}
                to={'/'}
                fullWidth
                color='error'
                onClick={onClickStudyDelete}
              >
                스터디 삭제
              </Button>
            )}
          </StudyManageButtonWrapper>
          <StudyManageMemberControl
            numberOfApplicants={data.numberOfApplicants}
            numberOfMembers={data.numberOfMembers}
            numberOfRecruits={data.numberOfRecruits}
            studyMembers={data.studyMembers}
            studyApplicants={data.studyApplicants}
            studyGroupId={study_id}
          />
        </>
      )}
    </StudyManageContainer>
  );
}

export default StudyManage;
