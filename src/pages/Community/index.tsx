import { useRef } from 'react';
import CommunityCard from '@src/containers/CommunityCard/CommuntyCard';
const postsData = {
  posts: [
    {
      postId: 2,
      memberId: 2,
      nickName: '키아',
      createdAt: '1시간전',
      profileImageUrl: 'http://prgrms.stuti/profile/image1.jpg',
      contents:
        '오늘 spring security jwt에 대해서 학습했습니다.오늘 spring security jwt에 대해서 학습했습니다.오늘 spring security jwt에 대해서 학습했습니다.오늘 spring security jwt에 대해서 학습했습니다.오늘 spring security jwt에 대해서 학습했습니다.오늘 spring security jwt에 대해서 학습했습니다.오늘 spring security jwt에 대해서 학습했니닼ㅋzzasgasegasegasegaseg',
      postImageUrl: 'https://picsum.photos/id/1026/200/300',
      totalLikes: 10,
      totalComments: 10,
      isliked: true,
    },
    {
      postId: 1,
      memberId: 1,
      nickName: '팽',
      createdAt: '2시간전',
      profileImageUrl: 'http://prgrms.stuti/profile/image2.jpg',
      contents:
        '오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..오늘은 공부를 하지 않았습니다..',
      postImageUrl: 'https://picsum.photos/id/1026/200/300',
      totalLikes: 20,
      totalComments: 20,
      isliked: true,
    },
    {
      postId: 3,
      memberId: 1,
      nickName: 'Padd',
      createdAt: '3시간전',
      profileImageUrl: 'http://prgrms.stuti/profile/image3.jpg',
      contents: '오늘 React, typescript에 대해서 학습했습니다.',
      postImageUrl: 'https://picsum.photos/id/1026/200/300',
      totalLikes: 30,
      totalComments: 30,
      isliked: true,
    },
  ],
};

function Community() {
  return (
    <div>
      {postsData.posts.map((post) => (
        <CommunityCard
          key={post.postId}
          nickName={post.nickName}
          createdAt={post.createdAt}
          profileImageUrl={post.profileImageUrl}
          contents={post.contents}
          postImageUrl={post.postImageUrl}
          totalLikes={post.totalLikes}
          totalComments={post.totalComments}
        />
      ))}
    </div>
  );
}

export default Community;
