import * as Yup from 'yup';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import CommunityModalImageUpload from '@src/containers/CommunityModal/CommunityModalImageUpload/CommunityModalImageUpload';
import {
  PreviewImage,
  CardWrapper,
  ModalErrorMessage,
} from '@src/containers/CommunityModal/CommunityModal.style';
import {
  editCommunityPostApi,
  postCommunityPostApi,
} from '@src/apis/community';
import IconButton from '@mui/material/IconButton';
import {
  Button,
  Modal,
  Avatar,
  CardHeader,
  CardContent,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png'];
interface CommunityModalType {
  postId?: string;
  nickname?: string;
  profileImageUrl?: string;
  modalType: string;
  isOpen?: boolean;
  onClose?: (e: React.MouseEvent<HTMLElement>) => void;
}

function CommunityModal({
  postId,
  nickname,
  profileImageUrl,
  modalType,
  isOpen,
  onClose,
}: CommunityModalType) {
  const [previewUrl, setPreviewUrl] = useState('');
  const [isImageSize, setImageSize] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<any>) => {
    if (!e.currentTarget.files[0]) return;
    if (e.currentTarget.files[0].size > 1024 * 1024) {
      setImageSize(true);
      return;
    }
    const objectUrl = URL.createObjectURL(e.currentTarget.files[0]);
    previewUrl && URL.revokeObjectURL(previewUrl);
    setImageSize(false);
    setPreviewUrl(objectUrl);

    formik.setFieldValue('postImage', e.currentTarget.files[0]);
  };

  const handlePost = async (values: {
    contents: string;
    postImage: string;
  }) => {
    const postFormData = new FormData();

    postFormData.append('contents', values.contents);
    postFormData.append('postImage', values.postImage);

    if (modalType === 'CREATE') {
      await postCommunityPostApi({
        url: 'createPost',
        postData: postFormData,
      });
    } else if (modalType === 'EDIT') {
      await editCommunityPostApi({
        url: `editPost${postId}`,
        postData: postFormData,
      });
    }
  };

  //formik
  const formik = useFormik({
    initialValues: {
      contents: '',
      postImage: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      handlePost(values);
      setSubmitting(false);
    },
    validationSchema: Yup.object({
      contents: Yup.string().max(500, '1,000자를 넘을 수 없습니다.').required(),
      postImage: Yup.mixed()
        .test(
          'FILE_SIZE',
          '파일 크기는 최대 1MB 입니다.',
          (value) => !value || (value && value.size <= 1024 * 1024),
        )
        .test(
          'FILE_FORMAT',
          '파일 형식이 올바르지 않습니다.',
          (value) =>
            !value || (value && SUPPORTED_FORMATS.includes(value.type)),
        ),
    }),
    validateOnChange: true, //값 변경시마다 check
  });

  return (
    <Modal
      open={Boolean(isOpen)}
      onClose={onClose}
      BackdropProps={{
        sx: {
          backgroundColor: '#1118271A',
        },
      }}
    >
      <CardWrapper>
        <CardHeader
          avatar={
            <Avatar
              alt='User 1'
              src={profileImageUrl}
              sx={{ cursor: 'pointer' }}
            />
          }
          action={
            <IconButton aria-label='delete' onClick={onClose}>
              <ClearIcon />
            </IconButton>
          }
          title={nickname}
        />
        <CardContent sx={{ padding: '0 1rem 6rem 1rem' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              multiline
              rows={4}
              placeholder='스터디에 대한 생각을 자유롭게 이야기 해주세요!'
              id='contents'
              onChange={formik.handleChange}
              value={formik.values.contents}
              sx={{ width: '100%' }}
            />
            <ModalErrorMessage>{formik.errors.contents}</ModalErrorMessage>
            {previewUrl && <PreviewImage src={previewUrl} alt='' />}
            {isImageSize && (
              <ModalErrorMessage>
                {'파일 크기는 최대 1MB 입니다.'}
              </ModalErrorMessage>
            )}
            <CommunityModalImageUpload onChange={handleImageUpload} />
            <Button
              type='submit'
              size='small'
              disabled={formik.isSubmitting}
              sx={{ float: 'right', marginTop: '0.5rem' }}
            >
              제출
            </Button>
          </form>
        </CardContent>
      </CardWrapper>
    </Modal>
  );
}

export default CommunityModal;
