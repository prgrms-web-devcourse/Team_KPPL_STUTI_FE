import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addQuestions } from '@src/store/slices/question';
import { StudyDetailQuestionContainer } from '@src/containers/StudyDetail/StudyQuestion/style';
import StudyQuestionInput from '@src/containers/Reply/ReplyInput';
import Reply from '@src/containers/Reply/Reply';
import { Typography } from '@mui/material';
import { studyDetailQuestionType } from '@interfaces/studyDetailQuestion';
import { getStudyQuestionInformation } from '@apis/studyDetail';

interface Props extends studyDetailQuestionType {
  size: number;
  study_id: string;
}

function StudyQuestion({
  contents = [],
  totalElements,
  hasNext,
  size,
  study_id,
}: Props) {
  const dispatch = useDispatch();
  const [newSize, setNewSize] = useState(size);

  const requestQuestion = async (
    study_id: string,
    size: number,
    laststudyGroupQuestionId: number,
  ) => {
    try {
      const res: studyDetailQuestionType = await getStudyQuestionInformation(
        study_id,
        size,
        laststudyGroupQuestionId,
      );

      dispatch(addQuestions(res));
    } catch (error) {
      new Error('스터디 질문 정보를 가져오는데 실패했습니다.');
    }
  };

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
          updatedAt = '2022-02-22 10:00:00',
          children = [],
        } = content;
        return (
          <Reply
            key={content.studyGroupQuestionId}
            profileImageUrl={profileImageUrl}
            nickname={nickname}
            contents={text}
            replies={children}
            updatedAt={updatedAt}
          >
            {children.map((reply) => {
              const {
                parentId,
                studyGroupQuestionId,
                profileImageUrl = '',
                memberId,
                nickname = '',
                contents = '',
                updatedAt = '2022-02-22 10:00:00',
              } = reply;
              return (
                <Reply
                  key={studyGroupQuestionId}
                  profileImageUrl={profileImageUrl}
                  nickname={nickname}
                  contents={contents}
                  updatedAt={updatedAt}
                />
              );
            })}
          </Reply>
        );
      })}
      {!hasNext && (
        <Typography
          color='secondary'
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            const lastQuestion = contents.at(-1);
            if (!lastQuestion) return;
            const postSize = newSize + size;
            setNewSize(postSize);

            const laststudyGroupQuestionId = lastQuestion.studyGroupQuestionId;
            console.log(laststudyGroupQuestionId);
            requestQuestion(study_id, postSize, laststudyGroupQuestionId);
          }}
        >
          댓글 {totalElements - contents.length}개 더 보기
        </Typography>
      )}
    </StudyDetailQuestionContainer>
  );
}

export default StudyQuestion;
