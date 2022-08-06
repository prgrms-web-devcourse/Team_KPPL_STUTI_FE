import Typography from '@mui/material/Typography';

import EditForm from '../EditForm/EditForm';

import { Section } from './EditFormSection.style';

function FormSection() {
  return (
    <Section>
      <Typography variant='h3' component='h1'>
        프로필 수정
      </Typography>
      <EditForm />
    </Section>
  );
}
export default FormSection;
