/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { selectUser } from '@store/slices/user';
import CommunityModal from '@containers/CommunityModal/CommunityModal';

import CommunityPostCreateButton from './CommunityPostCreateButton/CommunityPostCreateButton';

function CommunityPostCreateButtonSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const state = useSelector(selectUser);

  const handleCreateModalOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  const handleCreateModalClose = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <>
      <CommunityPostCreateButton onClick={handleCreateModalOpen} />
      <CommunityModal
        postId={state.user?.id as any}
        nickname={state.user?.nickname}
        profileImageUrl={state.user?.profileImageUrl}
        modalType='CREATE'
        isOpen={isModalOpen}
        onClose={handleCreateModalClose}
      />
    </>
  );
}

export default CommunityPostCreateButtonSection;
