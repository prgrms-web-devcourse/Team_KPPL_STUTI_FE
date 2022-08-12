import { ChangeEvent, FormEvent } from 'react';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {
  mbtiOptions,
  topicOptions,
  regionWithOnlineOptions,
} from '@constants/selectOptions';
import { Select } from '@components';

import {
  FilterType,
  OptionalFilterType,
} from '../StudyListSection/StudyListSection';

import { Form, StyledButton } from './StudyListFilter.style';

interface Props {
  filter: FilterType;
  onFilterChange: (select: OptionalFilterType) => void;
  onFilterReset: () => void;
}

function StudyListFilter({ filter, onFilterChange, onFilterReset }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name !== 'mbti' && name !== 'topic' && name !== 'region') {
      throw new Error(
        `label: ${name} - label은 'mbti', 'topic', 'region'만 가능합니다.`,
      );
    }
    onFilterChange({ [name]: value });
  };

  const handleClick = () => {
    onFilterReset();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Select
        id={'filter-mbti'}
        name={'mbti'}
        label={'MBTI'}
        value={filter.mbti ?? ''}
        options={[{ value: 'ALL', label: '전체' }, ...mbtiOptions]}
        onChange={handleChange}
        fullWidth
      />
      <Select
        id={'filter-topic'}
        name={'topic'}
        label={'주제'}
        value={filter.topic ?? ''}
        options={[{ value: 'ALL', label: '전체' }, ...topicOptions]}
        onChange={handleChange}
        fullWidth
      />
      <Select
        id={'filter-region'}
        name={'region'}
        label={'지역'}
        value={filter.region ?? ''}
        options={[{ value: 'ALL', label: '전체' }, ...regionWithOnlineOptions]}
        onChange={handleChange}
        fullWidth
      />
      <StyledButton
        variant='text'
        color='secondary'
        size='medium'
        onClick={handleClick}
      >
        <RestartAltIcon />
        초기화
      </StyledButton>
    </Form>
  );
}

export default StudyListFilter;
