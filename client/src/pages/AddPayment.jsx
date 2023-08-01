import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const stripePromise = loadStripe("pk_test_51NRTi4HRP75r8WKdNGQWcqcD8M8VfxFvytFuC8ltE4UgAHvNFZnRZZ6uURIan5AmWhCT80SUrlQBG9nkTduap3RO00kqIkRwEY");

  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000",
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occurred.");
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
        onChange={(e) => setEmail(e.target.value)}
      />
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

// import React from 'react';
// import { Box, Typography, TextField, Button } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as yup from 'yup';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import http from '../http';

// import mastercardIcon from '../assets/Mastercard-logo.svg.png';
// import visaIcon from '../assets/Visa_2021.svg.png';
// import "../pages/styles/Payment.css"

// function AddPayment() {
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       cardNumber: '',
//       cardHolderName: '',
//       expirationDate: '',
//       cvv: '',
//     },
//     validationSchema: yup.object({
//       cardNumber: yup.string().required('Card number is required'),
//       cardHolderName: yup.string().required('Cardholder name is required'),
//       expirationDate: yup.string().required('Expiration date is required'),
//       cvv: yup.string().required('CVV is required'),
//     }),
//     onSubmit: (data) => {
//       http
//         .post('/addPayment', data)
//         .then((res) => {
//           console.log(res.data);
//           navigate('/paymentMethods');
//         })
//         .catch((err) => {
//           toast.error(err.response.data.message);
//         });
//     },
//   });

//   // Determine card brand based on the first 4 digits of the card number
//   let cardBrandIcon = null;
//   if (formik.values.cardNumber.startsWith('5264')) {
//     cardBrandIcon = (
//       <img
//         src={mastercardIcon}
//         alt="Mastercard"
//         style={{ width: '30px', height: 'auto' }}
//       />
//     );
//   } else if (formik.values.cardNumber.startsWith('4119')) {
//     cardBrandIcon = (
//       <img
//         src={visaIcon}
//         alt="Visa"
//         style={{ width: '30px', height: 'auto' }}
//       />
//     );
//   }

//   return (
//     <Box className="payment-container"
//       sx={{
//         marginTop: 8,
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         justifyContent: 'center',
//         minHeight: '70vh',
//       }}
//     >
//       <Box className="payment-form" 
//         sx={{
//           backgroundColor: '#F4F6F8',
//           borderRadius: '8px',
//           padding: '100px',
//           maxWidth: '500px',
//           textAlign: 'center',
//         }}
//         component="form"
//         onSubmit={formik.handleSubmit}
//       >
//         <Typography variant="h4" sx={{ mb: 4 }} style={{color: "black"}}>
//           Add Payment Method
//         </Typography>
//         <Box sx={{ mb: 2 }}>
//           <TextField
//             fullWidth
//             margin="normal"
//             autoComplete="off"
//             label="Card Number*"
//             name="cardNumber"
//             value={formik.values.cardNumber}
//             onChange={(event) => {
//               const { value } = event.target;
//               let formattedCardNumber = value
//                 .replace(/\s/g, '') // Remove existing spaces from the card number
//                 .replace(/\D/g, '') // Remove non-digit characters
//                 .replace(/(\d{4})(?=\d)/g, '$1 '); // Add a space after every 4 digits (except for the last 4 digits)
        
//               formik.setFieldValue('cardNumber', formattedCardNumber);
//             }}
//             error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
//             helperText={formik.touched.cardNumber && formik.errors.cardNumber}
//             placeholder="**** **** **** ****"
//             inputProps={{
//               maxLength: 19,
//             }}
//             InputProps={{
//               endAdornment: cardBrandIcon,
//             }}
//             sx={{ width: '400px', mx: 'auto' }}
//           />
//         </Box>
//         <Box sx={{ mb: 2 }}>
//           <TextField
//             fullWidth
//             margin="normal"
//             autoComplete="off"
//             label="Name on card*"
//             name="cardHolderName"
//             value={formik.values.cardHolderName}
//             onChange={(event) => {
//               const { value } = event.target;
//               const cardHolderNameOnlyText = value.replace(/[^A-Za-z ]/g, ''); // Remove non-alphabetic characters except spaces
//               const capitalizedText = cardHolderNameOnlyText.toUpperCase(); // Capitalize the entire name
//               formik.handleChange(event);
//               formik.setFieldValue('cardHolderName', capitalizedText);
//             }}
//             error={
//               formik.touched.cardHolderName &&
//               Boolean(formik.errors.cardHolderName)
//             }
//             helperText={
//               formik.touched.cardHolderName && formik.errors.cardHolderName
//             }
//             sx={{ width: '400px', mx: 'auto' }}
//           />
//         </Box>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
//           <TextField
//             autoComplete="off"
//             label="Expiration*"
//             name="expirationDate"
//             value={formik.values.expirationDate}
//             onChange={(event) => {
//               const { value } = event.target;
//               const expirationDateOnlyDigits = value.replace(/\D/g, ''); // Remove non-digit characters
//               let formattedExpirationDate = expirationDateOnlyDigits;

//               if (expirationDateOnlyDigits.length > 2) {
//                 formattedExpirationDate = `${expirationDateOnlyDigits.slice(0, 2)}/${expirationDateOnlyDigits.slice(2, 4)}`;
//               }

//               formik.handleChange(event);
//               formik.setFieldValue('expirationDate', formattedExpirationDate);
//             }}
//             error={formik.touched.expirationDate && Boolean(formik.errors.expirationDate)}
//             helperText={formik.touched.expirationDate && formik.errors.expirationDate}
//             placeholder="MM / YY"
//             inputProps={{
//               maxLength: 7,
//             }}
//             sx={{ width: '190px' }}
//           />
//           <TextField
//             autoComplete="off"
//             label="CVV*"
//             name="cvv"
//             value={formik.values.cvv}
//             onChange={(event) => {
//               const { value } = event.target;
//               const cvvOnlyDigits = value.replace(/\D/g, ''); // Remove non-digit characters
//               formik.handleChange(event);
//               formik.setFieldValue('cvv', cvvOnlyDigits);
//             }}
//             error={formik.touched.cvv && Boolean(formik.errors.cvv)}
//             helperText={formik.touched.cvv && formik.errors.cvv}
//             placeholder="e.g.123"
//             inputProps={{
//               maxLength: 3,
//             }}
//             sx={{ width: '190px' }} 
//           />
//         </Box>
//         <Button className="payment-button" width="400px" variant="contained" sx={{ mt: 6 }} type="submit">
//           Add Card for Payment
//         </Button>
//       </Box>
//       <ToastContainer />
//     </Box>
//   );
// }

