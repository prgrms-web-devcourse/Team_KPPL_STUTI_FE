import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { selectPost, setPost } from '@store/slices/post';
import CircularProgress from '@mui/material/CircularProgress';
import { CommunityPostWrapper } from '@containers/CommunityPostListSection/CommunityPostListSection.style';
import CommunityPost from '@containers/CommunityPostListSection/CommunityPost/CommunityPost';
import { ItemCard } from '@components/StudyList/StudyList.style';
import { getCommunityDataApi } from '@apis/community';

function CommunityPostListSection() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [postTarget, setPostTarget] = useState();

  //redux
  const dispatch = useDispatch();
  const post = useSelector(selectPost);

  console.log(post);

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

  useEffect(() => {
    let io: any;
    if (postTarget) {
      io = new IntersectionObserver(observerCallback);
      io.observe(postTarget);
    }
    return () => io && io.disconnect();
  }, [postTarget]);

  const observerCallback = (entries: any, observer: any) => {
    if (entries[0].isIntersecting) {
      //맨 마지막
      console.log(entries[0]);
    }
  };

  return (
    <CommunityPostWrapper>
      {post.value.posts &&
        post.value.posts.map((post) => (
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
            ref={setPostTarget}
          />
        ))}
      {!loading && !error && !post.value.posts && (
        <ItemCard>커뮤니티가 없습니다.</ItemCard>
      )}
      {error && (
        <ItemCard>
          서버로부터 커뮤니티 정보를 불러오지 못했습니다. 잠시 후
          다시시도해주세요.
        </ItemCard>
      )}
      {loading && (
        <ItemCard>
          <CircularProgress />
        </ItemCard>
      )}
    </CommunityPostWrapper>
  );
}

export default CommunityPostListSection;
