import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { CommunityPostCreateButtonWrapper } from './CommunityPostCreateButton.style';

interface CommunityPostCreateButtonType {
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}
function CommunityPostCreateButton({ onClick }: CommunityPostCreateButtonType) {
  return (
    <CommunityPostCreateButtonWrapper>
      <Fab color='primary' onClick={onClick}>
        <AddIcon />
      </Fab>
    </CommunityPostCreateButtonWrapper>
  );
}
export default CommunityPostCreateButton;
