'use server'
import UpdateBlogForm from "../components/UpdateBlogForm";

const UpdateBlog =  ({ params }) => {
    const p =  params?.id
    console.log(p);

    // const data = await fetch(`http://localhost:3000/api/blog/${p}`)
    // const singleBlog = await data.json()
    // console.log(singleBlog);

    return (
        <div>
            <UpdateBlogForm p={p} />
        </div>
    );
};

export default UpdateBlog;