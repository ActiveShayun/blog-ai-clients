import dbConnect, { collectionNameObj } from "@/lib/dbConnect";
import MakeAdminButton from "./MakeAdmin";
import UserDelete from "./UserDelete";


const Users = async () => {
    const userCollection = await dbConnect(collectionNameObj.userCollection);
    const usersDb = await userCollection.find({}).toArray();
    const users = usersDb.map(user => ({
        ...user,
        _id: user._id.toString()
    }))

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr className='text-left'>
                            <th>#</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Make Admin</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users?.map((user, idx) => {
                                return (
                                    <tr key={user._id}>
                                        <td>{idx + 1}</td>
                                        <td>{user.name}</td>
                                        <td>image</td>
                                        <td>
                                            <MakeAdminButton user={user} />
                                        </td>
                                        <td>
                                            <UserDelete user={user} />
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;