import React from 'react';
import { IconButton } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export interface Props {
  onChange: (e: React.ChangeEvent<any>) => void;
}

function CommunityModalImageUpload(props: Props) {
  return (
    <label htmlFor='postImage'>
      <input
        accept='image/*'
        id='postImage'
        type='file'
        hidden
        onChange={props.onChange}
      />
      <IconButton component='div' sx={{ marginTop: '0.5rem' }}>
        <AddPhotoAlternateIcon />
      </IconButton>
    </label>
  );
}

export default CommunityModalImageUpload;
