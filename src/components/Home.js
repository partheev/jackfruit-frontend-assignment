import React, { useState } from 'react'
import styles from './home.module.css'
import TextField from '@mui/material/TextField'
import { Button, MenuItem } from '@mui/material'
import { DialogBox } from './DialogBox'

export const Home = () => {
    const [formData, setformData] = useState({
        Bas: '',
        LTA: '',
        HRA: '',
        FA: '',
        Inv: '',
        Rent: '',
        CityType: '',
        Med: '',
    })
    const [dialogopen, setdialogopen] = useState(false)
    return (
        <div className={styles.layout}>
            {dialogopen && (
                <DialogBox
                    setformData={setformData}
                    formData={formData}
                    setdialogopen={setdialogopen}
                />
            )}
            <div className={styles.formbox}>
                <h2>User Information 1:</h2>
                <section>
                    <TextField
                        value={formData.Bas}
                        onChange={(e) =>
                            setformData({ ...formData, Bas: e.target.value })
                        }
                        sx={{
                            backgroundColor: 'white',
                            margin: '1rem 1rem 1rem 0',
                        }}
                        id='outlined-basic'
                        label='Basic'
                        variant='outlined'
                    />
                    <TextField
                        value={formData.LTA}
                        onChange={(e) =>
                            setformData({ ...formData, LTA: e.target.value })
                        }
                        sx={{
                            backgroundColor: 'white',
                            margin: '1rem 1rem 1rem 0',
                        }}
                        id='outlined-basic'
                        label='LTA'
                        variant='outlined'
                    />
                    <TextField
                        value={formData.HRA}
                        onChange={(e) =>
                            setformData({ ...formData, HRA: e.target.value })
                        }
                        sx={{
                            backgroundColor: 'white',
                            margin: '1rem 1rem 1rem 0',
                        }}
                        id='outlined-basic'
                        label='HRA'
                        variant='outlined'
                    />
                    <TextField
                        value={formData.FA}
                        onChange={(e) =>
                            setformData({ ...formData, FA: e.target.value })
                        }
                        sx={{
                            backgroundColor: 'white',
                            margin: '1rem 1rem 1rem 0',
                        }}
                        id='outlined-basic'
                        label='FA'
                        variant='outlined'
                    />
                </section>
                <section>
                    <h2>User Information 2:</h2>
                    <TextField
                        value={formData.Inv}
                        onChange={(e) =>
                            setformData({ ...formData, Inv: e.target.value })
                        }
                        sx={{
                            backgroundColor: 'white',
                            margin: '1rem 1rem 1rem 0',
                        }}
                        id='outlined-basic'
                        label='Inv'
                        variant='outlined'
                    />
                    <TextField
                        value={formData.Rent}
                        onChange={(e) =>
                            setformData({ ...formData, Rent: e.target.value })
                        }
                        sx={{
                            backgroundColor: 'white',
                            margin: '1rem 1rem 1rem 0',
                        }}
                        id='outlined-basic'
                        label='Rent'
                        variant='outlined'
                    />

                    <TextField
                        value={formData.CityType}
                        label='City Type'
                        onChange={(e) =>
                            setformData({
                                ...formData,
                                CityType: e.target.value,
                            })
                        }
                        select
                        sx={{
                            color: 'black',
                            backgroundColor: 'white',
                            margin: '1rem 1rem 1rem 0',
                            width: '14rem',
                        }}
                    >
                        <MenuItem value={'Metro City'}>Metro City</MenuItem>
                        <MenuItem value={'Non-Metro City'}>
                            Non-Metro City
                        </MenuItem>
                    </TextField>
                    <TextField
                        value={formData.Med}
                        onChange={(e) =>
                            setformData({ ...formData, Med: e.target.value })
                        }
                        sx={{
                            backgroundColor: 'white',
                            margin: '1rem 1rem 1rem 0',
                        }}
                        id='outlined-basic'
                        label='Med'
                        variant='outlined'
                    />
                </section>
                <Button
                    onClick={() => setdialogopen(true)}
                    variant='outlined'
                    sx={{
                        color: 'white',
                        backgroundColor: 'blueviolet',
                        ':hover': {
                            backgroundColor: 'blueviolet',
                        },
                    }}
                >
                    Confirm
                </Button>
            </div>
        </div>
    )
}
