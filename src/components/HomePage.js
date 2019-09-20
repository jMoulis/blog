import React from 'react';
import styled from '@emotion/styled';
import Posts from 'components/Post/Posts';

const Image = styled.div`
  background-image: url(${'https://picsum.photos/1200/800'});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top;
  background-color: #464646;
  background-attachment: fixed;
  height: 50rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10vw;
  color: white;
`;

const Root = styled.div``;

const HomePage = () => {
  return (
    <Root>
      <Image>MonSuperBlog</Image>
      <Posts />
    </Root>
  );
};

export default HomePage;
