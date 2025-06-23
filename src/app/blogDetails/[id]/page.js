import React from 'react';

const BlogDetails = ({ params }) => {
    const p = params?.id;
    return (
        <div>
            {JSON.stringify(p)}
        </div>
    );
};

export default BlogDetails;