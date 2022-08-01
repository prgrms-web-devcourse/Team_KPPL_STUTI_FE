import { FormEvent } from 'react';
import { MuiSelect } from '@components';

import { Form } from './StudyListFilter.style';
import { OptionalFilter } from './StudyList';

const mbtiFilter = {
  id: 'mbti-filter',
  name: 'mbti',
  label: 'mbti',
  initialValue: '',
  options: [
    { value: 'ENFJ', label: 'ENFJ' },
    { value: 'ENTJ', label: 'ENTJ' },
    { value: 'ENFP', label: 'ENFP' },
    { value: 'ENTP', label: 'ENTP' },
    { value: 'ESFP', label: 'ESFP' },
    { value: 'ESFJ', label: 'ESFJ' },
    { value: 'ESTP', label: 'ESTP' },
    { value: 'ESTJ', label: 'ESTJ' },
    { value: 'INFP', label: 'INFP' },
    { value: 'INFJ', label: 'INFJ' },
    { value: 'INTP', label: 'INTP' },
    { value: 'ISTP', label: 'ISTP' },
    { value: 'ISFP', label: 'ISFP' },
    { value: 'ISFJ', label: 'ISFJ' },
    { value: 'ISTJ', label: 'ISTJ' },
    { value: 'INTJ', label: 'INTJ' },
  ],
};

const topicFilter = {
  id: 'topic-filter',
  name: 'topic',
  label: '분야',
  initialValue: '',
  options: [
    { value: 'FRONTEND', label: '프론트엔드' },
    { value: 'BACKEND', label: '백엔드' },
    { value: 'IOS', label: 'IOS' },
    { value: 'ANDROID', label: '안드로이드' },
    { value: 'AI', label: '인공지능' },
    { value: 'CS', label: '컴퓨터 사이언스' },
    { value: 'INFRA', label: '인프라' },
    { value: 'DEV_OPS', label: '데브옵스' },
    { value: 'BIG_DATA', label: '빅 데이터' },
    { value: 'EMBEDDED', label: '임베디드' },
    { value: 'SECURITY', label: '보안' },
    { value: 'NETWORK', label: '네트워크' },
  ],
};

const regionFilter = {
  id: 'region-filter',
  name: 'region',
  label: '지역',
  initialValue: '',
  options: [
    { value: 'ONLINE', label: '온라인' },
    { value: 'SEOUL', label: '서울' },
    { value: 'BUSAN', label: '부산' },
    { value: 'DAEGU', label: '대구' },
    { value: 'INCHEON', label: '인천' },
    { value: 'GWANGJU', label: '광주' },
    { value: 'DAEJEON', label: '대전' },
    { value: 'ULSAN', label: '울산' },
    { value: 'JEJU', label: '제주' },
  ],
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
      <MuiSelect
        id={mbtiFilter.id}
        name={mbtiFilter.name}
        label={mbtiFilter.label}
        initialValue={mbtiFilter.initialValue}
        options={mbtiFilter.options}
        onChange={onSelectChange}
        fullWidth
      />
      <MuiSelect
        id={topicFilter.id}
        name={topicFilter.name}
        label={topicFilter.label}
        initialValue={topicFilter.initialValue}
        options={topicFilter.options}
        onChange={onSelectChange}
        fullWidth
      />
      <MuiSelect
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
