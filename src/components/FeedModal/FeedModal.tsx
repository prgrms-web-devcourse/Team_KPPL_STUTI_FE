import { isClassExpression } from 'typescript';
import { useState } from 'react';
import { useFormik, Field, Form, Formik } from 'formik';
import IconButton from '@mui/material/IconButton';
import {
  Button,
  Modal,
  Box,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import FeedModalImageUpload from './FeedModalImageUpload/FeedModalImageUpload';

function FeedModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 608,
    bgcolor: 'background.paper',
    borderRadius: '8px',
    boxShadow: 24,
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
    <>
      <Button onClick={handleOpen}></Button>
      <Modal open={open} onClose={handleClose}>
        <Card sx={style}>
          <CardHeader
            avatar={
              <Avatar
                alt='User 1'
                src='https://picsum.photos/id/1026/200/300'
                sx={{ cursor: 'pointer' }}
              />
            }
            action={
              <IconButton aria-label='delete' onClick={handleClose}>
                <ClearIcon />
              </IconButton>
            }
            title='Paeng'
          />
          <CardContent sx={{ padding: '0 1rem 6rem 1rem' }}>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                multiline
                rows={4}
                defaultValue='스터디에 대한 생각을 자유롭게 이야기 해주세요!'
                id='contents'
                onChange={formik.handleChange}
                value={formik.values.contents}
                sx={{ width: '100%' }}
              />
              <Box sx={{ marginTop: '1rem' }}>
                <FeedModalImageUpload onChange={formik.handleChange} />
                <Button
                  type='submit'
                  disabled={formik.isSubmitting}
                  sx={{ float: 'right' }}
                >
                  제출
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Modal>
    </>
  );
}

export default FeedModal;
