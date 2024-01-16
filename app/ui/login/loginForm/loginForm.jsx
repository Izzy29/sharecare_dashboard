"use client"

import { authenticate } from "@/app/lib/actions"
import styles from "./loginForm.module.css"
import { useFormState } from "react-dom"
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const LoginForm = () => {

    const [state, formAction] = useFormState(authenticate, undefined);
    const [showPassword, setShowPassword] = useState(false);

    return (
        <form action={formAction} className={styles.form}>

            <div className={styles.login}>
                <h1>ShareCare</h1>
                <h2>Food Distribution Management System Dashboard</h2>
            </div>
            {state && <p className={styles.errorMessage}>{state}</p>}

            <div className={styles.inputform}>
                <p><FaUser /><input type="text" placeholder="username" name="username" required /></p>
            </div>

            <div className={styles.inputform}>
                <p><FaLock />
                    <input type={showPassword ? 'text' : 'password'} placeholder="password" name="password" required />
                    <button className={styles.button1}
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                        {showPassword ? <FaEyeSlash className={styles.icon} /> : <FaEye className={styles.icon} />}
                    </button></p>
            </div>

            <button className={styles.button2}>Login</button>

        </form>
    )
}

export default LoginForm