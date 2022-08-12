/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import React, { useState, useRef, useLayoutEffect } from 'react';
import { useFormik } from 'formik';
import { createPost, editPost } from '@src/store/slices/post';
import IconButton from '@mui/material/IconButton';
import {
  Modal,
  Avatar,
  CardHeader,
  CardContent,
  Box,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { CommunityModalType } from '@interfaces/community';
import CommunityModalImageUpload from '@containers/CommunityModal/CommunityModalImageUpload/CommunityModalImageUpload';
import { editCommunityPostApi, postCommunityPostApi } from '@apis/community';

import {
  PreviewImage,
  CardWrapper,
  ModalErrorMessage,
  SubmitModalButton,
} from './CommunityModal.style';

function CommunityModal({
  postId,
  nickname,
  profileImageUrl,
  contents,
  postImageUrl,
  modalType,
  isOpen,
  onClose,
}: CommunityModalType) {
  const [previewUrl, setPreviewUrl] = useState('');
  const [isImageSizeValid, setImageSizeValid] = useState(false);
  const exitRef = useRef<any>(null);

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    postImageUrl && setPreviewUrl(postImageUrl);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<any>) => {
    if (!e.currentTarget.files[0]) return;
    if (e.currentTarget.files[0].size > 1024 * 1024) {
      setImageSizeValid(true);
      return;
    }
    const objectUrl = URL.createObjectURL(e.currentTarget.files[0]);
    previewUrl && URL.revokeObjectURL(previewUrl);
    setImageSizeValid(false);
    setPreviewUrl(objectUrl);

    formik.setFieldValue('postImage', e.currentTarget.files[0]);
  };

  const handleSubmitPost = async (values: {
    contents: string;
    postImage?: string;
  }) => {
    const postFormData = new FormData();
    let returnApiData;

    postFormData.append('contents', values.contents);
    values.postImage && postFormData.append('postImage', values.postImage);

    switch (modalType) {
      case 'CREATE':
        returnApiData = await postCommunityPostApi(postFormData);
        dispatch(createPost(returnApiData));
        break;
      case 'EDIT':
        returnApiData = await editCommunityPostApi(postId, postFormData);
        dispatch(editPost(returnApiData));
        break;
    }
  };

  //formik
  const formik = useFormik({
    initialValues: {
      contents: contents || '',
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      handleSubmitPost(values);
      exitRef.current.click();
      setSubmitting(false);
    },
    validationSchema: Yup.object({
      contents: Yup.string()
        .max(1000, '1000자를 넘을 수 없습니다.')
        .required('꼭 입력해주세요'),
    }),
    validateOnChange: true,
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
          avatar={<Avatar alt='User 1' src={profileImageUrl} />}
          action={
            <IconButton aria-label='delete' ref={exitRef} onClick={onClose}>
              <ClearIcon />
            </IconButton>
          }
          title={nickname}
        />
        <CardContent sx={{ padding: '0 1rem 6rem' }}>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              multiline
              rows={4}
              placeholder='스터디에 대한 생각을 자유롭게 이야기 해주세요!'
              id='contents'
              onChange={formik.handleChange}
              value={formik.values.contents}
              fullWidth={true}
              {...(formik.errors.contents && {
                error: true,
                helperText: formik.errors.contents,
              })}
            />
            {previewUrl && <PreviewImage src={previewUrl} alt='' />}
            <Box sx={{ display: 'flex' }}>
              <CommunityModalImageUpload onChange={handleImageUpload} />
              {isImageSizeValid && (
                <ModalErrorMessage sx={{ marginTop: '1rem' }}>
                  {'파일 크기는 최대 1MB 입니다.'}
                </ModalErrorMessage>
              )}
              <SubmitModalButton
                type='submit'
                size='medium'
                disabled={formik.isSubmitting}
              >
                공유
              </SubmitModalButton>
            </Box>
          </form>
        </CardContent>
      </CardWrapper>
    </Modal>
  );
}

export default CommunityModal;
