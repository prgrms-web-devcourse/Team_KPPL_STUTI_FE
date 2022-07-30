import StudyQuestionInput from '@src/containers/StudyDetail/StudyQuestion/StudyQuestionInput';
import { Typography } from '@mui/material';
import { studyDetailQusetionType } from '@interfaces/studyDetailQuestion';
import Question from '@containers/StudyDetail/StudyQuestion/Question';

function StudyQuestion({
  contents = [],
  page,
  size,
  totalPages,
  totalElements,
  sorted,
  isFirst,
  isLast,
}: studyDetailQusetionType) {
  const getTime = (createdAt: string) => {
    const [date, time] = createdAt.split(' ');

    const returnTime = () => {
      if (time) {
        const [hour, minute] = time.split(':');

        return {
          hour: parseInt(hour),
          minute: parseInt(minute),
        };
      } else {
        return undefined;
      }
    };

    const [year, month, day] = date.split('.');

    return {
      year: parseInt(year),
      month: parseInt(month),
      day: parseInt(day),
      time: returnTime(),
    };
  };

  return (
    <div>
      <Typography variant='h5'>질문 & 답변</Typography>
      <StudyQuestionInput />
      {contents.map((content) => {
        const {
          questionId,
          parentId,
          profileImageUrl = '',
          memberId,
          nickName = '프룽이',
          content: text = '참여하고 싶어요!',
          createdAt = '2022.02.22 10:00',
          children = [],
        } = content;
        return (
          <Question
            key={content.questionId}
            profileImageUrl={profileImageUrl}
            nickName={nickName}
            content={text}
            replies={children}
            {...getTime(createdAt)}
          >
            {children.map((reply) => {
              const {
                parentId,
                questionId,
                profileImageUrl = '',
                memberId,
                nickName = '',
                content = '',
                createdAt = '2022.00.00',
              } = reply;
              return (
                <Question
                  key={questionId}
                  profileImageUrl={profileImageUrl}
                  nickName={nickName}
                  content={content}
                  {...getTime(createdAt)}
                />
              );
            })}
          </Question>
        );
      })}
    </div>
  );
}

export default StudyQuestion;
