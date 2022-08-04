import React, { useState } from 'react';
import CommunityModal from '@src/containers/CommunityModal/CommunityModal';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
interface CommunityPostMenuIconButtonType {
  postId: string;
  nickname: string;
  profileImageUrl?: string;
}

function CommunityPostMenuIconButton({
  postId,
  nickname,
  profileImageUrl,
}: CommunityPostMenuIconButtonType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setOpen] = useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditModalOpen = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const handleEditModalClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        id='feed-button'
        aria-controls={open ? 'feed-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        id='feed-menu'
        MenuListProps={{ 'aria-labelledby': 'feed-button' }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleEditModalOpen}>수정</MenuItem>
        <MenuItem onClick={handleClose}>삭제</MenuItem>
      </Menu>
      <CommunityModal
        postId={postId}
        nickname={nickname}
        profileImageUrl={profileImageUrl}
        isOpen={isOpen}
        onClose={handleEditModalClose}
      />
    </>
  );
}

export default CommunityPostMenuIconButton;
