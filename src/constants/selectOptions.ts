export const fieldOptions = [
  { value: 'FRONTEND', label: '프론트엔드' },
  { value: 'BACKEND', label: '백엔드' },
  { value: 'INFRA', label: '인프라' },
  { value: 'IOS', label: 'IOS' },
  { value: 'ANDROID', label: '안드로이드' },
  { value: 'DATA_ANALYST', label: '데이터 분석가' },
  { value: 'DEVELOPER', label: '개발자' },
];

export const fieldValidValues = fieldOptions.map(({ value }) => value);

export const careerOptions = [
  { value: 'JUNIOR', label: '0년차~3년차' },
  { value: 'INTERMEDIATE', label: '3년차~5년차' },
  { value: 'SENIOR', label: '5년차~10년차' },
  { value: 'MASTER', label: '10년차 이상' },
];

export const careerValidValues = careerOptions.map(({ value }) => value);

export const topicOptions = [
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
];

export const topicValues = topicOptions.map(({ value }) => value);

export const regionOptions = [
  { value: 'SEOUL', label: '서울' },
  { value: 'BUSAN', label: '부산' },
  { value: 'DAEGU', label: '대구' },
  { value: 'INCHEON', label: '인천' },
  { value: 'GWANGJU', label: '광주' },
  { value: 'DAEJEON', label: '대전' },
  { value: 'ULSAN', label: '울산' },
  { value: 'JEJU', label: '제주' },
];

export const regionValues = regionOptions.map(({ value }) => value);

export const regionWithOnlineOptions = [
  { value: 'ONLINE', label: '온라인' },
  ...regionOptions,
];

export const recruitsNumberOptions = [
  {
    value: '1',
    label: '1명',
  },
  {
    value: '2',
    label: '2명',
  },
  {
    value: '3',
    label: '3명',
  },
  {
    value: '4',
    label: '4명',
  },
  {
    value: '5',
    label: '5명',
  },
  {
    value: '6',
    label: '6명',
  },
  {
    value: '7',
    label: '7명',
  },
  {
    value: '8',
    label: '8명',
  },
  {
    value: '9',
    label: '9명',
  },
  {
    value: '10',
    label: '10명',
  },
];

export const recruitsNumberValues = recruitsNumberOptions.map(
  ({ value }) => value,
);

export const mbtiOptions = [
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
];

export const mbtiValidValues = mbtiOptions.map(({ value }) => value);
