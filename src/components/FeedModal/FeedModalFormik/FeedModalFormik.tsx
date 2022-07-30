import React, { useRef, useState } from 'react';
import { Button, Box, TextField, IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

import FeedModalImageUpload from '../FeedModalImageUpload/FeedModalImageUpload';

function FeedModalFormik({ formik }: any) {
  const [imageUpload, setImageUpload] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  // const imageUploadRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.MouseEvent<HTMLElement>) => {
    setImageUpload(true);
  };

  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files) {
      alert(e.target.files);
    }
  };

  // const onImageUploadButtonClick = () => {
  //   imageUploadRef.current?.click();
  // };

  return (
    <form onSubmit={formik.handleSubmit} onDragEnter={handleDrag}>
      <TextField
        multiline
        rows={4}
        defaultValue='스터디에 대한 생각을 자유롭게 이야기 해주세요!'
        id='contents'
        onChange={formik.handleChange}
        value={formik.values.contents}
        sx={{ width: '100%' }}
      />
      {imageUpload && (
        <>
          <label
            htmlFor='feedImageFile'
            style={{
              height: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: '2px',
              borderStyle: 'dashed',
              borderColor: '#cbd5e1',
              backgroundColor: '#f8fafc',
            }}
          >
            <input
              // ref={imageUploadRef}
              accept='image/*'
              id='feedImageFile'
              type='file'
              onChange={formik.handleChange}
              onDragEnter={handleDrag}
              hidden
            />
          </label>
          {dragActive && (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                borderRadius: '1rem',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
                color: 'red',
              }}
            />
          )}
        </>
      )}
      <Box sx={{ marginTop: '1rem' }}>
        {/* <FeedModalImageUpload onChange={formik.handleChange} /> */}
        <IconButton onClick={handleImageUpload}>
          <AddPhotoAlternateIcon />
        </IconButton>
        <Button
          type='submit'
          disabled={formik.isSubmitting}
          sx={{ float: 'right' }}
        >
          제출
        </Button>
      </Box>
    </form>
  );
}

export default FeedModalFormik;
