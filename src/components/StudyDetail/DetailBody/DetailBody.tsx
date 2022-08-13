import {
  BodyWrapper,
  Description,
} from '@src/components/StudyDetail/DetailBody/style';
import { Typography } from '@mui/material';

interface Props {
  description: string;
}

function DetailBody({ description }: Props) {
  const body = description.replaceAll('\r', '').split('\n');

  return (
    <BodyWrapper>
      <Typography variant='h5'>세부 내용</Typography>
      <Description>
        {body.map((content, index) => {
          if (content === '') return <br key={index} />;
          return [content, <br key={index} />];
        })}
      </Description>
    </BodyWrapper>
  );
}

export default DetailBody;
