import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState } from 'react';
import { addPost, selectPost, setPost } from '@store/slices/post';
import { getUserPosts } from '@src/apis/posts';
import { CircularProgress } from '@mui/material';
import { useInterSectionObserver } from '@hooks/useIntersectionObserver';
import CommunityPost from '@containers/CommunityPostListSection/CommunityPost/CommunityPost';
import { ItemCard } from '@components';

import { Ul } from './PostTab.style';

function PostTab() {
  const { user_id: userId } = useParams<{ user_id: string }>();

  const dispatch = useDispatch();
  const {
    value: { posts, hasNext },
  } = useSelector(selectPost);

  const [lastPostId, setLastPostId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    dispatch(setPost({ posts: [], hasNext: true }));
  }, []);

  useEffect(() => {
    (async function requestGetUserPosts() {
      try {
        setLoading(true);
        const res = await getUserPosts(Number(userId), {
          lastPostId: null,
          size: 5,
        });
        dispatch(setPost(res));
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (hasNext && lastPostId !== 0) {
      (async function requestGetUserPosts() {
        try {
          setLoading(true);
          const res = await getUserPosts(Number(userId), {
            lastPostId,
            size: 5,
          });
          dispatch(addPost(res));
        } catch (e) {
          setError(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [lastPostId]);

  const { targetRef } = useInterSectionObserver({
    onTargetObserve: () => {
      const newLastPostId = posts[posts.length - 1].postId;
      setLastPostId(newLastPostId);
    },
    observerOptions: {},
  });

  return (
    <Ul>
      {posts &&
        posts.length !== 0 &&
        posts.map((post, index) => (
          <li
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
          </li>
        ))}
      {!loading && !error && posts && posts.length === 0 && (
        <li>
          <ItemCard>게시물 목록이 없습니다.</ItemCard>
        </li>
      )}
      {error && (
        <li>
          <ItemCard>
            서버로부터 스터디 정보를 불러오지 못했습니다. 잠시 후 다시
            시도해주세요.
          </ItemCard>
        </li>
      )}
      {loading && (
        <ItemCard>
          <CircularProgress />
        </ItemCard>
      )}
    </Ul>
  );
}
export default PostTab;
