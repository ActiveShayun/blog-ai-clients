'use server'
import bcrypt from 'bcryptjs'

const { default: dbConnect, collectionNameObj } = require("@/lib/dbConnect")

export const loginUser = async (payload) => {
    const { email, password } = payload
    console.log('payload', payload);
    const userCollection = await dbConnect(collectionNameObj.userCollection)

    const user = await userCollection.findOne({ email })
    console.log('findOne user', user);
    if (!user) return null

    const isPasswordOk = await bcrypt.compare(password, user.password)
    if (!isPasswordOk) return null;

    return user
}