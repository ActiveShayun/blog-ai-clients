'use server'
import Loader from "@/app/loading";
import BlogTable from "@/components/shared/blogTable/BlogTable";
import { getServerSession } from "next-auth";

const MyBlogs = async () => {
    const session = await getServerSession()
    console.log(session);
    const res = await fetch(`http://localhost:3000/api/myBlogs/${session?.user?.email}`, {
        cache: 'no-store'
    });
    const myBlogs = await res.json()
    console.log(myBlogs);
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr className='text-left'>
                        <th>ID</th>
                        <th>Author Name</th>
                        <th>Blogs Image</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Blog Details</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {myBlogs.length === 0 ?
                        <div className='w-full flex justify-center  mx-auto'>
                            <Loader />
                        </div> :
                        myBlogs?.map((blog, idx) => {
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

export default MyBlogs;