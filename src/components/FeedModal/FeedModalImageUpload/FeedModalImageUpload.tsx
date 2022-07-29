import React from 'react';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

function FeedModalImageUpload({ onChange }: any) {
  return (
    <label htmlFor='feedImageFile'>
      <input
        accept='image/*'
        id='feedImageFile'
        type='file'
        hidden
        onChange={onChange}
      />
      <IconButton component='span'>
        <AddPhotoAlternateIcon />
      </IconButton>
    </label>
  );
}

export default FeedModalImageUpload;
