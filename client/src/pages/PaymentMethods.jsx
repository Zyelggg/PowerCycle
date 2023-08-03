import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from "../http";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

import mastercardIcon from '../assets/Mastercard-logo.svg.png';
import visaIcon from '../assets/Visa_2021.svg.png';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/pencil.png';

function PaymentMethods() {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch payment methods from the server
    http.get('/addPayment')
      .then((res) => {
        setPaymentMethods(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleDelete = (id) => {
    // Delete the payment method with the specified id
    http.delete(`/addPayment/${id}`)
      .then(() => {
        toast.success('Payment method deleted successfully');
        // Refresh the payment methods list
        fetchPaymentMethods();
      })
      .catch((error) => {
        console.error(error);
        toast.error('Failed to delete payment method');
      });

    handleClose(); // Open the delete confirmation dialog
  };

  const fetchPaymentMethods = () => {
    // Fetch payment methods from the server
    http.get('/addPayment')
      .then((res) => {
        setPaymentMethods(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddPayment = () => {
    navigate('/addPayment'); // Redirect to the add payment page
  };

  const handleEditPayment = (id) => {
    navigate(`/updatePayment/${id}`); // Redirect to the update payment page with the specified id
  };

  const handleTogglePaymentMethod = (id) => {
    if (selectedPaymentMethod === id) {
      setSelectedPaymentMethod(null);
    } else {
      setSelectedPaymentMethod(id);
    }
  };

  const handleIsMainPaymentMethod = (id) => {
    return selectedPaymentMethod === id;
  };

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
        maxWidth: '1000px',
        backgroundColor: '#ffffff',
        padding: '16px',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h4" sx={{ my: 6 }}>
        Manage Payment
      </Typography>
      {paymentMethods.map((paymentMethod) => {
        const maskedCardNumber = `**** **** **** ${paymentMethod.cardNumber.slice(-4)}`;

        return (
          <Box
            key={paymentMethod.id}
            sx={{
              marginBottom: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ToggleButtonGroup
                value={handleIsMainPaymentMethod(paymentMethod.id) ? 'use-for-payment' : null}
                exclusive
                onChange={() => handleTogglePaymentMethod(paymentMethod.id)}
                aria-label="Use for Payment"
              >
                <ToggleButton
                  value="use-for-payment"
                  sx={{
                    padding: 0,
                    marginRight: '10px',
                    backgroundColor: handleIsMainPaymentMethod(paymentMethod.id) ? '#000000' : 'transparent',
                    '&:hover': {
                      backgroundColor: handleIsMainPaymentMethod(paymentMethod.id) ? '#000000' : '#f5f5f5',
                    },
                  }}
                >
                  {handleIsMainPaymentMethod(paymentMethod.id) ? (
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: '#ffffff',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          backgroundColor: '#000000',
                        }}
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        border: '1px solid #000000',
                      }}
                    />
                  )}
                </ToggleButton>
              </ToggleButtonGroup>
              <Box
                sx={{
                  backgroundColor: '#000000',
                  borderRadius: '8px',
                  color: '#ffffff',
                  padding: '16px',
                  width: '250px',
                  height: '150px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginRight: '50px',
                }}
              >
                <Box sx={{ alignSelf: 'flex-start' }}>
                  {paymentMethod.cardNumber.startsWith('5264') && (
                    <img
                      src={mastercardIcon}
                      alt="Mastercard"
                      style={{ width: '60px', height: 'auto' }}
                    />
                  )}
                  {paymentMethod.cardNumber.startsWith('4119') && (
                    <img
                      src={visaIcon}
                      alt="Visa"
                      style={{ width: '60px', height: 'auto' }}
                    />
                  )}
                </Box>
                <Box sx={{ alignSelf: 'flex-start' }}>
                  <Typography variant="h6" sx={{ fontSize: '22px' }}>
                    {maskedCardNumber}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontSize: '15px' }}>
                    {paymentMethod.cardHolderName}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <IconButton sx={{ padding: 0, marginRight: '25px' }} onClick={handleOpen}>
              <img
                src={deleteIcon}
                alt="Delete"
                style={{ width: '30px', height: '30px' }}
              />
            </IconButton>
            <IconButton sx={{ padding: 0, marginTop: '3px' }} onClick={() => handleEditPayment(paymentMethod.id)}>
              <img
                src={editIcon}
                alt="Edit"
                style={{ width: '25px', height: '25px' }}
              />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Delete Card</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to delete this card?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" color="inherit" onClick={handleClose}>
                  Cancel
               </Button>
                <Button variant="contained" color="error" onClick={() => handleDelete(paymentMethod.id)}>
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        );
      })}
      <Button
        variant="contained"
        color="primary"
        sx={{ my: 6 }}
        onClick={handleAddPayment}
      >
        Add Payment Method
      </Button>
    </Box>
  );
}

export default PaymentMethods
