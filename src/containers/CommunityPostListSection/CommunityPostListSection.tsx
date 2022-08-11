import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { addPost, selectPost, setPost } from '@store/slices/post';
import { Box } from '@mui/material';
import { useInterSectionObserver } from '@hooks/useIntersectionObserver';
import { CommunityPostWrapper } from '@containers/CommunityPostListSection/CommunityPostListSection.style';
import CommunityPost from '@containers/CommunityPostListSection/CommunityPost/CommunityPost';
import { ItemCard, SkeletonPost } from '@components';
import { getCommunityDataApi } from '@apis/community';

function CommunityPostListSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const {
    value: { posts, hasNext },
  } = useSelector(selectPost);

  const { targetRef } = useInterSectionObserver({
    onTargetObserve: async () => {
      setLoading(true);
      try {
        if (!posts || !hasNext) return;
        const lastPostId = posts[posts.length - 1].postId;

        if (!loading) {
          const res = await getCommunityDataApi(5, lastPostId);
          dispatch(addPost(res));
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await getCommunityDataApi(5);
        dispatch(setPost(res));
      } catch (e) {
        console.error(e);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <CommunityPostWrapper>
      {posts.map((post, index) => (
        <Box
          ref={index === posts.length - 1 ? targetRef : null}
          key={post.postId}
        >
          <CommunityPost
            key={post.postId}
            postId={post.postId}
            memberId={post.memberId}
            nickname={post.nickname}
            mbti={post.mbti}
            updatedAt={post.updatedAt}
            profileImageUrl={post.profileImageUrl}
            contents={post.contents}
            postImageUrl={post.postImageUrl}
            likedMembers={post.likedMembers}
            totalPostComments={post.totalPostComments}
          />
        </Box>
      ))}
      {!loading && !error && !posts && (
        <ItemCard>커뮤니티가 없습니다.</ItemCard>
      )}
      {error && (
        <ItemCard>
          서버로부터 커뮤니티 정보를 불러오지 못했습니다. 잠시 후
          다시시도해주세요.
        </ItemCard>
      )}
      {loading && <SkeletonPost />}
    </CommunityPostWrapper>
  );
}

export default CommunityPostListSection;
