import { Link } from 'react-router-dom';
import { useState, MouseEvent } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { Position, CustomIconButton } from './MoreButton.style';

interface Props {
  studyId: number;
  onDeleteBtnClick: (studyId: number) => void;
}

function MoreButton({ studyId, onDeleteBtnClick }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeMenu = () => {
    setAnchorEl(null);
  };
  const handleDeleteBtnClick = () => {
    closeMenu();
    onDeleteBtnClick(studyId);
  };
  return (
    <Position>
      <CustomIconButton
        id='more-button'
        aria-controls={open ? 'more-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open ? 'true' : undefined}
        onClick={openMenu}
      >
        <MoreHorizIcon />
      </CustomIconButton>
      <Menu
        id='more-menu'
        aria-labelledby='more-button'
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem
          component={Link}
          to={`/study/${studyId}/manage`}
          onClick={closeMenu}
          sx={{ minWidth: '7.5rem' }}
        >
          관리
        </MenuItem>
        <MenuItem
          component={Link}
          to={`/study/${studyId}/edit`}
          onClick={closeMenu}
          sx={{ minWidth: '7.5rem' }}
        >
          수정
        </MenuItem>
        <MenuItem onClick={handleDeleteBtnClick} sx={{ minWidth: '7.5rem' }}>
          삭제
        </MenuItem>
      </Menu>
    </Position>
  );
}

export default MoreButton;
