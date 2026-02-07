const ImageKit =require('@imagekit/nodejs')

const musickit=new ImageKit({
    privateKey:process.env.IMAGEKIT_KEY
})
async function uploadFile(file) {
    const result=await musickit.files.upload({
        file,
        fileName:'music'+ Date.now(),
        folder:'music-backend-complete/music'  
    })
    return result
}
module.exports={uploadFile}