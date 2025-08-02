import Loader from "@/app/loading";
import BlogTable from "@/components/shared/blogTable/BlogTable";
import dbConnect, { collectionNameObj } from "@/lib/dbConnect";

const AllBlogs = async () => {

    const blogsCollection = await dbConnect(collectionNameObj.blogsCollection);
    const blogsDb = await blogsCollection.find({}).toArray()
    const blogs = blogsDb.map(blog => ({
        ...blog,
        _id: blog._id.toString()
    }))
    console.log(blogs);

    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='text-left'>
                        <th>ID</th>
                        <th>Author Name</th>
                        <th>Blogs Image</th>
                        <th>Category</th>
                        <th>Blog Details</th>
                        <th>Status</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {blogs?.length === 0 ?
                        <div className='w-full flex justify-center  mx-auto'>
                            <Loader />
                        </div> :
                        blogs?.map((blog, idx) => {
                            return (
                                <BlogTable
                                    key={blog._id}
                                    blog={blog}
                                    idx={idx}
                                />
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllBlogs;