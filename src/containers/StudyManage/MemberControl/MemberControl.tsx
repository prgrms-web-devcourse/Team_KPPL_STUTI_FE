import {
  studyManagestudyApplicantsType,
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
  studyApplicants: studyManagestudyApplicantsType[];
}

function MemberControl({
  numberOfMembers = 0,
  numberOfRecruits = 0,
  numberOfApplicant = 0,
  studyMembers = [],
  studyApplicants = [],
}: Props) {
  return (
    <MemberControlContainer>
      <UserInfoContainer>
        <Typography variant='h5'>{`멤버: ${numberOfMembers}명 / ${numberOfRecruits}명`}</Typography>
        {studyMembers.map((member) => {
          const {
            studyGroupMemberId,
            profileImageUrl = '',
            nickname = '',
            field = '',
            career = '',
            mbti = '',
            studyGroupMemberRole = '',
          } = member;

          return (
            <UserInfoWrapper key={studyGroupMemberId}>
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

        {studyApplicants.length > 0 ? (
          studyApplicants.map((applicant) => {
            const {
              studyGroupMemberId,
              profileImageUrl = '',
              nickname = '',
              field = '',
              career = '',
              mbti = '',
              studyGroupMemberRole = '',
            } = applicant;

            return (
              <UserInfoWrapper key={studyGroupMemberId}>
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
