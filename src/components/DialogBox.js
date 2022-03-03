import { Button, Dialog } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { ROUTES } from '../routes'
import styles from './home.module.css'
export const DialogBox = ({ setformData, formData, setdialogopen }) => {
    const [result, setresult] = useState({
        AppHRA: null,
        TaxInc: null,
    })
    const submitHandler = async () => {
        const res = await axios.post(
            ROUTES.taxableData,
            {
                Bas: Number(formData.Bas),
                LTA: Number(formData.LTA),
                HRA: Number(formData.HRA),
                FA: Number(formData.FA),
                Inv: Number(formData.Inv),
                Rent: Number(formData.Rent),
                CityType: formData.CityType,
                Med: Number(formData.Med),
            },
            {
                withCredentials: true,
            }
        )
        setformData({
            Bas: '',
            LTA: '',
            HRA: '',
            FA: '',
            Inv: '',
            Rent: '',
            CityType: '',
            Med: '',
        })
        setresult({
            AppHRA: res.data.AppHRA,
            TaxInc: res.data.TaxInc,
        })
    }
    return (
        <Dialog open={true}>
            <div className={styles.dialoglayout}>
                <div
                    onClick={() => setdialogopen(false)}
                    className={styles.cancel}
                >
                    Cancel
                </div>
                {result.AppHRA ? <h2>Taxable Income</h2> : <h2> Preview</h2>}
                {!result.AppHRA && (
                    <>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Basic</th>
                                    <th>LTA</th>
                                    <th>HRA</th>
                                    <th>FA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{formData.Bas}</td>
                                    <td>{formData.LTA}</td>
                                    <td>{formData.HRA}</td>
                                    <td>{formData.FA}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Inv</th>
                                    <th>Rent</th>
                                    <th>CityType</th>
                                    <th>Med</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{formData.Bas}</td>
                                    <td>{formData.Rent}</td>
                                    <td>{formData.CityType}</td>
                                    <td>{formData.Med}</td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                )}
                {result.AppHRA ? (
                    <div className={styles.result}>
                        <h4>AppHRA: {result.AppHRA}</h4>
                        <h3>TaxInc: {result.TaxInc}</h3>
                    </div>
                ) : (
                    <Button onClick={submitHandler} variant='contained'>
                        Submit
                    </Button>
                )}
            </div>
        </Dialog>
    )
}
