import React, { useState } from 'react'
import styles from './loginscreen.module.css'
import TextField from '@mui/material/TextField'
import { Alert, Button } from '@mui/material'
import axios from 'axios'
import { ROUTES } from '../routes'
import { useNavigate } from 'react-router-dom'
export const LoginScreen = () => {
    const navigate = useNavigate()
    const [alert, setalert] = useState({
        message: null,
        severity: null,
    })
    const [loginState, setloginState] = useState('signup')
    const [errorState, seterrorState] = useState({
        email: false,
        password: false,
        name: false,
    })
    const [formData, setformData] = useState({
        email: '',
        password: '',
        name: '',
        loading: false,
    })

    const submitHandler = async () => {
        let errors = {
            email: false,
            password: false,
            name: false,
        }
        let isError = false

        if (formData.email === '') {
            errors.email = true
            isError = true
        }
        if (formData.password === '') {
            errors.password = true
            isError = true
        }
        if (formData.name === '') {
            errors.name = true
            if (loginState !== 'signin') isError = true
        }
        if (isError) {
            seterrorState({ ...errors })
        } else {
            seterrorState({ ...errors })
            setformData({ ...formData, loading: true })
            if (loginState === 'signup') {
                try {
                    await axios.post(ROUTES.signup, {
                        email: formData.email,
                        password: formData.password,
                        name: formData.name,
                    })
                    setalert({
                        message: 'Account successfully created.',
                        severity: 'success',
                    })
                    setTimeout(() => setalert({ message: null }), 5000)
                } catch (e) {
                    setalert({
                        message: 'Invalid data.',
                        severity: 'error',
                    })
                    setTimeout(() => setalert({ message: null }), 5000)
                }
            } else {
                try {
                    const res = await axios.post(ROUTES.login, {
                        email: formData.email,
                        password: formData.password,
                        name: formData.name,
                    })
                    const d = new Date()
                    d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
                    document.cookie =
                        'userId=' +
                        res.data.userId +
                        ';expires=' +
                        d.toUTCString
                    navigate('/home')
                } catch (e) {
                    setalert({
                        message: 'Invalid credentials.',
                        severity: 'error',
                    })
                    setTimeout(() => setalert({ message: null }), 5000)
                }
            }
        }
    }

    const changeLoginState = () => {
        setformData({
            email: '',
            password: '',
            name: '',
        })
        if (loginState === 'signup') setloginState('signin')
        else setloginState('signup')
    }
    return (
        <div className={styles.layout}>
            <div className={styles.formbox}>
                {alert.message && (
                    <Alert severity={alert.severity}>{alert.message}</Alert>
                )}
                <div>
                    {loginState === 'signup' ? <h2>SignUp</h2> : <h2>Login</h2>}
                </div>
                {loginState === 'signup' && (
                    <TextField
                        value={formData.name}
                        onChange={(e) =>
                            setformData({ ...formData, name: e.target.value })
                        }
                        error={errorState.name}
                        fullWidth={true}
                        label='Name'
                        variant='standard'
                        sx={{ marginBottom: '0rem' }}
                    />
                )}
                <TextField
                    value={formData.email}
                    onChange={(e) =>
                        setformData({ ...formData, email: e.target.value })
                    }
                    error={errorState.email}
                    fullWidth={true}
                    label='Email'
                    variant='standard'
                    sx={{ margin: '1rem 0 2rem 0' }}
                />
                <TextField
                    value={formData.password}
                    onChange={(e) =>
                        setformData({ ...formData, password: e.target.value })
                    }
                    error={errorState.password}
                    fullWidth={true}
                    label='Password'
                    type={'password'}
                    variant='standard'
                />
                <div className={styles.buttonlayout}>
                    <Button
                        onClick={submitHandler}
                        sx={{ margin: '2rem 0' }}
                        variant='contained'
                    >
                        {loginState === 'signup' ? 'Sign Up' : 'Sign In'}
                    </Button>
                </div>
                <div onClick={changeLoginState} className={styles.bottomtitle}>
                    <span>
                        {loginState === 'signup'
                            ? 'Already user?'
                            : 'Sign up new account.'}
                    </span>
                </div>
            </div>
        </div>
    )
}
