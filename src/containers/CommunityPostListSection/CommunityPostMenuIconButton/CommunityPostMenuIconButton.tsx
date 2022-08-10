import { useSelector, useDispatch } from 'react-redux';
import React, { useState } from 'react';
import { selectUser } from '@store/slices/user';
import { deletePost } from '@store/slices/post';
import { MenuItem, Menu, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CommunityPostMenuIconButtonType } from '@interfaces/community';
import CommunityModal from '@containers/CommunityModal/CommunityModal';
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

  const dispatch = useDispatch();

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
    await deleteCommunityPostApi(postId);
    dispatch(deletePost(postId));
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
