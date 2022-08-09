import { useSelector } from 'react-redux';
import React, { useLayoutEffect, useState } from 'react';
import { selectUser } from '@store/slices/user';
import CommunityModal from '@src/containers/CommunityModal/CommunityModal';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CommunityPostMenuIconButtonType } from '@interfaces/community';
import { deleteCommunityPostApi } from '@apis/community';

function CommunityPostMenuIconButton({
  postId,
  memberId,
  nickname,
  profileImageUrl,
  contents,
  postImageUrl,
}: CommunityPostMenuIconButtonType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isOpen, setOpen] = useState(false);
  const open = Boolean(anchorEl);
  const state = useSelector(selectUser);

  const checkMyPost = () => state.user?.id === memberId;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!checkMyPost()) return;
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

  const handleDeletePost = async () => {
    //post 삭제 api
    await deleteCommunityPostApi(postId);
    setAnchorEl(null);
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
        <MenuItem onClick={handleDeletePost}>삭제</MenuItem>
      </Menu>
      <CommunityModal
        key={postId}
        postId={postId}
        nickname={nickname}
        profileImageUrl={profileImageUrl}
        contents={contents}
        postImageUrl={postImageUrl}
        modalType='EDIT'
        isOpen={isOpen}
        onClose={handleEditModalClose}
      />
    </>
  );
}

export default CommunityPostMenuIconButton;
