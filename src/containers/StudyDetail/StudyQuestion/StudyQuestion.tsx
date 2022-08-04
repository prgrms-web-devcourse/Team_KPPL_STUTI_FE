import { useDispatch } from 'react-redux';
import { StudyDetailQuestionContainer } from '@src/containers/StudyDetail/StudyQuestion/style';
import StudyQuestionInput from '@src/containers/Reply/ReplyInput';
import Reply from '@src/containers/Reply/Reply';
import { Typography } from '@mui/material';
import { studyDetailQuestionType } from '@interfaces/studyDetailQuestion';

interface Props extends studyDetailQuestionType {
  size: number;
}

function StudyQuestion({ contents = [], totalElements, hasNext, size }: Props) {
  const dispatch = useDispatch();

  return (
    <StudyDetailQuestionContainer>
      <Typography variant='h5'>질문 & 답변</Typography>
      <StudyQuestionInput />
      {contents.map((content) => {
        const {
          studyGroupQuestionId,
          parentId,
          profileImageUrl = '',
          memberId,
          nickname = '프룽이',
          contents: text = '참여하고 싶어요!',
          createdAt = '2022-02-22 10:00:00',
          children = [],
        } = content;
        return (
          <Reply
            key={content.studyGroupQuestionId}
            profileImageUrl={profileImageUrl}
            nickname={nickname}
            contents={text}
            replies={children}
            createdAt={createdAt}
          >
            {children.map((reply) => {
              const {
                parentId,
                studyGroupQuestionId,
                profileImageUrl = '',
                memberId,
                nickname = '',
                contents = '',
                createdAt = '2022-02-22 10:00:00',
              } = reply;
              return (
                <Reply
                  key={studyGroupQuestionId}
                  profileImageUrl={profileImageUrl}
                  nickname={nickname}
                  contents={contents}
                  createdAt={createdAt}
                />
              );
            })}
          </Reply>
        );
      })}
      {!hasNext && (
        <Typography
          color='secondary'
          onClick={() => {
            dispatch();
          }}
        >
          댓글 {totalElements - contents.length}개 더 보기
        </Typography>
      )}
    </StudyDetailQuestionContainer>
  );
}

export default StudyQuestion;
