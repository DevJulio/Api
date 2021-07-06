const express = require('express')
const { addPicture, getAllPictures, getPicture, updatePicture, deletePicture } = require('../controllers/picture.Controller')
const { addCategory, getAllCategories, deleteCategory } = require('../controllers/category.Controller')
const { addService, getAllServices, deleteService, getService, updateService } = require('../controllers/service.Controller')
const { addSolicitation, getAllSolicitations, updateSolicitation, getSaldoSolicitations, updateSaldoSolicitation, addSaldoSolicitation, getOpenSolicitations } = require('../controllers/solicitations.Controller')
const { getAllUsers, getUser, updateUser, addUser, Login, logout } = require('../controllers/user.Controller')
const router = express.Router();


router.post('/category', addCategory);
router.post('/addService', addService);
router.post('/addSolicitation', addSolicitation)
router.post('/addSaldoSolicitation', addSaldoSolicitation)
router.post('/addUser', addUser)
router.post('/Login', Login)
router.post('/logout', logout)
router.get('/categories', getAllCategories);
router.get('/getAllServices', getAllServices);
router.get('/getAllSolicitations', getAllSolicitations)
router.get('/getSaldoSolicitations', getSaldoSolicitations)
router.get('/getService/:id', getService);
router.get('/getUser/:id', getUser);
router.get('/getAllUsers', getAllUsers);
router.get('/getOpenSolicitations/:id', getOpenSolicitations);
router.put('/updateServ/:id', updateService);
router.put('/updateUser/:id', updateUser);
router.put('/updateSolicitation/:id', updateSolicitation);
router.put('/updateSaldoSolicitation/:id', updateSaldoSolicitation);
router.delete('/deleteCategory/:id/:name', deleteCategory);
router.delete('/deleteService/:id', deleteService);


module.exports = {
    routes: router
}