import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { CommunityPostCreateButtonWrapper } from './CommunityPostCreateButton.style';

function CommunityPostCreateButton() {
  return (
    <CommunityPostCreateButtonWrapper>
      <Fab color='primary'>
        <AddIcon />
      </Fab>
    </CommunityPostCreateButtonWrapper>
  );
}
export default CommunityPostCreateButton;
