import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import './styles/Bike.css';
import bikestopicon from './images/bikestop.png'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AspectRatio from '@mui/joy/AspectRatio';

function EditBikeStop() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isDeleted, setIsDeleted] = useState(false);
    const [open, setOpen] = useState(false);

    const [imageFile, setImageFile] = useState(null);

    const [bikestop, setBikeStop] = useState({
        stopname: "",
        coordx: "",
        coordy: ""
    });

    useEffect(() => {
        http.get(`/bikestop/${id}`).then((res) => {
            setBikeStop(res.data);
            setImageFile(res.data.imageFile);   
        });
    }, []);

    const formik = useFormik({
        initialValues: bikestop,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            stopname: yup.string().trim()
                .min(3, 'Bike Stop Name must be at least 3 characters')
                .max(100, 'Bike Stop Name must be at most 100 characters')
                .required('Bike Stop Name is required'),
            coordx: yup.number().required('Coordinates X is required'),
            coordy: yup.number().required('Coordinates Y is required')
        }),
        onSubmit: (data) => {
            data.stopname = data.stopname.trim();
            http.put(`/bikestop/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/bikestop");
            })
        }
    })


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setIsDeleted(false);
    };

    const deleteBikeStop = () => {
        http.delete(`/bikestop/${id}`)
            .then((res) => {
                console.log(res.data);
                setIsDeleted(true);
                setOpen(false);
                
                setTimeout(() => {
                    navigate("/bikestop");
                }, 2000); 
            });
    }

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
                })
                .catch(function (error) {
                    console.log(error.response);
                });
        }
    };


    return (
        <Box className="main-wrap admin-wrap" style={{ minHeight : "800px" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={bikestopicon} className='crud-icons'/>
                <Typography variant="h5" sx={{ ml: 2 }} className="main-title">
                    Edit Bikestop
                </Typography>
            </div>
            <Box component="form" onSubmit={formik.handleSubmit} className='innerbox'>
            <Box sx={{ textAlign: 'center', mt: 2 }}  >
                {
                        imageFile && (
                            <AspectRatio sx={{ mt: 2 }}>
                                <Box component="img" alt="bikestop"
                                    src={`${import.meta.env.VITE_FILE_BASE_URL}${imageFile}`}>
                                </Box>
                            </AspectRatio>
                        )
                    }
                    <Button variant="contained" component="label" style={{marginTop: "20px"}}>
                        Change Image
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
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    multiline minRows={2}
                    label="Coordinates X"
                    name="coordx"
                    value={formik.values.coordx}
                    onChange={formik.handleChange}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    multiline minRows={2}
                    label="Coordinates Y"
                    name="coordy"
                    value={formik.values.coordy}
                    onChange={formik.handleChange}
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Update
                    </Button>
                    <Button variant="contained" sx={{ ml: 2 }} color="error"
                        onClick={handleOpen} style={{ float:"right", marginRight: "20px"}}>
                        Delete
                    </Button>
                </Box>
            </Box>


            <Dialog open={open} onClose={handleClose}>

                <img src='https://cdn-icons-png.flaticon.com/512/3588/3588294.png' alt="warning" className='noti-icon'/>

                <DialogTitle>
                    Delete Bike Stop
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Bike Stop?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button variant="contained" color="error" className='noti-btn'
                        onClick={deleteBikeStop}>
                        Delete
                    </Button>

                </DialogActions>

                <DialogActions>
                <Button variant="contained" color="inherit" className='noti-btn'
                        onClick={handleClose}>
                        Cancel
                    </Button>

                </DialogActions>
            </Dialog>


            <Dialog open={isDeleted} onClose={handleClose}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/768px-Flat_tick_icon.svg.png" className='noti-icon'/>
                
                <DialogTitle>
                    Bike has been deleted
                </DialogTitle>
            </Dialog>
        </Box>
    )
}

export default EditBikeStop