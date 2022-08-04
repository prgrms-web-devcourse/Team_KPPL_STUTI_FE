import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import {
  addNewQuestion,
  addQuestions,
  changeQuestion,
  deleteQuestion,
} from '@store/slices/question';
import { errorType } from '@src/interfaces/error';
import { Typography } from '@mui/material';
import {
  childrenQuestionType,
  questionContentType,
  studyDetailQuestionType,
} from '@interfaces/studyDetailQuestion';
import { StudyDetailQuestionContainer } from '@containers/StudyDetail/StudyQuestion/style';
import StudyQuestionInput, { errorHandle } from '@containers/Reply/ReplyInput';
import Reply, { inputHandle } from '@containers/Reply/Reply';
import {
  changeStudyQuestion,
  createStudyQuestion,
  deleteStudyQuestion,
  getStudyQuestionInformation,
} from '@apis/studyDetail';

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

  const handleInputError = useRef<errorHandle>(null);
  const handleInput = useRef<inputHandle[]>([]);
  const handleInputSub = useRef<inputHandle[]>([]);

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
      console.error(error);
      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;
    }
  };

  const createQuestion = async (
    study_id: string,
    parentId: number | null,
    content: string,
    index: number,
    isDefaultInput?: boolean,
  ) => {
    try {
      const res: questionContentType | childrenQuestionType =
        await createStudyQuestion(study_id, parentId, content);

      dispatch(addNewQuestion(res));
      if (isDefaultInput) {
        handleInputError.current?.resetValue();
        handleInputError.current?.handleErrorFalse();
      } else {
        handleInput.current[index]?.resetValue();
        handleInput.current[index]?.handleCommentFlag();
        handleInput.current[index]?.handleErrorFalse();
      }
    } catch (error) {
      console.error(error);
      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;

      if (isDefaultInput) {
        handleInputError.current?.handleErrorTrue();
      } else {
        handleInput.current[index]?.handleErrorTrue();
      }
    }
  };

  const updateQuestion = async (
    study_id: string,
    studyGroupQuestionId: number,
    content: string,
    index: number,
    isSub?: boolean,
  ) => {
    try {
      const res: questionContentType | childrenQuestionType =
        await changeStudyQuestion(study_id, studyGroupQuestionId, content);

      dispatch(changeQuestion(res));

      if (isSub) {
        handleInputSub.current[index]?.resetValue();
        handleInputSub.current[index]?.handleUpdateFlag();
        handleInputSub.current[index]?.handleErrorFalse();
      } else {
        handleInput.current[index]?.resetValue();
        handleInput.current[index]?.handleUpdateFlag();
        handleInput.current[index]?.handleErrorFalse();
      }
    } catch (error) {
      console.error(error);
      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;

      if (isSub) {
        handleInputSub.current[index]?.handleErrorTrue();
      } else {
        handleInput.current[index]?.handleErrorTrue();
      }
    }
  };

  const removeQuestion = async (
    study_id: string,
    studyGroupQuestionId: number,
  ) => {
    try {
      const res: questionContentType | childrenQuestionType =
        await deleteStudyQuestion(study_id, studyGroupQuestionId);

      dispatch(deleteQuestion(res));
    } catch (error) {
      console.error(error);
      const { response } = error as AxiosError;
      const { data }: { data: errorType } = response as AxiosResponse;
      const { errorCode } = data;
    }
  };

  return (
    <StudyDetailQuestionContainer>
      <Typography variant='h5'>질문 & 답변</Typography>
      <StudyQuestionInput
        ref={handleInputError}
        isUpdate={false}
        onCreate={async (content: string) => {
          createQuestion(study_id, null, content, -1, true);
        }}
      />
      {contents.map((content, index) => {
        const {
          studyGroupQuestionId,
          profileImageUrl = '',
          nickname = '프룽이',
          contents: text = '참여하고 싶어요!',
          updatedAt = '2022-02-22 10:00:00',
          children = [],
        } = content;
        return (
          <Reply
            ref={(el) => el && (handleInput.current[index] = el)}
            key={content.studyGroupQuestionId}
            profileImageUrl={profileImageUrl}
            nickname={nickname}
            contents={text}
            replies={children}
            updatedAt={updatedAt}
            onCreate={(content: string) => {
              createQuestion(study_id, studyGroupQuestionId, content, index);
            }}
            onUpdate={(content: string) => {
              updateQuestion(study_id, studyGroupQuestionId, content, index);
            }}
            onDelete={() => {
              removeQuestion(study_id, studyGroupQuestionId);
            }}
          >
            {children.map((reply, index) => {
              const {
                studyGroupQuestionId,
                profileImageUrl = '',
                nickname = '',
                contents = '',
                updatedAt = '2022-02-22 10:00:00',
              } = reply;
              return (
                <Reply
                  ref={(el) => el && (handleInputSub.current[index] = el)}
                  key={studyGroupQuestionId}
                  profileImageUrl={profileImageUrl}
                  nickname={nickname}
                  contents={contents}
                  updatedAt={updatedAt}
                  onUpdate={(content: string) => {
                    updateQuestion(
                      study_id,
                      studyGroupQuestionId,
                      content,
                      index,
                      true,
                    );
                  }}
                  onDelete={() => {
                    removeQuestion(study_id, studyGroupQuestionId);
                  }}
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
