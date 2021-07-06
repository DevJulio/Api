'use strict';

const firebase = require('../db');
const firestore = firebase.firestore();

const addSolicitation = async (req, res, next) => {

    try {
        const data = req.body;
        console.log(data);
        await firestore.collection('solicitation').doc().set(data);
        res.send('Solicitação cadastrada com sucesso')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getAllSolicitations = async (req, res, next) => {
    try {
        const cate = await firestore.collection('solicitation').where("status", "==", true);
        const data = await cate.get();
        const categoryArray = [];

        if (data.empty) {
            res.status('404').send('Sem serviços');
        } else {
            data.forEach(doc => {
                const cat = {
                    id: doc.id,
                    service: doc.data().service,
                    category: doc.data().category,
                    userUid: doc.data().userUid,
                    qty: doc.data().qty,
                    link: doc.data().link,
                    price: doc.data().price,
                    userDoc: doc.data().userDoc,
                    userName: doc.data().userName
                }
                categoryArray.push(cat);
            });
            res.send(categoryArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const addSaldoSolicitation = async (req, res, next) => {

    try {
        const data = req.body;
        await firestore.collection('solicitacaoSaldo').doc().set(data);
        res.send('Solicitação de saldo enviada com sucesso!')
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getSaldoSolicitations = async (req, res, next) => {
    try {
        const cate = await firestore.collection('solicitacaoSaldo').where("status", "==", true);
        const data = await cate.get();
        const categoryArray = [];

        if (data.empty) {
            res.status('404').send('Sem serviços');
        } else {
            data.forEach(doc => {
                const cat = {
                    id: doc.id,
                    saldo: doc.data().saldo,
                    userDoc: doc.data().userDoc,
                    userName: doc.data().userName
                }
                categoryArray.push(cat);
            });
            res.send(categoryArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateSolicitation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const serv = await firestore.collection('solicitation').doc(id);
        await serv.update(data);
        res.send('Dados da solicitação atualizados');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateSaldoSolicitation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const serv = await firestore.collection('solicitacaoSaldo').doc(id);
        await serv.update(data);
        res.send('Dados de saldo atualizados');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getOpenSolicitations = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);
    try {
        const cate = await firestore.collection('solicitation').where("userDoc", "==", id);
        const data = await cate.get();
        const categoryArray = [];

        if (data.empty) {
            res.status('404').send('Sem serviços');
        } else {
            data.forEach(doc => {
                const cat = {
                    service: doc.data().service,
                    category: doc.data().category,
                    userUid: doc.data().userUid,
                    qty: doc.data().qty,
                    link: doc.data().link,
                    price: doc.data().price,
                    userDoc: doc.data().userDoc,
                    userName: doc.data().userName,
                    isOpen: doc.data().isOpen
                }
                categoryArray.push(cat);
            });
            res.send(categoryArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


module.exports = {
    addSolicitation, getAllSolicitations, updateSolicitation, getSaldoSolicitations, updateSaldoSolicitation, addSaldoSolicitation, getOpenSolicitations
}