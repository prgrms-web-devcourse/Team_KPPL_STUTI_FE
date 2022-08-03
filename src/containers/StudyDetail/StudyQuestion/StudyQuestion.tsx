import { getTime } from '@utils/time';
import { StudyDetailQuestionContainer } from '@src/containers/StudyDetail/StudyQuestion/style';
import StudyQuestionInput from '@src/containers/Reply/ReplyInput';
import Reply from '@src/containers/Reply/Reply';
import { Typography } from '@mui/material';
import { studyDetailQuestionType } from '@interfaces/studyDetailQuestion';

function StudyQuestion({
  contents = [],
  totalElements,
  isLast,
}: studyDetailQuestionType) {
  return (
    <StudyDetailQuestionContainer>
      <Typography variant='h5'>질문 & 답변</Typography>
      <StudyQuestionInput />
      {contents.map((content) => {
        const {
          questionId,
          parentId,
          profileImageUrl = '',
          memberId,
          nickname = '프룽이',
          contents: text = '참여하고 싶어요!',
          createdAt = '2022.02.22 10:00',
          children = [],
        } = content;
        return (
          <Reply
            key={content.questionId}
            profileImageUrl={profileImageUrl}
            nickname={nickname}
            contents={text}
            replies={children}
            {...getTime(createdAt)}
          >
            {children.map((reply) => {
              const {
                parentId,
                questionId,
                profileImageUrl = '',
                memberId,
                nickname = '',
                contents = '',
                createdAt = '2022.00.00',
              } = reply;
              return (
                <Reply
                  key={questionId}
                  profileImageUrl={profileImageUrl}
                  nickname={nickname}
                  contents={contents}
                  {...getTime(createdAt)}
                />
              );
            })}
          </Reply>
        );
      })}
      {!isLast && (
        <Typography color='secondary'>
          댓글 {totalElements - contents.length}개 더 보기
        </Typography>
      )}
    </StudyDetailQuestionContainer>
  );
}

export default StudyQuestion;
