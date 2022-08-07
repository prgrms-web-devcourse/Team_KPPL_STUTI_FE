import { useLayoutEffect, useState, useEffect, useRef } from 'react';
import CommunityPost from '@src/containers/CommunityPostListSection/CommunityPost/CommunityPost';
import { CommunityType, CommunityPostType } from '@interfaces/community';
import { getCommunityDataApi } from '@apis/community';

import { CommunityPostWrapper } from './CommunityPostListSection.style';

function CommunityPostListSection() {
  const [communityPostData, setCommunityPostData] = useState<CommunityType>({});
  const [communityPostLists, setCommunityPostLists] = useState<
    CommunityPostType[]
  >([]);
  const [postTarget, setPostTarget] = useState();

  useLayoutEffect(() => {
    // 맨처음에는 lastPostId를 안 줘야 된다.
    const fetchCommunityData = async () => {
      const res = await getCommunityDataApi();
      setCommunityPostData(res);
      setCommunityPostLists(res.posts);
    };
    fetchCommunityData();
  }, []);

  useEffect(() => {
    let io: any;
    if (postTarget) {
      io = new IntersectionObserver(observerCallback);
      io.observe(postTarget);
    }
    return () => io && io.disconnect();
  }, [postTarget]);

  const observerCallback = (entries: any, observer: any) => {
    console.log(entries[0].target.prop);
    entries.forEach((entry: any) => console.log(entry));
  };

  return (
    <CommunityPostWrapper>
      {communityPostLists.map((post) => (
        <CommunityPost
          key={post.postId}
          postId={post.postId}
          memberId={post.memberId} //post작성한 사람id
          nickname={post.nickname}
          mbti={post.mbti}
          createdAt={post.createdAt}
          profileImageUrl={post.profileImageUrl}
          contents={post.contents}
          postImageUrl={post.postImageUrl}
          totalLikes={post.totalLikes}
          totalComments={post.totalComments}
          isliked={post.isliked}
          ref={setPostTarget}
        />
      ))}
    </CommunityPostWrapper>
  );
}

export default CommunityPostListSection;
