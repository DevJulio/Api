'use strict';

const firebase = require('../db');
const Service = require('../models/services');
const firestore = firebase.firestore();

const addService = async (req, res, next) => {

    try {
        const data = req.body;
        await firestore.collection('service').doc().set(data);
        res.send('Serviço cadastrado com sucesso')
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const getAllServices = async (req, res, next) => {
    try {
        const cate = await firestore.collection('service');
        const data = await cate.get();
        const categoryArray = [];

        if (data.empty) {
            res.status('404').send('Sem serviços');
        } else {
            data.forEach(doc => {
                console.log(doc.data());
                const cat = {
                    id: doc.id,
                    description: doc.data().description,
                    category: doc.data().category,
                    name: doc.data().name,
                    qty: doc.data().qty,
                    price: doc.data().price,
                }
                categoryArray.push(cat);
            });


            res.send(categoryArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getService = async (req, res, next) => {
    try {
        const id = req.params.id;
        const services = await firestore.collection('service').doc(id);
        const data = await services.get();
        if (!data.exists) {
            res.status('404').send('ID selecionado inválido');

        } else {
            res.send(data.data());
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateService = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log(data);
        const serv = await firestore.collection('service').doc(id);
        await serv.update(data);
        res.send('Dados do serviço atualizados');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteService = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('service').doc(id).delete();
        res.send('Serviço excluido');

    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addService, getAllServices, deleteService, getService, updateService
}