import { gql, useMutation } from '@apollo/client';
import React from 'react';
import './Post.css';

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;
const UNPUBLISH_POST = gql`
  mutation UnPublishPost($postId: ID!) {
    postUnPublish(postId: $postId) {
      userErrors {
        message
      }
      post {
        title
      }
    }
  }
`;
export default function Post({ title, content, date, user, published, id, isMyProfile }) {
  const [PublishPost, { data, loading }] = useMutation(PUBLISH_POST);
  const [UnPublishPost, { data: unpublishdata, loading: unpublishloading }] =
    useMutation(UNPUBLISH_POST);
  const formatedDate = new Date(Number(date));
  return (
    <div className="Post" style={published === false ? { backgroundColor: 'hotpink' } : {}}>
      {isMyProfile && published === false && (
        <p
          className="Post__publish"
          onClick={() =>
            PublishPost({
              variables: {
                postId: id,
              },
            })
          }
          style={{ margin: 20 }}
        >
          publish
        </p>
      )}
      {isMyProfile && published === true && (
        <p
          className="Post__publish"
          onClick={() => {
            UnPublishPost({
              variables: {
                postId: id,
              },
            });
          }}
          style={{ margin: 20 }}
        >
          unpublish
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formatedDate}`.split(' ').splice(0, 3).join(' ')} by {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
