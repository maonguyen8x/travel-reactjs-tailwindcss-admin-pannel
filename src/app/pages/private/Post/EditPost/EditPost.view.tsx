import React, { useEffect } from 'react';
import EditPostForm from './EditPost.component';

const PostEdit = (props: any) => {
  useEffect(() => {
    const { id } = props.match.params;
    props.getPostById(id);
  }, []);

  return <EditPostForm {...props} />;
};

export default PostEdit;
