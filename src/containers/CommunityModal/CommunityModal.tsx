import React, { useState } from 'react';
import { useFormik } from 'formik';
import CommunityModalImageUpload from '@src/containers/CommunityModal/CommunityModalImageUpload/CommunityModalImageUpload';
import {
  PreviewImage,
  CardWrapper,
} from '@src/containers/CommunityModal/CommunityModal.style';
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
//postId, user.nickname , user.image 받기
interface CommunityModalType {
  postId: string;
  nickname: string;
  profileImageUrl?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

function CommunityModal({
  postId,
  nickname,
  profileImageUrl,
  isOpen,
  onClose,
}: CommunityModalType) {
  const [previewUrl, setPreviewUrl] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<any>) => {
    if (!e.currentTarget.files[0]) return;

    console.log(e.currentTarget.files[0]);
    const objectUrl = URL.createObjectURL(e.currentTarget.files[0]);
    previewUrl && URL.revokeObjectURL(previewUrl);
    setPreviewUrl(objectUrl);

    formik.setFieldValue('file', e.currentTarget.files[0]);
  };

  //formik
  const formik = useFormik({
    initialValues: {
      contents: '',
    },
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(true);
      //postId 수정
      console.log(values);
      setSubmitting(false);
    },
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
            {previewUrl && <PreviewImage src={previewUrl} alt='' />}
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
