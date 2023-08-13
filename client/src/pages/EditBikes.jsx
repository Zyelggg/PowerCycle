import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import './styles/Bike.css';
import bikeicon from './images/bikeicon.png';

function EditBikes() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const [bikeStopList, setBikeStopList] = useState([]);
    const [selectedBikeStop, setBikeStop] = useState('');

    const [bike, setBikes] = useState({
        stopname: "",
        repairs: ""
    });

    const getBikeStop = () => {
        http.get('/bikestop').then((res) => {
            setBikeStopList(res.data);
        });
    };

    useEffect(() => {
        http.get(`/bike/${id}`).then((res) => {
            console.log(res.data);
            setBikes(res.data);
        });

        http.get('/bikestop').then((res) => {
            getBikeStop();
        });
    }, []);

    const formik = useFormik({
        initialValues: bike,
        enableReinitialize: true,
        validationSchema: yup.object().shape({
            stopname: yup.string().trim().required('Stop name is required'),
            repairs: yup.boolean().required('Repairs field is required')
        }),
        onSubmit: (data) => {
            data.stopname = data.stopname.trim();
            http.put(`/bike/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/admin/bike");
                });
        }
    })


    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        setIsDeleted(false);
    };

    const deleteBikes = () => {
        http.delete(`/bike/${id}`)
            .then((res) => {
                console.log(res.data);
                setIsDeleted(true);
                setOpen(false);

                setTimeout(() => {
                    navigate("/admin/bike");
                }, 2000);

            });
    };


    return (
        <Box className="main-wrap admin-wrap">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={bikeicon} className='crud-icons' />
                <Typography variant="h5" sx={{ ml: 2 }} className="main-title">
                    Edit Bikes
                </Typography>
            </div>
            <Box component="form" onSubmit={formik.handleSubmit} className='innerbox'>
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
                    value={formik.values.repairs}
                    onChange={formik.handleChange}
                >
                    <MenuItem value={false}>False</MenuItem>
                    <MenuItem value={true}>True</MenuItem>
                </Select>
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Update
                    </Button>
                    <Button variant="contained" sx={{ ml: 2 }} color="error"
                        onClick={handleOpen} style={{ float:"right", marginRight:"20px"}}>
                        Delete
                    </Button>
                </Box>
            </Box>

            
            <Dialog open={open} onClose={handleClose} >
                <img src='https://cdn-icons-png.flaticon.com/512/3588/3588294.png' style={{minWidth:"20%"}} alt="warning" className='noti-icon' />

                <DialogTitle>
                    Delete Bike
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this Bike?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button variant="contained" color="error" className='noti-btn'
                        onClick={deleteBikes}>
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
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Flat_tick_icon.svg/768px-Flat_tick_icon.svg.png" className='noti-icon' />

                <DialogTitle>
                    Bike has been deleted
                </DialogTitle>
            </Dialog>
        </Box>
    )
}

export default EditBikes