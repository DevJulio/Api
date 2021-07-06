'use strict';

const firebase = require('../db');
const Picture = require('../models/picture');
const firestore = firebase.firestore();
const auth = firebase.auth()

const addUser = async (req, res, next) => {

    try {
        const data = req.body;
        const { Email, password } = data;
        data.password = ''
        const { id } = await firestore.collection("users").add(data)
        SetDocId(id)
        createAuthUser(Email, password)
        res.send('Usuário cadastrado com sucesso')
    } catch (error) {
        res.status(400).send(error.message)
    }

}

const SetDocId = (docId) => {
    const userDoc = firestore.collection("users").doc(docId)
    return userDoc.update({
        docId: docId
    })
        .then(function () {
            console.log("Document successfully updated!");
        })
        .catch(function (error) {
            console.error("Error updating document: ", error);
        });
}


const Login = async (req, res, next) => {
    const data = req.body;
    const { Email, password } = data;
    try {
        await auth.signInWithEmailAndPassword(Email, password)
        const { email } = auth.currentUser;
        let data;
        await firestore.collection("users").where("Email", "==", email.toString().trim())
            .get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    data = doc.data();
                });
                res.send(data)
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });
        return email
    } catch (error) {
        console.log(error);
        return error
    }
}
const logout = (req, res, next) => {
    auth.signOut().then(function () {
        res.send("Sessão finalizada com sucesso!")
    }).catch(function (error) {
        res.status(400).send(error.message)
    });
}


const createAuthUser = (Email, password) => {
    auth.createUserWithEmailAndPassword(Email, password).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        // ...
        console.log(errorCode + "" + errorMessage);
    });

    auth.onAuthStateChanged(function (user) {
        if (user) {
            console.log("useruser", user);
            auth.signInWithEmailAndPassword(Email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            }).then(function () {
                // window.localStorage.setItem("User", user)
                // location.href = "../../../index.html";
            })

        } else {

        }
    });

}



const getAllUsers = async (req, res, next) => {
    try {
        const pictures = await firestore.collection('users');
        const data = await pictures.get();
        const picturesArray = [];
        if (data.empty) {
            res.status('404').send('Sem usuários para serem exibidos!');
        } else {
            data.forEach(doc => {
                const user = {
                    id: doc.id,
                    Name: doc.data().Name,
                    Saldo: doc.data().Saldo,
                    phone: doc.data().phone,
                    uid: doc.data().uid,
                    enable: doc.data().enable
                }
                picturesArray.push(user);
            });
            res.send(picturesArray);
        }

    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const pictures = await firestore.collection('users').doc(id);
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

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        console.log(data);
        const pictures = await firestore.collection('users').doc(id);
        await pictures.update(data);
        res.status(200).send('Dados atualizados');
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
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deletePicture,
    Login,
    logout
}