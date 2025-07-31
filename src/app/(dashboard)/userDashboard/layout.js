import { getServerSession } from "next-auth";
import NavLink from "../adminDashboard/navLink/NavLink";

const UserDashboardLayout = async ({ children }) => {

    const session = await getServerSession()
    console.log(session);

    if (!session && session?.user?.role !== 'user') {
        redirect('/pages/userAuthentication/loginForm');
    }

    const routes = <>
        <NavLink href={'/userDashboard/addBlog'}>Add blogs</NavLink>
        <NavLink href={'/userDashboard/myAddedBlogs'}> My blogs</NavLink>
    </>

    return (
        <div className=''>
            <div className='grid grid-cols-12 gap-4'>
                {/* route */}
                <div className='col-span-3 rounded-xl'>
                    <div className='flex flex-col gap-4 font-medium'>
                        {routes}
                    </div>
                </div>
                {/* layout */}
                <div className='col-span-9 rounded-xl'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default UserDashboardLayout;