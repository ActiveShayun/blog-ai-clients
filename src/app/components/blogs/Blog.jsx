import dbConnect, { collectionNameObj } from "@/lib/dbConect";
import Link from "next/link";



const Blog = async () => {
    const blogCollection = await dbConnect(collectionNameObj.blogsCollection)
    const result = await blogCollection.find({}).toArray();
    console.log(result);
    return (
        <div>
            <h2>All blog</h2>
            <div className="grid grid-cols-4 gap-4">
                {result.map((blog) => {
                    return (
                        <Link key={blog._id} href={`/blogDetails/${blog._id}`}>
                            <div key={blog._id} className="border p-3 rounded-lg">
                                <h2>{blog.title}</h2>
                            </div>
                        </Link>
                    )
                })}

            </div>
        </div>
    );
};

export default Blog;