import CommunityPostListSection from '@containers/CommunityPostListSection/CommunityPostListSection';
import CommunityPostCreateButtonSection from '@containers/CommunityPostCreateButtonSection/CommunityPostCreateButtonSection';

import { CommunityWrapper } from './style';
function Community() {
  return (
    <CommunityWrapper>
      <CommunityPostListSection />
      <CommunityPostCreateButtonSection />
    </CommunityWrapper>
  );
}

export default Community;
