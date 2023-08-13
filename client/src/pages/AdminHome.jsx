import * as React from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
  },
  tableContainer: {
    flex: 1,
    width: "100%",
    maxWidth: "800px",
    marginTop: "20px",
  },
  table: {
    minWidth: 650,
  },
  workingCondition: {
    color: "#ADD980",
  },
  damagedCondition: {
    color: "#CB0029",
  },
  rentedStatus: {
    color: "#F2C086",
  },
  availableStatus: {
    color: "#ADD980",
  },
  maintenanceStatus: {
    color: "#FF5E5E",
  },
  repairStatus: {
    color: "#FFB157",
  }
};

function AdminHome() {
  // Dummy data for bike rentals
  const bikeRentals = [
    {
      id: 1,
      bikeModel: "Powerflow X",
      customer: "John Doe",
      condition: "Working",
      price: "3$/hr",
      dateTime: "2023-08-13 10:00 AM",
      status: "Rented",
    },
    {
      id: 2,
      bikeModel: "Powerflow X",
      customer: "Jane Smith",
      condition: "Working",
      price: "3$/hr",
      dateTime: "2023-08-13 11:30 AM",
      status: "Rented",
    },
    {
      id: 3,
      bikeModel: "Powerflow X",
      customer: "Howard Prinksy",
      condition: "Working",
      price: "3$/hr",
      dateTime: "2023-08-13 11:47 AM",
      status: "Rented",
    },
    {
      id: 4,
      bikeModel: "Powerflow X",
      customer: "-",
      condition: "Working",
      price: "3$/hr",
      dateTime: "-",
      status: "Available",
    },
    {
      id: 5,
      bikeModel: "Powerflow X",
      customer: "-",
      condition: "Working",
      price: "3$/hr",
      dateTime: "-",
      status: "Maintenance",
    },
    {
      id: 6,
      bikeModel: "Powerflow X",
      customer: "-",
      condition: "Damaged",
      price: "3$/hr",
      dateTime: "-",
      status: "Repair",
    },
    {
      id: 7,
      bikeModel: "Powerflow X",
      customer: "-",
      condition: "Damaged",
      price: "3$/hr",
      dateTime: "-",
      status: "Repair",
    },
    
  ];

  return (
    <Box sx={styles.container}>
      <Typography variant="h4" gutterBottom>
        Bike Rental Service Dashboard
      </Typography>
      <Box sx={styles.tableContainer}>
        <TableContainer component={Paper}>
          <Table sx={styles.table}>
            <TableHead>
              <TableRow>
                <TableCell>Bike Model</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Bike Condition</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Date and Time</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bikeRentals.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell>{rental.bikeModel}</TableCell>
                  <TableCell>{rental.id}</TableCell>
                  <TableCell>{rental.customer}</TableCell>
                  <TableCell
                    sx={
                      rental.condition === "Working"
                        ? styles.workingCondition
                        : styles.damagedCondition
                    }
                  >
                    {rental.condition}
                  </TableCell>
                  <TableCell>{rental.price}</TableCell>
                  <TableCell>{rental.dateTime}</TableCell>
                  <TableCell
                    sx={
                      rental.status === "Rented"
                        ? styles.rentedStatus
                        : rental.status === "Available"
                        ? styles.availableStatus
                        : rental.status === "Maintenance"
                        ? styles.maintenanceStatus
                        : styles.repairStatus
                    }
                  >
                    {rental.status}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default AdminHome;
