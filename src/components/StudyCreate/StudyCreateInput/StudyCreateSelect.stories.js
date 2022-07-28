import StudyCreateSelect from './StudyCreateSelect';

export default {
  title: 'Components/StudyCreateSelect',
  component: StudyCreateSelect,
};

const Template = (args) => <StudyCreateSelect {...args} />;

export const Select = Template.bind({});
Select.args = {
  id: 'study-category',
  label: '카테고리',
  options: [
    {
      value: 'FRONTEND',
      label: '프론트엔드',
    },
    {
      value: 'BACKEND',
      label: '백엔드',
    },
    {
      value: 'INFRA',
      label: '인프라',
    },
    {
      value: 'IOS',
      label: 'IOS',
    },
    {
      value: 'ANDROID',
      label: '안드로이드',
    },
    {
      value: 'DATA_ANALYST',
      label: '데이터 분석가',
    },
    {
      value: 'DEVELOPER',
      label: '개발자',
    },
  ],
};
