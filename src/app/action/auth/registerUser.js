'use server'
import dbConnect, { collectionNameObj } from "@/lib/dbConect"
import bcrypt from "bcryptjs";


const registerUser = async (payload) => {
    const { name, email, password } = payload
    const userCollection = await dbConnect(collectionNameObj.userCollection);
    const query = { email: payload.email }
    const allReadyExists = await userCollection.findOne(query);
    if (allReadyExists) {
        return console.log({ status: 'User all ready exists' })
    }

    const hasPassword = await bcrypt.hash(password, 10)
    payload.password = hasPassword
    const result = await userCollection.insertOne(payload)
    const saveData = {
        acknowledged: result.acknowledged,
        insertedId: result.insertedId.toString()
    }
    console.log('result', payload, result);


}

export default registerUser