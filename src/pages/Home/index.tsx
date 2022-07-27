import { useEffect, useState } from 'react';
import { getStudyDetailInfomation } from '@src/api/studyDetail';
import { studyDetailType } from '@interfaces/studyDetail';
import { SampleCounter, StudyDetailMbtiRecommand } from '@containers';
function Home() {
  const [data, setData] = useState({} as studyDetailType);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getStudyDetailInfomation();
      setData(res);
    };

    fetchData();
  }, []);

  const getPreferredMbtis = () => {
    const { preferredMbtis = [] } = data;

    return preferredMbtis;
  };

  return (
    <div>
      <div>홈페이지입니다.</div>
      <SampleCounter />
      <StudyDetailMbtiRecommand preferredMbtis={getPreferredMbtis()} />
    </div>
  );
}

export default Home;
