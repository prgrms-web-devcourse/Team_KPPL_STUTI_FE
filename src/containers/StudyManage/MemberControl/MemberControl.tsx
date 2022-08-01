import {
  studyManageApplicantsType,
  studyManageMemberType,
} from '@src/interfaces/studyManage';
import {
  MemberControlContainer,
  NoUserWrapper,
  UserInfoButtonWrapper,
  UserInfoContainer,
  UserInfoWrapper,
} from '@src/containers/StudyManage/MemberControl/style';
import { Button, Typography } from '@mui/material';
import { UserInfo } from '@components';

interface Props {
  numberOfMembers: number;
  numberOfRecruits: number;
  numberOfApplicant: number;
  studyMembers: studyManageMemberType[];
  applicants: studyManageApplicantsType[];
}

function MemberControl({
  numberOfMembers,
  numberOfRecruits,
  numberOfApplicant,
  studyMembers = [],
  applicants = [],
}: Props) {
  return (
    <MemberControlContainer>
      <UserInfoContainer>
        <Typography variant='h5'>{`멤버: ${numberOfMembers}명 / ${numberOfRecruits}명`}</Typography>
        {studyMembers.map((member) => {
          const {
            studyMemberId,
            profileImageUrl = '',
            nickname = '',
            field = '',
            career = '',
            mbti = '',
            studyMemberRole = '',
          } = member;

          return (
            <UserInfoWrapper key={studyMemberId}>
              <UserInfo
                profileImageUrl={profileImageUrl}
                nickname={nickname}
                field={field}
                career={career}
                mbti={mbti}
              />
              <Button variant='text' color='secondary' size='small'>
                제외
              </Button>
            </UserInfoWrapper>
          );
        })}
      </UserInfoContainer>
      <UserInfoContainer>
        <Typography variant='h5'>{`지원자: ${numberOfApplicant}명`}</Typography>

        {applicants.length > 0 ? (
          applicants.map((applicant) => {
            const {
              applicantId,
              profileImageUrl = '',
              nickname = '',
              field = '',
              career = '',
              mbti = '',
              studyMemberRole = '',
            } = applicant;

            return (
              <UserInfoWrapper key={applicantId}>
                <UserInfo
                  profileImageUrl={profileImageUrl}
                  nickname={nickname}
                  field={field}
                  career={career}
                  mbti={mbti}
                />
                <UserInfoButtonWrapper>
                  <Button variant='text' color='secondary' size='small'>
                    수락
                  </Button>
                  <Button variant='text' color='secondary' size='small'>
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
