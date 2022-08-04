import { useLayoutEffect, useState } from 'react';
import CommunityPost from '@src/containers/CommunityPost/CommunityPost';
import { CommunityType } from '@interfaces/community';
import { getCommunityDataApi } from '@apis/community';

function Community() {
  const [communityPostData, setCommunityPostData] = useState<CommunityType>({});

  useLayoutEffect(() => {
    // 맨처음에는 lastPostId를 안 줘야 된다.
    const fetchCommunityData = async () => {
      const res = await getCommunityDataApi();
      setCommunityPostData(res);
    };

    fetchCommunityData();
  }, []);

  const getCommunityPosts = () => {
    const { posts = [] } = communityPostData;
    return posts;
  };
  return (
    <>
      {getCommunityPosts().map((post) => (
        <CommunityPost
          key={post.postId}
          postId={post.postId}
          memberId={post.memberId}
          nickname={post.nickname}
          mbti={post.mbti}
          createdAt={post.createdAt}
          profileImageUrl={post.profileImageUrl}
          contents={post.contents}
          postImageUrl={post.postImageUrl}
          totalLikes={post.totalLikes}
          totalComments={post.totalComments}
          isliked={post.isliked}
        />
      ))}
    </>
  );
}

export default Community;
