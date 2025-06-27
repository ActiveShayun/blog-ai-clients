
const { default: axios } = require("axios")

export const uploadImage = async (img) => {
    const formdata = new FormData()
    formdata.append('image', img)

    const API_KEY = process.env.NEXT_PUBLIC_IMAGEBB_API_KEY;
    console.log('API_KEY',API_KEY);
    const res = await axios.post(`https://api.imgbb.com/1/upload?key=${API_KEY}`, formdata)
    console.log('uploadImage', res);

    return res.data.data.url
}