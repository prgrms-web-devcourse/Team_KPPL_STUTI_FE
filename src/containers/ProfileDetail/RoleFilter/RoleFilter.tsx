import { MouseEvent } from 'react';
import { RoleType } from '@interfaces/studyList';

import { Background, Button } from './Role.style';

interface Props {
  role: RoleType;
  onRoleChange: (role: RoleType) => void;
}

function RoleFilter({ role, onRoleChange }: Props) {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.dataset.value as
      | 'all'
      | 'member'
      | 'applicant'
      | 'leader';

    const role =
      value === 'all' ? null : (`STUDY_${value.toUpperCase()}` as RoleType);

    onRoleChange(role);
  };

  return (
    <Background>
      <Button selected={role === null} data-value='all' onClick={handleClick}>
        전체 보기
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
      <Button
        selected={role === 'STUDY_LEADER'}
        data-value='leader'
        onClick={handleClick}
      >
        생성한 스터디
      </Button>
    </Background>
  );
}

export default RoleFilter;
