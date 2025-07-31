'use server'
import UpdateForm from "../blogUpdateForm/UpdateForm";

const UpdateBlogForm = async ({ params }) => {
    const id = await params;

    return (
        <div>
            <UpdateForm params={id} />
        </div>
    );
};

export default UpdateBlogForm;