import React, { useState } from 'react';
import { useFormik } from 'formik';
import FeedModalImageUpload from '@src/containers/CommunityModal/CommunityModalImageUpload/CommunityModalImageUpload';
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
interface Props {
  isOpen?: boolean;
  onClose?: () => void;
}

function FeedModal({ isOpen, onClose }: Props) {
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
              src='https://picsum.photos/id/1026/200/300' //User.photo
              sx={{ cursor: 'pointer' }}
            />
          }
          action={
            <IconButton aria-label='delete' onClick={onClose}>
              <ClearIcon />
            </IconButton>
          }
          title='Paeng' //User.nichname
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
            <FeedModalImageUpload onChange={handleImageUpload} />
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

export default FeedModal;
