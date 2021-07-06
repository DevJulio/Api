'use strict';

const firebase = require('../db');
const Category = require('../models/category');
const firestore = firebase.firestore();

const addCategory = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('category').doc().set(data);
        res.send('Categoria cadastrada com sucesso')
    } catch (error) {
        res.status(400).send(error.message)
    }
}


const getAllCategories = async (req, res, next) => {
    try {
        const cate = await firestore.collection('category');
        const data = await cate.get();
        const categoryArray = [];
        if (data.empty) {
            res.status('404').send('Sem categorias');
        } else {
            data.forEach(doc => {
                const cat = new Category(
                    doc.data().name,
                    doc.id,
                )
                categoryArray.push(cat);
            });
            console.log(categoryArray);
            res.send(categoryArray);
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

// const getPicture = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const pictures = await firestore.collection('category').doc(id);
//         const data = await pictures.get();
//         if (!data.exists) {
//             res.status('404').send('ID selecionado inválido');

//         } else {
//             res.send(data.data());
//         }

//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

// const updatePicture = async (req, res, next) => {
//     try {
//         const id = req.params.id;
//         const data = req.body;
//         console.log(data);
//         const pictures = await firestore.collection('category').doc(id);
//         await pictures.update(data);
//         res.send('Dados da foto atualizados');
//     } catch (error) {
//         res.status(400).send(error.message);
//     }
// }

const deleteCategory = async (req, res, next) => {
    try {
        const { id, name } = req.params
        await firestore.collection('category').doc(id).delete();
        const servicesArr = await getServicesByCategory(name)
        if (servicesArr.length) {
            await deleteServicesById(servicesArr)
            res.send('Categoria excluida');
        } else {
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getServicesByCategory = async (req, res, next) => {
    try {
        const cate = await firestore.collection('service').where('category', '==', req);
        const data = await cate.get();
        const categoryArray = [];

        if (data.empty) {
        } else {
            data.forEach(doc => {
                categoryArray.push(doc.id);
            });
            return categoryArray;
        }
    } catch (error) {
        console.log(error);

    }
}
const deleteServicesById = async (req, res, next) => {
    try {
        req.forEach(element => {
            firestore.collection('service').doc(element).delete();
        });
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    addCategory, getAllCategories, deleteCategory
}