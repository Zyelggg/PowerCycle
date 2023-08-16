import React, { useEffect, useState } from 'react';
import './styles/Home.css';
import { useLocation } from 'react-router'
import { useNavigate } from 'react-router-dom';
import ebike from './images/Ebike.png';
import GooglePayButton from '@google-pay/button-react';
import { Container, Typography, Box, Button, Card, CardMedia, CardContent, Divider, CardHeader } from '@mui/material';
import { BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import instagram from './images/instagram.png'
import facebook from './images/facebook.png'
import twitter from './images/twitter.png'
import logo from './images/powerlogo.png';
import http from "../http";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { loadStripe } from '@stripe/stripe-js';
import ReviewsIcon from '@mui/icons-material/Reviews';

function RideComplete() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState({});
  const [isImageShrunken, setIsImageShrunken] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const userid = queryParams.get('userId');
  const serialno = queryParams.get('serialno');
  const mileage = queryParams.get('mileage');
  const electricity = queryParams.get('electricity');
  const duration = queryParams.get('duration');

  const durationInMinutes = parseInt(duration);

  // Calculate the amount based on $3 per hour
  let amount = 3.0 * (durationInMinutes / 60);

  if (durationInMinutes < 60) {
    amount = 3.0; // Minimum charge of $3
  } else {
    // Calculate the remaining minutes after removing complete hours
    const remainingMinutes = durationInMinutes % 60;

    // If there are remaining minutes, add an extra $3
    if (remainingMinutes > 0) {
      amount += 3.0;
    }
  }

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      http.get("/user/auth")
        .then((res) => {
          setUser(res.data.userid);
          fetch(`http://localhost:3001/user/userdetails/${res.data.userid}`)
            .then((res) => res.json())
            .then((data) => {
              setUserDetail(data);
            });
        });
    }

  }, []);

  return (
    <>
      <Box className="landing-banner2">
        <Container className='landing-content'>
          <Typography variant='h3'>Bicycle Rental</Typography>
        </Container>
      </Box>

      <Card style={{ borderRadius: "0", padding: "15px" }}>
        <CardHeader
          title="Your Report"
          subheader="You can view your stats for your ride below"
          action={
            <Button variant="outlined" aria-label="Review" onClick={() => navigate('/reviews')} startIcon={<ReviewsIcon />}>
              Review
            </Button>
          }
        />
        <CardMedia component="img" height="300" image={ebike} alt="Bike" style={{ width: "unset", margin: "0 auto" }} />
        <CardContent>
          <Container>
            <Typography gutterBottom variant="h5">Your Performance</Typography>
            <Typography variant="subtitle1" color="text.secondary">Ride Duration: {duration} mins</Typography>
            <Typography variant="subtitle1" color="text.secondary">Mileage: {mileage} km</Typography>
            <Typography variant="subtitle1" color="text.secondary">Electricity {electricity}</Typography>
            <Typography variant="subtitle1" color="text.secondary">Bike Serial: {serialno}</Typography>
          </Container>

          <Box sx={{ height: 10 }} />
          <Divider />
          <Box sx={{ height: 10 }} />

          <Container>
            <Typography gutterBottom variant="h5">Payment Details</Typography>
            <Typography variant="subtitle1" color="text.secondary">Card: 1111-1111-1111-1111</Typography>
            <Typography variant="subtitle1" color="text.secondary">Amount Payable: ${parseFloat(amount)}</Typography>
          </Container>

          <Box sx={{ height: 10 }} />
          <Divider />
          <Box sx={{ height: 10 }} />

          <Container>
            <Typography variant="body1">Pay With</Typography>
            <Container className='checkoutContainer'>
              <GooglePayButton
                className='checkoutBtn'
                style={{ height: "45px" }}
                environment="TEST"
                buttonColor="black"
                buttonLocale="en"
                buttonSizeMode="fill"
                buttonType="pay"
                paymentRequest={{
                  apiVersion: 2,
                  apiVersionMinor: 0,
                  allowedPaymentMethods: [
                    {
                      type: 'CARD',
                      parameters: {
                        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                        allowedCardNetworks: ['MASTERCARD', 'VISA'],
                      },
                      tokenizationSpecification: {
                        type: 'PAYMENT_GATEWAY',
                        parameters: {
                          gateway: 'example',
                          gatewayMerchantId: 'exampleGatewayMerchantId',
                        },
                      },
                    },
                  ],
                  merchantInfo: { merchantId: '12345678901234567890', merchantName: 'PowerCycle', },
                  transactionInfo: {
                    displayItems: [{ label: "Subtotal", type: "SUBTOTAL", price: String(amount) }],
                    countryCode: 'US',
                    currencyCode: "USD",
                    totalPriceStatus: "FINAL",
                    totalPrice: String(amount),
                    totalPriceLabel: "Total"
                  },
                  callbackIntents: ['PAYMENT_AUTHORIZATION'],
                }}
                onLoadPaymentData={paymentRequest => {
                  console.log('Success', paymentRequest);
                }}
                onPaymentAuthorized={paymentData => ({
                  transactionState: 'SUCCESS',
                })}

              />
              <PayPalScriptProvider options={{ clientId: "test" }}>
                <PayPalButtons style={{ color: "blue", layout: "horizontal", tagline: false, label: "pay" }} />
              </PayPalScriptProvider>
            </Container>
          </Container>
        </CardContent>
      </Card>


      <div style={{ textAlign: 'left', padding: "60px 30px" }}>
        <Typography variant='h4' style={{ marginBottom: "0px" }}>Stuck?</Typography>
        <Typography variant='subtitle1'>Talk to our customer helpline</Typography>
        <Button variant='outlined' style={{ backgroundColor: "white", marginTop: "20px" }} onClick={() => navigate("/faq")}>
          Chat with Us
        </Button>
      </div >
    </>
  );
}

export default RideComplete;
