import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import http from '../http';

// import mastercardIcon from '../assets/Mastercard-logo.svg.png';
// import visaIcon from '../assets/Visa_2021.svg.png';
// import '../pages/styles/Payment.css';

function UpdatePayment() {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  const[card, setCard] = useState({
    cardNumber: "",
    cardHolderName: "",
    expirationDate: "",
    cvv: "",
  })

  const formik = useFormik({
    initialValues : card,
    enableReinitialize : true,
    validationSchema: yup.object({
      cardNumber: yup.string().required('Card number is required'),
      cardHolderName: yup.string().required('Cardholder name is required'),
      expirationDate: yup.string().required('Expiration date is required'),
      cvv: yup.string().required('CVV is required'),
    }),
    onSubmit: (data) => {
      http
        .put(`/addPayment/${id}`, data)
        .then(() => {
          toast.success('Card information updated successfully.');
          navigate('/paymentMethods');
        })
        .catch((err) => {
          toast.error('Failed to update card information.');
        });
    },
  });

  useEffect(() => {
    // Fetch the payment method data from the database
    http
      .get(`/addPayment/${id}`)
      // fetch
      //   (`http://localhost:3001/addPayment/updatePayment/${id}`, {method: "GET"})
      .then((res) => {
        setCard(res.data)
        // Set the fetched data into the formik form fields
        // formik.setValues({
        //   cardNumber: paymentMethod.cardNumber,
        //   cardHolderName: paymentMethod.cardHolderName,
        //   expirationDate: paymentMethod.expirationDate,
        //   cvv: paymentMethod.cvv,
        // });
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to fetch payment method data.');
      });
  },[]);

  // Determine card brand based on the first 4 digits of the card number
  let cardBrandIcon = null;
  if (formik.values.cardNumber.startsWith('5264')) {
    cardBrandIcon = (
      <img
        src={mastercardIcon}
        alt="Mastercard"
        style={{ width: '30px', height: 'auto' }}
      />
    );
  } else if (formik.values.cardNumber.startsWith('4119')) {
    cardBrandIcon = (
      <img
        src={visaIcon}
        alt="Visa"
        style={{ width: '30px', height: 'auto' }}
      />
    );
  }

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '70vh',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#F4F6F8',
          borderRadius: '8px',
          padding: '100px',
          maxWidth: '500px',
          textAlign: 'center',
        }}
        component="form"
        onSubmit={formik.handleSubmit}
      >
        <Typography variant="h4" sx={{ mb: 4 }} style={{ color: 'black' }}>
          Update Payment Method
        </Typography>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            autoComplete="off"
            label="Card Number*"
            name="cardNumber"
            value={formik.values.cardNumber}
            onChange={(event) => {
              const { value } = event.target;
              let formattedCardNumber = value
                .replace(/\s/g, '') // Remove existing spaces from the card number
                .replace(/\D/g, '') // Remove non-digit characters
                .replace(/(\d{4})(?=\d)/g, '$1 '); // Add a space after every 4 digits (except for the last 4 digits)
              formik.setFieldValue('cardNumber', formattedCardNumber);
            }}
            error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
            helperText={formik.touched.cardNumber && formik.errors.cardNumber}
            placeholder="**** **** **** ****"
            inputProps={{
              maxLength: 19,
            }}
            InputProps={{
              endAdornment: cardBrandIcon,
            }}
            sx={{ width: '400px', mx: 'auto' }}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            fullWidth
            margin="normal"
            autoComplete="off"
            label="Name on card*"
            name="cardHolderName"
            value={formik.values.cardHolderName}
            onChange={(event) => {
              const { value } = event.target;
              const cardHolderNameOnlyText = value.replace(/[^A-Za-z ]/g, ''); // Remove non-alphabetic characters except spaces
              const capitalizedText = cardHolderNameOnlyText.toUpperCase(); // Capitalize the entire name
              formik.handleChange(event);
              formik.setFieldValue('cardHolderName', capitalizedText);
            }}
            error={
              formik.touched.cardHolderName &&
              Boolean(formik.errors.cardHolderName)
            }
            helperText={
              formik.touched.cardHolderName && formik.errors.cardHolderName
            }
            sx={{ width: '400px', mx: 'auto' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <TextField
            autoComplete="off"
            label="Expiration*"
            name="expirationDate"
            value={formik.values.expirationDate}
            onChange={(event) => {
              const { value } = event.target;
              const expirationDateOnlyDigits = value.replace(/\D/g, ''); // Remove non-digit characters
              let formattedExpirationDate = expirationDateOnlyDigits;

              if (expirationDateOnlyDigits.length > 2) {
                formattedExpirationDate = `${expirationDateOnlyDigits.slice(0, 2)}/${expirationDateOnlyDigits.slice(
                  2,
                  4
                )}`;
              }

              formik.handleChange(event);
              formik.setFieldValue('expirationDate', formattedExpirationDate);
            }}
            error={
              formik.touched.expirationDate &&
              Boolean(formik.errors.expirationDate)
            }
            helperText={
              formik.touched.expirationDate && formik.errors.expirationDate
            }
            placeholder="MM / YY"
            inputProps={{
              maxLength: 7,
            }}
            sx={{ width: '190px' }}
          />
          <TextField
            autoComplete="off"
            label="CVV*"
            name="cvv"
            value={formik.values.cvv}
            onChange={(event) => {
              const { value } = event.target;
              const cvvOnlyDigits = value.replace(/\D/g, ''); // Remove non-digit characters
              formik.handleChange(event);
              formik.setFieldValue('cvv', cvvOnlyDigits);
            }}
            error={formik.touched.cvv && Boolean(formik.errors.cvv)}
            helperText={formik.touched.cvv && formik.errors.cvv}
            placeholder="e.g.123"
            inputProps={{
              maxLength: 3,
            }}
            sx={{ width: '190px' }}
          />
        </Box>
        <Button
          width="400px"
          variant="contained"
          sx={{ mt: 6 }}
          type="submit"
        >
          Update Card for Payment
        </Button>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default UpdatePayment
