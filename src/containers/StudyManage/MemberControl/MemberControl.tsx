import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { openAlert } from '@store/slices/flashAlert';
import {
  studyManagestudyApplicantsType,
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
  numberOfApplicant: number;
  studyMembers: studyManageMemberType[];
  studyApplicants: studyManagestudyApplicantsType[];
  studyGroupId: string;
}

function MemberControl({
  numberOfMembers = 0,
  numberOfRecruits = 0,
  numberOfApplicant = 0,
  studyMembers = [],
  studyApplicants = [],
  studyGroupId = '0',
}: Props) {
  const [members, setMembers] = useState<studyManageMemberType[]>([]);
  const [applicants, setApplicants] = useState<
    studyManagestudyApplicantsType[]
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
    setApplicantNumber(numberOfApplicant);
  }, [numberOfApplicant]);

  const acceptStudyMember = async (
    studyGroupId: string,
    studyGroupMemberId: number,
  ) => {
    try {
      await patchStudyMember(studyGroupId, studyGroupMemberId);
      dispatch(
        openAlert({
          severity: 'success',
          title: '멤버로 추가되었습니다!',
          content: '스터디 멤버에 성공적으로 추가되었습니다!',
        }),
      );
    } catch (error) {
      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '스터디 멤버 수락에 실패했습니다.',
        }),
      );
      console.error(error);
      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;
    }
  };

  const removeStudyMember = async (
    studyGroupId: string,
    studyGroupMemberId: number,
  ) => {
    try {
      await deleteStudyMember(studyGroupId, studyGroupMemberId);
      dispatch(
        openAlert({
          severity: 'success',
          title: '멤버가 제외되었습니다!',
          content: '스터디 멤버가 성공적으로 제외되었습니다!',
        }),
      );
    } catch (error) {
      dispatch(
        openAlert({
          severity: 'error',
          title: '죄송합니다',
          content: '스터디 멤버 제외에 실패했습니다.',
        }),
      );
      console.error(error);
      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;
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
    setMemberNumber((prevState) => (prevState -= 1));
  };

  const deleteApplicants = (
    array: Array<studyManagestudyApplicantsType>,
    targetId: number,
  ) => {
    const filterArray = array.filter(
      (applicant) => applicant.studyGroupMemberId !== targetId,
    );
    setApplicants(filterArray);
    setApplicantNumber((prevState) => (prevState -= 1));
  };

  const exceptMember = (
    studyGroupId: string,
    studyMembers: studyManageMemberType[],
    memberID: number,
  ) => {
    removeStudyMember(studyGroupId, memberID);
    deleteMembers(studyMembers, memberID);
  };

  const acceptApplicantToMember = (
    studyGroupId: string,
    applicant: studyManagestudyApplicantsType,
    studyMembers: studyManageMemberType[],
    applicantID: number,
    studyApplicants: studyManagestudyApplicantsType[],
  ) => {
    acceptStudyMember(studyGroupId, applicantID);
    const newArray = [
      ...studyMembers,
      {
        ...applicant,
        studyGroupMemberRole: 'MEMBER',
      },
    ];
    setMembers(newArray);
    setMemberNumber((prevState) => (prevState += 1));
    deleteApplicants(studyApplicants, applicantID);
  };

  return (
    <MemberControlContainer>
      <UserInfoContainer>
        <Typography variant='h5'>{`멤버: ${memberNumber}명 / ${numberOfRecruits}명`}</Typography>
        {members.map((member) => {
          const {
            studyGroupMemberId: memberID,
            profileImageUrl = '',
            nickname = '',
            field = '',
            career = '',
            mbti = '',
            studyGroupMemberRole = '',
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
                  exceptMember(studyGroupId, members, memberID);
                }}
              >
                제외
              </Button>
            </UserInfoWrapper>
          );
        })}
      </UserInfoContainer>
      <UserInfoContainer>
        <Typography variant='h5'>{`지원자: ${applicantNumber}명`}</Typography>

        {applicants.length > 0 ? (
          applicants.map((applicant) => {
            const {
              studyGroupMemberId: applicantID,
              profileImageUrl = '',
              nickname = '',
              field = '',
              career = '',
              mbti = '',
              studyGroupMemberRole = '',
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
                      acceptApplicantToMember(
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
                      deleteApplicants(applicants, applicantID);
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
