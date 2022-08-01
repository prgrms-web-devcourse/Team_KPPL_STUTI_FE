import { StudyList } from '@containers';

import { Hero, ImgConatiner, Img } from './Home.style';

export function Home() {
  return (
    <div>
      <Hero>
        <ImgConatiner>
          <Img src='' alt='' />
        </ImgConatiner>
      </Hero>
      <StudyList />
    </div>
  );
}

export default Home;
