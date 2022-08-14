import { MouseEvent } from 'react';
import { RoleType } from '@interfaces/studyList';

import { Container, Button } from './Role.style';

interface Props {
  role: RoleType;
  onRoleChange: (role: RoleType) => void;
}

function RoleFilter({ role, onRoleChange }: Props) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.value as
      | 'member'
      | 'applicant'
      | 'leader';

    const role = `STUDY_${value.toUpperCase()}` as RoleType;

    onRoleChange(role);
  };

  return (
    <Container>
      <Button
        selected={role === 'STUDY_LEADER'}
        data-value='leader'
        onClick={handleClick}
      >
        생성한 스터디
      </Button>
      <Button
        selected={role === 'STUDY_MEMBER'}
        data-value='member'
        onClick={handleClick}
      >
        참여한 스터디
      </Button>
      <Button
        selected={role === 'STUDY_APPLICANT'}
        data-value='applicant'
        onClick={handleClick}
      >
        지원한 스터디
      </Button>
    </Container>
  );
}

export default RoleFilter;
