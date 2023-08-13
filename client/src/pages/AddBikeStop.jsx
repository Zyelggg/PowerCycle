import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import './styles/Bike.css';
import bikestopicon from './images/bikestop.png';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AspectRatio from '@mui/joy/AspectRatio';

function AddBikeStop() {
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);

    const formik = useFormik({
        initialValues: {
            stopname: "",
            coordx: "",
            coordy: "",
        },

        validationSchema: yup.object().shape({
            stopname: yup.string().trim()
                .min(3, 'Bike Stop Name must be at least 3 characters')
                .max(100, 'Bike Stop Name must be at most 100 characters')
                .required('Bike Stop Name is required'),
            coordx: yup.number().required('Coordinates X is required'),
            coordy: yup.number().required('Coordinates Y is required')
        }),
        onSubmit: (data) => {
            if (imageFile) {
                data.imageFile = imageFile;
            }
            console.log("work");
            data.stopname = data.stopname.trim();
            http.post("/bikestop", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/admin/bikestop");
                })
        }
    })

    // Image Handler
    const onFileChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            if (file.size > 1024 * 1024) {
                toast.error('Maximum file size is 1MB');
                return;
            }

            let formData = new FormData();
            formData.append('file', file);
            http.post('/file/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then((res) => {
                    setImageFile(res.data.filename);
                    console.log(res.data);
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    };

    return (
        <Box className="main-wrap" style={{ minHeight: "450px" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={bikestopicon} className='crud-icons' />
                <Typography variant="h5" sx={{ ml: 2 }} className="main-title">
                    Add Bikestop
                </Typography>
            </div>
            <Box component="form" onSubmit={formik.handleSubmit} className='innerbox'>

                <Box sx={{ textAlign: 'center', mt: 2 }} >
                {
                        imageFile && (
                            <AspectRatio sx={{ mt: 2 }}>
                                <Box component="img" alt="bikestop"
                                    src={`${import.meta.env.VITE_FILE_BASE_URL}${imageFile}`}>
                                </Box>
                            </AspectRatio>
                        )
                    }
                    <Button variant="contained" component="label">
                        Upload Image
                        <input hidden accept="image/*" multiple type="file" onChange={onFileChange} />
                    </Button>

                    <ToastContainer />
                </Box>

                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Bike Stop Name"
                    name="stopname"
                    value={formik.values.stopname}
                    onChange={formik.handleChange}
                    error={formik.touched.stopname && Boolean(formik.errors.stopname)}
                    helperText={formik.touched.stopname && formik.errors.stopname}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    multiline minRows={2}
                    label="Coordinates X"
                    name="coordx"
                    value={formik.values.coordx}
                    onChange={formik.handleChange}
                    error={formik.touched.coordx && Boolean(formik.errors.coordx)}
                    helperText={formik.touched.coordx && formik.errors.coordx}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    multiline minRows={2}
                    label="Coordinates Y"
                    name="coordy"
                    value={formik.values.coordy}
                    onChange={formik.handleChange}
                    error={formik.touched.coordy && Boolean(formik.errors.coordy)}
                    helperText={formik.touched.coordy && formik.errors.coordy}
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default AddBikeStop