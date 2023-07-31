import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import './styles/Bike.css';
import bikeicon from './images/bikeicon.png';

function AddBikes() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            stopname: '',
            repairs: false
        },

        validationSchema: yup.object().shape({
            stopname: yup.string().trim().required('Stop name is required'),
            repairs: yup.boolean().required('Repairs field is required')
        }),

        onSubmit: (data) => {
            console.log("Submit button clicked");
            http.post("/bike", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/bike");
                })
        }
    });

    const [repairs, setRepairs] = useState(false);
    const [bikeStopList, setBikeStopList] = useState([]);

    const getBikeStop = () => {
        http.get('/bikestop').then((res) => {
            setBikeStopList(res.data);
        });
    };

    useEffect(() => {
        http.get('/bikestop').then((res) => {
            getBikeStop();
        });
    }, []);


    const handleChangeRepairs = (event) => {
        setRepairs(event.target.value);
    };

    return (
        <Box className="main-wrap admin-wrap">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={bikeicon} className='crud-icons' />
                <Typography variant="h5" sx={{ ml: 2 }} className="main-title">
                    Add Bikes
                </Typography>
            </div>
            <Box component="form" onSubmit={formik.handleSubmit}>


                <InputLabel id="stop-label">Stop name</InputLabel>

                <Select
                    fullWidth margin="normal"
                    labelId="stop-label"
                    id="stopname"
                    name="stopname"
                    value={formik.values.stopname}
                    onChange={formik.handleChange}
                    error={formik.touched.stopname && Boolean(formik.errors.stopname)}
                    helpertext={formik.touched.stopname && formik.errors.stopname}
                >
                    <MenuItem value="" disabled>
                        Select a bike stop
                    </MenuItem>
                    {bikeStopList.map((bikeStop) => (
                        <MenuItem key={bikeStop.stopname} value={bikeStop.stopname}>
                            {bikeStop.stopname}
                        </MenuItem>
                    ))}
                </Select>

                <InputLabel id="repairs-label">Repairs</InputLabel>
                <Select
                    fullWidth
                    margin="normal"
                    labelId="repairs-label"
                    id="repairs"
                    name="repairs"
                    value={repairs}
                    onChange={handleChangeRepairs}
                    error={formik.touched.repairs && Boolean(formik.errors.repairs)}
                    helperText={formik.touched.repairs && formik.errors.repairs}
                >
                    <MenuItem value={false}>False</MenuItem>
                    <MenuItem value={true}>True</MenuItem>
                </Select>

                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default AddBikes;
