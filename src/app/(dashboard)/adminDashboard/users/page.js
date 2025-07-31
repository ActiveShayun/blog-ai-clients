import MakeAdminButton from "./MakeAdmin";
import UserDelete from "./UserDelete";


const Users = async () => {
    const res = await fetch('http://192.168.0.111:3000/api/usersRelated/users', {
        cache: 'no-store'
    })
    const users = await res.json()
    console.log(users);

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