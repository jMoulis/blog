import React, { useEffect } from 'react';
import { fetchPosts } from 'store/reducers/postReducer';
import { connect } from 'react-redux';
import PostListItem from 'components/Post/PostListItem';
import styled from '@emotion/styled';

const Root = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Posts = ({ posts, fetchPostsAction }) => {
  useEffect(() => {
    fetchPostsAction();
  }, [fetchPostsAction]);

  return (
    <Root>
      {posts &&
        posts.map(post => {
          return <PostListItem key={post._id} post={post} />;
        })}
    </Root>
  );
};

const mapStateToProps = ({ postReducer }) => ({
  posts: postReducer.posts,
});
const mapDispatchToProps = dispatch => ({
  fetchPostsAction: () => {
    dispatch(fetchPosts());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Posts);
