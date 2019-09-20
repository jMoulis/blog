/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  fetchPost,
  editPost,
  deletePost,
  createPost,
  emptyPost,
} from 'store/reducers/postReducer';
import { connect } from 'react-redux';
import styled from '@emotion/styled';

const Root = styled.form`
  display: flex;
`;
const Content = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;
const Input = styled.input`
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
`;
const TitleInput = styled(Input)`
  font-size: 2.5rem;
`;

const Image = styled.img`
  display: inline-block;
  max-height: 15rem;
`;
const Description = styled.textarea`
  margin-top: 1rem;
  font-size: 1.7rem;
  padding: 0.5rem 1rem;
`;

const Button = styled.button`
  transition: all 100ms ease-in-out;
  background-color: #5d9cbe;
  border: none;
  padding: 1rem 1.5rem;
  color: white;
  font-size: 1.5rem;
  border-radius: 3px;
  outline: none;
  margin: 0 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #93bdd3;
  }
`;

const ButtonDelete = styled(Button)`
  background-color: #db4c4c;
  &:hover {
    background-color: #ea9999;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;

const PostDetail = ({
  post,
  match,
  history,
  fetchPostAction,
  editPostAction,
  deletePostAction,
  emptyPostAction,
  createPostAction,
  created,
  deleted,
  mode,
  isLogged,
}) => {
  const [form, setForm] = useState(null);

  useEffect(() => {
    const postId = match.params.id;
    if (mode === 'create') {
      emptyPostAction();
      setForm({
        description: '',
        topic: '',
        image: '',
      });
    }
    if (postId && mode === 'edit') {
      fetchPostAction(postId);
    }
  }, [match.params, mode, fetchPostAction, emptyPostAction]);

  useEffect(() => {
    if (post && mode === 'edit') {
      setForm({
        description: post.description || '',
        topic: post.topic || '',
        image: post.image || '',
      });
    }
  }, [post, mode]);

  useEffect(() => {
    if (mode === 'create' && created) {
      history.push('/');
    }
  }, [created, history, mode]);

  useEffect(() => {
    if (deleted) {
      emptyPostAction();
      history.push('/');
    }
  }, [deleted]);

  const handleInputChange = ({ target }) => {
    setForm(prevForm => ({ ...prevForm, [target.name]: target.value }));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const postId = match.params.id;
    if (mode === 'create') {
      createPostAction(form);
    } else {
      editPostAction(postId, form);
    }
  };

  if (!form) return null;
  return (
    <Root onSubmit={handleSubmit}>
      <Flex>
        <Image src={form.image} />
        <Input
          name="image"
          onChange={handleInputChange}
          value={form.image}
          placeholder="Ajouter une url vers une image"
        />
      </Flex>
      <Content>
        <TitleInput
          name="topic"
          onChange={handleInputChange}
          value={form.topic}
          placeholder="Ajouter un sujet"
        />
        <Description
          name="description"
          cols={1}
          rows={15}
          onChange={handleInputChange}
          value={form.description}
          placeholder="Ajouter une description"
        />
        {isLogged && (
          <ButtonContainer>
            <Button type="submit">
              {mode === 'create' ? 'Créer' : 'Modifier'}
            </Button>
            <ButtonDelete onClick={() => deletePostAction(match.params.id)}>
              Supprimer
            </ButtonDelete>
          </ButtonContainer>
        )}
      </Content>
    </Root>
  );
};

const mapStateToProps = ({ postReducer, authReducer }) => ({
  post: postReducer.post,
  created: postReducer.created,
  deleted: postReducer.deleted,
  isLogged: authReducer.isLogged,
});

const mapDispatchToProps = dispatch => ({
  fetchPostAction: postId => {
    dispatch(fetchPost(postId));
  },
  editPostAction: (postId, value) => {
    dispatch(editPost(postId, value));
  },
  deletePostAction: postId => {
    dispatch(deletePost(postId));
  },
  createPostAction: values => {
    dispatch(createPost(values));
  },
  emptyPostAction: values => {
    dispatch(emptyPost(values));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetail);
