'use strict';

const firebase = require('../db');
const Picture = require('../models/picture');
const firestore = firebase.firestore();

const addPicture = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('pictures').doc().set(data);
        res.send('Foto cadastrada com sucesso')
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const getAllPictures = async (req, res, next) => {
    try {
        const pictures = await firestore.collection('pictures');
        const data = await pictures.get();
        const picturesArray = [];
        if (data.empty) {
            res.status('404').send('Sem fotos para serem exibidas!');
        } else {
            data.forEach(doc => {
                const picture = new Picture(
                    doc.id,
                    doc.data().code,
                    doc.data().description,
                    doc.data().imageRef,
                    doc.data().oberervation,
                )
                picturesArray.push(picture);
            });
            res.send(picturesArray);
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getPicture = async (req, res, next) => {
    try {
        const id = req.params.id;
        const pictures = await firestore.collection('pictures').doc(id);
        const data = await pictures.get();
        if (!data.exists) {
            res.status('404').send('ID selecionado inválido');

        } else {
            res.send(data.data());
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updatePicture = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log(data);
        const pictures = await firestore.collection('pictures').doc(id);
        await pictures.update(data);
        res.send('Dados da foto atualizados');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deletePicture = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('pictures').doc(id).delete();
        res.send('Foto excluida');

    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addPicture,
    getAllPictures,
    getPicture,
    updatePicture,
    deletePicture
}