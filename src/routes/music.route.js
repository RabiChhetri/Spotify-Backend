const express=require('express')
const musicController=require('../controllers/music.controller')
const authMiddleware=require('../middlewares/auth.middleware')
const multer=require('multer')

const router=express.Router()
const upload=multer({storage:multer.memoryStorage()})

router.post('/upload',authMiddleware.authArtist,upload.single('music'),musicController.musicUpload)

router.post('/album',authMiddleware.authArtist,musicController.albumUpload)

router.get('/',authMiddleware.authUser,musicController.getAllMusic)

router.get('/albums',authMiddleware.authUser,musicController.getAllAlbums)

router.get('/albums/:albumId',authMiddleware.authArtist,musicController.getAlumById)

module.exports=router