import { FormEvent } from 'react';
import {
  mbtiOptions,
  topicOptions,
  regionOptions,
} from '@constants/selectOptions';

import { OptionalFilter } from '../StudyListSection/StudyListSection';
import Select from '../Select/Select';

import { Form } from './StudyListFilter.style';

const mbtiFilter = {
  id: 'mbti-filter',
  name: 'mbti',
  label: 'mbti',
  initialValue: '',
  options: mbtiOptions,
};

const topicFilter = {
  id: 'topic-filter',
  name: 'topic',
  label: '분야',
  initialValue: '',
  options: topicOptions,
};

const regionFilter = {
  id: 'region-filter',
  name: 'region',
  label: '지역',
  initialValue: '',
  options: regionOptions,
};

interface Props {
  onFilterChange: (select: OptionalFilter) => void;
}

function StudyListFilter({ onFilterChange }: Props) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const onSelectChange = (name: string, value: string) => {
    if (name !== 'mbti' && name !== 'topic' && name !== 'region') {
      throw new Error(
        `label: ${name} - label은 'mbti', 'topic', 'region'만 가능합니다.`,
      );
    }
    onFilterChange({ [name]: value });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Select
        id={mbtiFilter.id}
        name={mbtiFilter.name}
        label={mbtiFilter.label}
        initialValue={mbtiFilter.initialValue}
        options={mbtiFilter.options}
        onChange={onSelectChange}
        fullWidth
      />
      <Select
        id={topicFilter.id}
        name={topicFilter.name}
        label={topicFilter.label}
        initialValue={topicFilter.initialValue}
        options={topicFilter.options}
        onChange={onSelectChange}
        fullWidth
      />
      <Select
        id={regionFilter.id}
        name={regionFilter.name}
        label={regionFilter.label}
        initialValue={regionFilter.initialValue}
        options={regionFilter.options}
        onChange={onSelectChange}
        fullWidth
      />
    </Form>
  );
}

export default StudyListFilter;
