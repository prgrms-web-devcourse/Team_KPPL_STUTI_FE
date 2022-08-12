import DetailBody from './DetailBody';

export default {
  title: 'Components/StudyDetail',
  component: DetailBody,
};

const Template = (args) => <DetailBody {...args} />;

export const Body = Template.bind({});
Body.args = {
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste nemo repellendus, maiores unde laborum quaerat beatae natus voluptate non eos similique dolorem? Quibusdam, harum quis vero inventore quos suscipit perspiciatis.',
};
