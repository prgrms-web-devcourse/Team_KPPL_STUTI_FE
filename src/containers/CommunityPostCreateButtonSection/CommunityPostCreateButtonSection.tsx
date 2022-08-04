import { useState } from 'react';
import CommunityModal from '@src/containers/CommunityModal/CommunityModal';

import CommunityPostCreateButton from './CommunityPostCreateButton/CommunityPostCreateButton';

function CommunityPostCreateButtonSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
        postId='1'
        nickname='로그인 한 User nickname'
        modalType='CREATE'
        isOpen={isModalOpen}
        onClose={handleCreateModalClose}
      />
    </>
  );
}

export default CommunityPostCreateButtonSection;
