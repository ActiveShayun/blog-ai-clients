import React from 'react';

const BlogDetails = async ({ params }) => {
    const p = await params?.id;
    const data = await fetch(`http://localhost:3000/api/blog/${p}`)
    const singleService = await data.json()
    return (
        <div>
            {JSON.stringify(singleService)}
        </div>
    );
};

export default BlogDetails;