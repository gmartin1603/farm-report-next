import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from './firebaseApp'

// onAuthStateChanged(auth, (user) => {
//     console.log(user)
// })

export const signin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
    .then(user => console.log(user))
    .catch(err => console.log(err))
}

export const createUser = (load) => {
    createUserWithEmailAndPassword(auth, load.email, load.password)
    .then((user) => console.log(user))
    .catch((err) => console.log(err))
}