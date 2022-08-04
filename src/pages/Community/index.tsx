import { useLayoutEffect, useState } from 'react';
import CommunityPost from '@src/containers/CommunityPost/CommunityPost';
import CommunityModal from '@src/containers/CommunityModal/CommunityModal';
import { CommunityType } from '@interfaces/community';
import CommunityPostCreateButton from '@containers/CommunityPostCreateButton/CommunityPostCreateButton';
import { getCommunityDataApi } from '@apis/community';
function Community() {
  const [communityPostData, setCommunityPostData] = useState<CommunityType>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      {getCommunityPosts().map((post, postIndex) => (
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
          lastPost={getCommunityPosts().length - 1 === postIndex ? true : false}
        />
      ))}
      <CommunityPostCreateButton onClick={handleCreateModalOpen} />
      <CommunityModal
        postId='1'
        nickname='로그인 한 User nickname'
        modalType='Create'
        isOpen={isModalOpen}
        onClose={handleCreateModalClose}
      />
    </>
  );
}

export default Community;
