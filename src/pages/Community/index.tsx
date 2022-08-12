import { useSelector } from 'react-redux';
import { selectUser } from '@store/slices/user';
import CommunityPostListSection from '@containers/CommunityPostListSection/CommunityPostListSection';
import CommunityPostCreateButtonSection from '@containers/CommunityPostCreateButtonSection/CommunityPostCreateButtonSection';

import { CommunityWrapper } from './style';
function Community() {
  const state = useSelector(selectUser);

  return (
    <CommunityWrapper>
      <CommunityPostListSection />
      {state.isLogin && <CommunityPostCreateButtonSection />}
    </CommunityWrapper>
  );
}

export default Community;
