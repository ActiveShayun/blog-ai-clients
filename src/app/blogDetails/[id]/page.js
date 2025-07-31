'use server'
import DetailsPage from "../component/DetailsPage";

const BlogDetails = async ({ params }) => {
    const p = await params?.id;
    console.log('BlogDetails',p);
    // const data = await fetch(`http://localhost:3000/api/blog/${p}`)
    // const singleService = await data.json()

    return (
        <div>
            <DetailsPage params={p} />
        </div>
    );
};

export default BlogDetails;