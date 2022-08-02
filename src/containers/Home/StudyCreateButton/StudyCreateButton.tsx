import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { Position } from './StudyCreateButton.style';

function StudyCreateButton() {
  return (
    <Position>
      <Fab component={Link} to='/study/create' color='primary'>
        <AddIcon />
      </Fab>
    </Position>
  );
}
export default StudyCreateButton;
