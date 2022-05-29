import React from "react";
import Post from "../../components/Post/Post";
import {gql, useQuery} from '@apollo/client'

const GET_POSTS = gql`
  query {
    posts {
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

export default function Posts() {

  const {data, error,loading} = useQuery(GET_POSTS)

  if (error) return <div>Error Page</div>
  if (loading) return <div>loading...</div>;

  const {posts} = data

  console.log('testing',{data, error, loading})
  return <div>{posts.map(post => <Post content={post.content} key={post.id} date={post.createdAt} id={post.id} user={post.user.name}/>)}</div>;
}
