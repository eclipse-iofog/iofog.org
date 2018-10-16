import React from 'react';
import { Link } from 'gatsby';
import './PostListing.scss';

class PostListing extends React.Component {
  getPostList() {
    const postList = [];

    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.frontmatter.type + postEdge.node.fields.slug,
        title: postEdge.node.frontmatter.title
      });
    });

    return postList;
  }

  render() {
    const postList = this.getPostList();

    return (
      <div className="post-menu">
        {postList.map(post => (
          <Link activeClassName="active" to={post.path} key={post.title}>{post.title}</Link>
        ))}
      </div>
    );
  }
}

export default PostListing;
