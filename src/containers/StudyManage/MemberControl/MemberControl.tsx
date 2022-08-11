import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { openAlert } from '@store/slices/flashAlert';
import {
  studyManageStudyApplicantsType,
  studyManageMemberType,
} from '@src/interfaces/studyManage';
import { errorType } from '@src/interfaces/error';
import {
  MemberControlContainer,
  NoUserWrapper,
  UserInfoButtonWrapper,
  UserInfoContainer,
  UserInfoWrapper,
} from '@src/containers/StudyManage/MemberControl/style';
import { Button, Typography } from '@mui/material';
import { UserInfo } from '@components';
import { deleteStudyMember, patchStudyMember } from '@apis/studyManage';

interface Props {
  numberOfMembers: number;
  numberOfRecruits: number;
  numberOfApplicants: number;
  studyMembers: studyManageMemberType[];
  studyApplicants: studyManageStudyApplicantsType[];
  studyGroupId: string;
}

function MemberControl({
  numberOfMembers = 0,
  numberOfRecruits = 0,
  numberOfApplicants = 0,
  studyMembers = [],
  studyApplicants = [],
  studyGroupId = '0',
}: Props) {
  const [members, setMembers] = useState<studyManageMemberType[]>([]);
  const [applicants, setApplicants] = useState<
    studyManageStudyApplicantsType[]
  >([]);
  const [memberNumber, setMemberNumber] = useState(0);
  const [applicantNumber, setApplicantNumber] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    setMembers(studyMembers);
  }, [studyMembers]);

  useEffect(() => {
    setApplicants(studyApplicants);
  }, [studyApplicants]);

  useEffect(() => {
    setMemberNumber(numberOfMembers);
  }, [numberOfMembers]);

  useEffect(() => {
    setApplicantNumber(numberOfApplicants);
  }, [numberOfApplicants]);

  const acceptStudyMember = async (
    studyGroupId: string,
    applicant: studyManageStudyApplicantsType,
    studyMembers: studyManageMemberType[],
    studyGroupMemberId: number,
    studyApplicants: studyManageStudyApplicantsType[],
  ) => {
    try {
      await patchStudyMember(studyGroupId, studyGroupMemberId);
      const newMembersList = [
        ...studyMembers,
        {
          ...applicant,
          studyGroupMemberRole: 'MEMBER',
        },
      ];
      setMembers(newMembersList);
      setMemberNumber((prevState) => (prevState += 1));
      deleteApplicants(studyApplicants, studyGroupMemberId);
      dispatch(
        openAlert({
          severity: 'success',
          title: '멤버로 추가되었습니다!',
          content: '스터디 멤버에 성공적으로 추가되었습니다!',
        }),
      );
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
        return;
      }

      if (errorCode === 'SG005') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '해당 멤버를 찾지 못했습니다!',
            content: '다시 시도해주세요!',
          }),
        );
        return;
      }

      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '스터디 멤버 수락에 실패했습니다.',
        }),
      );
    }
  };

  const removeStudyMember = async (
    studyGroupId: string,
    studyMembers: studyManageMemberType[],
    studyGroupMemberId: number,
  ) => {
    try {
      await deleteStudyMember(studyGroupId, studyGroupMemberId);
      deleteMembers(studyMembers, studyGroupMemberId);
      dispatch(
        openAlert({
          severity: 'success',
          title: '멤버가 제외되었습니다!',
          content: '스터디 멤버가 성공적으로 제외되었습니다!',
        }),
      );
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
        return;
      }

      if (errorCode === 'SG005') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '해당 멤버를 찾지 못했습니다!',
            content: '다시 시도해주세요!',
          }),
        );
        return;
      }

      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '스터디 멤버 제외에 실패했습니다.',
        }),
      );
    }
  };

  const removeStudyApplicant = async (
    studyGroupId: string,
    studyGroupMemberId: number,
    studyApplicants: studyManageStudyApplicantsType[],
  ) => {
    try {
      await deleteStudyMember(studyGroupId, studyGroupMemberId);
      deleteApplicants(studyApplicants, studyGroupMemberId);
      dispatch(
        openAlert({
          severity: 'success',
          title: '지원자가 거절되었습니다!',
          content: '스터디 지원자가 성공적으로 거절되었습니다!',
        }),
      );
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
        return;
      }

      if (errorCode === 'SG005') {
        dispatch(
          openAlert({
            severity: 'error',
            title: '해당 멤버를 찾지 못했습니다!',
            content: '다시 시도해주세요!',
          }),
        );
        return;
      }

      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '스터디 지원자 거절에 실패했습니다.',
        }),
      );
    }
  };

  const deleteMembers = (
    array: Array<studyManageMemberType>,
    targetId: number,
  ) => {
    const filterArray = array.filter(
      (applicant) => applicant.studyGroupMemberId !== targetId,
    );
    setMembers(filterArray);
    setMemberNumber((prevState) => {
      if (prevState === 1) return 0;
      else return (prevState -= 1);
    });
  };

  const deleteApplicants = (
    array: Array<studyManageStudyApplicantsType>,
    targetId: number,
  ) => {
    const filterArray = array.filter(
      (applicant) => applicant.studyGroupMemberId !== targetId,
    );
    setApplicants(filterArray);
    setApplicantNumber((prevState) => {
      if (prevState === 1) return 0;
      else return (prevState -= 1);
    });
  };

  return (
    <MemberControlContainer>
      <UserInfoContainer>
        <Typography variant='h5'>
          {memberNumber === 0
            ? '멤버가 아직 없습니다.'
            : `멤버: ${memberNumber}명 / ${numberOfRecruits}명`}
        </Typography>
        {members.map((member) => {
          const {
            studyGroupMemberId: memberID,
            profileImageUrl = '',
            nickname = '',
            field = '',
            career = '',
            mbti = '',
          } = member;

          return (
            <UserInfoWrapper key={memberID}>
              <UserInfo
                profileImageUrl={profileImageUrl}
                nickname={nickname}
                field={field}
                career={career}
                mbti={mbti}
              />
              <Button
                variant='text'
                color='secondary'
                size='small'
                onClick={() => {
                  removeStudyMember(studyGroupId, members, memberID);
                }}
              >
                제외
              </Button>
            </UserInfoWrapper>
          );
        })}
      </UserInfoContainer>
      <UserInfoContainer>
        <Typography variant='h5'>
          {applicantNumber === 0
            ? '지원자가 없습니다.'
            : `지원자: ${applicantNumber}명`}
        </Typography>
        {applicants.length > 0 ? (
          applicants.map((applicant) => {
            const {
              studyGroupMemberId: applicantID,
              profileImageUrl = '',
              nickname = '',
              field = '',
              career = '',
              mbti = '',
            } = applicant;

            return (
              <UserInfoWrapper key={applicantID}>
                <UserInfo
                  profileImageUrl={profileImageUrl}
                  nickname={nickname}
                  field={field}
                  career={career}
                  mbti={mbti}
                />
                <UserInfoButtonWrapper>
                  <Button
                    variant='text'
                    color='secondary'
                    size='small'
                    onClick={() => {
                      acceptStudyMember(
                        studyGroupId,
                        applicant,
                        members,
                        applicantID,
                        applicants,
                      );
                    }}
                  >
                    수락
                  </Button>
                  <Button
                    variant='text'
                    color='secondary'
                    size='small'
                    onClick={() => {
                      removeStudyApplicant(
                        studyGroupId,
                        applicantID,
                        applicants,
                      );
                    }}
                  >
                    거절
                  </Button>
                </UserInfoButtonWrapper>
              </UserInfoWrapper>
            );
          })
        ) : (
          <NoUserWrapper>
            <Typography variant='caption' color='secondary'>
              지원자가 없습니다.
            </Typography>
          </NoUserWrapper>
        )}
      </UserInfoContainer>
    </MemberControlContainer>
  );
}

export default MemberControl;
