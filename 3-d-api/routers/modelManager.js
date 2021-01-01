const Model = require('../models/model');

const router = require('express').Router()
const multer = require('multer');
const fs = require('fs');
const unzipper = require('unzipper');

const imagestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/products/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const filestorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/products/zipfiles');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const extractFile = (filepath) => {
    fs.createReadStream('./uploads/products/zipfiles/' + filepath)
        .pipe(unzipper.Extract({ path: './uploads/products/extracted/' + filepath }));
}

const uploadImage = multer({ storage: imagestorage })
const uploadFile = multer({ storage: filestorage })


router.post('/addimg', uploadImage.single('image'), (req, res) => {
    console.log(req.body);
    res.json({ message: "File upload success" })
})

router.post('/addfile', uploadFile.single('file'), (req, res) => {
    console.log(req.body);
    res.json({ message: "File upload success" })
})


router.post('/add', (req, res) => {
    data = req.body;

    let model = new Model(data);

    model.save()
        .then(data => {
            extractFile(data.file)
            res.status(200).json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json(err);
        })
})

router.get('/getall', (req, res) => {


    Model.find({})
        .populate('seller')
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.get('/getbyid/:id', (req, res) => {

    let id = req.params.id

    Model.findById(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

router.delete('/deletebyid/:id', (req, res) => {

    let id = req.params.id

    Model.findByIdAndDelete(id)
        .then(data => {
            res.status(200).json(data);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;