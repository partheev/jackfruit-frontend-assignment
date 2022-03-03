import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import { LoginScreen } from './components/LoginScreen'
import ReactLoading from 'react-loading'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Box } from '@mui/system'
import { ROUTES } from './routes'
import { Home } from './components/Home.js'
function App() {
    const navigate = useNavigate()
    const [loginState, setloginState] = useState({
        loading: true,
        loggedIn: false,
    })
    useEffect(() => {
        const fetchDetails = async () => {
            try {
                await axios.post(ROUTES.auth, {}, { withCredentials: true })
                navigate('/home')
                setloginState({
                    loading: false,
                    loggedIn: true,
                })
            } catch (e) {
                navigate('/login')
                setloginState({
                    loading: false,
                    loggedIn: false,
                })
            }
        }
        fetchDetails()
    }, [])

    return (
        <div>
            {loginState.loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}
                >
                    <ReactLoading
                        type={'spin'}
                        color={'black'}
                        height={'2rem'}
                        width={'2rem'}
                    />
                </Box>
            ) : (
                <Routes>
                    <Route path='/' element={<Navigate to='/home' />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/login' element={<LoginScreen />} />
                </Routes>
            )}
        </div>
    )
}

export default App
