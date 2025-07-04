
export function formattedMongoDbId(id) {
    const timeStampHex = id?.toString().substring(0, 8)
    const timeStamp = parseInt(timeStampHex, 16) * 1000
    const date = new Date(timeStamp)

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    })
}