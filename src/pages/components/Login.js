import React, { useState } from 'react';
import { signin } from '../../firebase/auth';

function Login(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const login = (e) => {
        e.preventDefault()
        signin(email, password)

    }

    const createUser = (e) => {
        e.preventDefault()
        console.log('create user')
    }

    const styles = {
        main:`flex justify-center items-start h-[100vh]`,
        form:`bg-blue-600 mt-20 flex flex-col border border-black rounded p-5`,
        button:`bg-green-500 hover:bg-green-700 text-white font-bold mt-2 py-2 px-4 rounded`
    }

    return (
        <div className={styles.main}>
            <form className={styles.form} action="login">
                <label htmlFor="email">Email</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                <label htmlFor="password">Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                <button className={styles.button} type="submit" onClick={(e) => login(e)}>Login</button>
                <button className={styles.button} type="submit" onClick={(e) => createUser(e)}>Sign Up</button>
            </form>
        </div>
    );
}

export default Login;