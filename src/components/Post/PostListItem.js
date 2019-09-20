import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1.5rem;
  min-height: 40rem;
  flex: 1 0 30rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px 1px rgba(211, 211, 211, 0.5);
  transition: all 150ms ease-in-out;
  &:hover {
    box-shadow: 0 0 15px 5px rgba(211, 211, 211, 0.5);
  }
`;

const Image = styled.div`
  background-image: url('${({ imageUrl }) => imageUrl}');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  background-color: #464646;
  height: 20rem;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  padding-bottom: 1rem;
  
`;
const Content = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;
`;
const Title = styled.h1`
  font-size: 2.5rem;
`;

const Description = styled.p`
  margin-top: 1rem;
  font-size: 1.7rem;
`;

const Button = styled(Link)`
  transition: all 100ms ease-in-out;
  background-color: #5d9cbe;
  border: none;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 1.5rem;
  border-radius: 3px;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #93bdd3;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-self: flex-end;
`;

const Post = ({ post }) => {
  if (!post) return null;
  return (
    <Root>
      <Image imageUrl={post.image} />
      <Content>
        <div>
          <Title>{post.topic}</Title>
          <Description>{post.description}</Description>
        </div>
        <ButtonContainer>
          <Button to={`posts/${post._id}`}>Voir</Button>
        </ButtonContainer>
      </Content>
    </Root>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
