// import React, { useEffect, useState } from "react";
// import {
//     Container,
//     Grid,
//     Card,
//     CardContent,
//     Typography,
//     Button,
//     CircularProgress,
//     Box,
//     Modal,
//     Snackbar,
//     Alert,
//     IconButton,
//     Badge,
// } from "@mui/material";
// import { AccountBalance, Logout, Notifications, MonetizationOn } from '@mui/icons-material';
// import Axios from "axios";
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from "../../services/Authentication";

// const AdminPanel = () => {
//     const [deposits, setDeposits] = useState([]);
//     const [withdrawals, setWithdrawals] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const [openModal, setOpenModal] = useState(false);
//     const [currentImage, setCurrentImage] = useState("");
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//     const baseUrl = 'https://gold-blue-backend-zk1834563cke-84ddfc10b917.herokuapp.com';

//     const BASE_URL = `${baseUrl}/`;
//     const token = localStorage.getItem("jwt");
//     const navigate = useNavigate();

//     const auth = useAuth();

//     useEffect(() => {
//         const fetchTransactions = async () => {
//             try {
//                 const depositsRes = await Axios.get(`${baseUrl}/api/AllTransactions`);
//                 const withdrawalsRes = await Axios.get(`${baseUrl}/api/AllWithdrawals`);
//                 setDeposits(depositsRes.data);
//                 setWithdrawals(withdrawalsRes.data);
//                 setLoading(false);
//             } catch (err) {
//                 console.error(err);
//                 setError("Failed to fetch transactions.");
//                 setLoading(false);
//             }
//         };

//         fetchTransactions();
//         const intervalId = setInterval(fetchTransactions, 5000);

//         return () => clearInterval(intervalId);
//     }, []);

//     const handleLogout = async() => {
//         try {
//             await auth.logout();
//             navigate("/login");
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleConfirmDeposit = async (id) => {
//         try {
//             const response = await Axios.post(`${baseUrl}/api/deposits/confirm/${id}`);
//             if (response.status === 200) {
//                 await Axios.post(`${baseUrl}/api/notifications`, {
//                     user_id: response.data.user_id,
//                     message: `Your deposit of $${response.data.amount} has been confirmed.`,
//                     headers: { "x-access-token": token }
//                 });

//                 setSnackbarMessage("Notification sent to user!");
//                 setSnackbarSeverity("success");
//                 setSnackbarOpen(true);
//             }

//             setDeposits((prevDeposits) =>
//                 prevDeposits.map((deposit) =>
//                     deposit.id === id ? { ...deposit, status: "confirmed" } : deposit
//                 )
//             );
//         } catch (err) {
//             console.error(err);
//             setError("Failed to confirm deposit.");
//         }
//     };

//     const handleConfirmWithdrawal = async (id) => {
//         try {
//             const response = await Axios.post(`${baseUrl}/api/withdraw/confirm/${id}`);

//             if (response.status === 200) {
//                 await Axios.post(`${baseUrl}/api/notifications`, {
//                     user_id: response.data.user_id,
//                     message: `Your withdrawal of $${response.data.amount} has been confirmed.`,
//                 });

//                 setSnackbarMessage("Notification sent to user!");
//                 setSnackbarSeverity("success");
//                 setSnackbarOpen(true);
//             }

//             setWithdrawals((prevWithdrawals) =>
//                 prevWithdrawals.map((withdrawal) =>
//                     withdrawal.id === id ? { ...withdrawal, status: "confirmed" } : withdrawal
//                 )
//             );
//         } catch (err) {
//             console.error(err);
//             setError("Failed to confirm withdrawal.");
//         }
//     };

//     const handleImageClick = (imagePath) => {
//         const fullImagePath = `${BASE_URL}${imagePath.replace(/\\/g, '/')}`;
//         setCurrentImage(fullImagePath);
//         setOpenModal(true);
//     };

//     const handleCloseModal = () => {
//         setOpenModal(false);
//         setCurrentImage("");
//     };

//     const handleSnackbarClose = () => {
//         setSnackbarOpen(false);
//     };

//     const totalConfirmedDeposits = deposits.filter(deposit => deposit.status === "confirmed").length;
//     const totalPendingDeposits = deposits.filter(deposit => deposit.status === "pending").length;
//     const totalConfirmedWithdrawals = withdrawals.filter(withdrawal => withdrawal.status === "confirmed").length;
//     const totalPendingWithdrawals = withdrawals.filter(withdrawal => withdrawal.status === "pending").length;

//     return (
//         <Container maxWidth="lg" sx={{ mt: 4 }}>
//             {/* Header */}
//             <Box sx={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 backgroundColor: '#f5f5f5',
//                 padding: 2,
//                 borderRadius: 2,
//                 mb: 4
//             }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <AccountBalance sx={{ fontSize: 40, mr: 2 }} color="primary" />
//                     <Typography variant="h4" fontWeight="bold">
//                         Admin Dashboard
//                     </Typography>
//                 </Box>

//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                     <Badge badgeContent={totalPendingDeposits + totalPendingWithdrawals} color="secondary">
//                         <Notifications color="action" />
//                     </Badge>
//                     <Button
//                         variant="contained"
//                         color="error"
//                         startIcon={<Logout />}
//                         onClick={handleLogout}
//                         sx={{ ml: 2 }}
//                     >
//                         Logout
//                     </Button>
//                 </Box>
//             </Box>

//             {/* Summary Section */}
//             <Grid container spacing={4} sx={{ mb: 4 }}>
//                 <Grid item xs={12} md={6}>
//                     <Card sx={{ backgroundColor: '#e3f2fd' }}>
//                         <CardContent>
//                             <Typography variant="h6" fontWeight="bold">
//                                 Confirmed Deposits
//                             </Typography>
//                             <Typography variant="h4" color="primary">
//                                 {totalConfirmedDeposits}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                     <Card sx={{ backgroundColor: '#fff3e0' }}>
//                         <CardContent>
//                             <Typography variant="h6" fontWeight="bold">
//                                 Pending Deposits
//                             </Typography>
//                             <Typography variant="h4" color="green">
//                                 {totalPendingDeposits}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                     <Card sx={{ backgroundColor: '#e8f5e9' }}>
//                         <CardContent>
//                             <Typography variant="h6" fontWeight="bold">
//                                 Confirmed Withdrawals
//                             </Typography>
//                             <Typography variant="h4" color="success">
//                                 {totalConfirmedWithdrawals}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>

//                 <Grid item xs={12} md={6}>
//                     <Card sx={{ backgroundColor: '#ffebee' }}>
//                         <CardContent>
//                             <Typography variant="h6" fontWeight="bold">
//                                 Pending Withdrawals
//                             </Typography>
//                             <Typography variant="h4" color="error">
//                                 {totalPendingWithdrawals}
//                             </Typography>
//                         </CardContent>
//                     </Card>
//                 </Grid>
//             </Grid>

//             {loading ? (
//                 <CircularProgress />
//             ) : error ? (
//                 <Typography color="error">{error}</Typography>
//             ) : (
//                 <Grid container spacing={4}>
//                     <Grid item xs={12} md={6}>
//                         <Typography variant="h5" gutterBottom>
//                             Confirmed Deposits
//                         </Typography>
//                         <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
//                             {deposits
//                                 .filter((deposit) => deposit.status === "confirmed")
//                                 .map((deposit) => (
//                                     <Card elevation={4} key={deposit.id} sx={{ mb: 2 }}>
//                                         <CardContent>
//                                             <Typography variant="h6" fontWeight="bold">
//                                                 Deposit ID: {deposit.id}
//                                             </Typography>
//                                             <Typography>User ID: {deposit.user_id}</Typography>
//                                             <Typography>Amount: ${deposit.amount}</Typography>
//                                             <Typography>Status: {deposit.status}</Typography>
//                                             <Typography>Pending sent on: {new Date(deposit.created_at).toLocaleString()}</Typography>
//                                         </CardContent>
//                                     </Card>
//                                 ))}
//                         </Box>
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <Typography variant="h5" gutterBottom>
//                             Pending Deposits
//                         </Typography>
//                         <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
//                             {deposits
//                                 .filter((deposit) => deposit.status === "pending")
//                                 .map((deposit) => (
//                                     <Card elevation={4} key={deposit.id} sx={{ mb: 2 }}>
//                                         <CardContent>
//                                             <Typography variant="h6" fontWeight="bold">
//                                                 Deposit ID: {deposit.id}
//                                             </Typography>
//                                             <Typography>User ID: {deposit.user_id}</Typography>
//                                             <Typography>Amount: ${deposit.amount}</Typography>
//                                             {/* <Typography>Image: {deposit.image_path}</Typography> */}
//                                             <Typography>Status: {deposit.status}</Typography>
//                                             <Typography>
//                                             Image:
//                                             <Button
//                                                 onClick={() => handleImageClick(`sftp://5c9ae6570494054389f53e4acdc56a@sparkling-water-50295.sftptogo.com/browser${deposit.image_path}`)}
//                                                 sx={{ ml: 1, textDecoration: 'underline' }}
//                                             >
//                                                 View Image
//                                             </Button>
//                                         </Typography>
//                                             <Button
//                                                 variant="contained"
//                                                 color="primary"
//                                                 onClick={() => handleConfirmDeposit(deposit.id)}
//                                                 sx={{ mt: 2 }}
//                                             >
//                                                 Confirm Deposit
//                                             </Button>
//                                         </CardContent>
//                                     </Card>
//                                 ))}
//                         </Box>
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <Typography variant="h5" gutterBottom>
//                             Confirmed Withdrawals
//                         </Typography>
//                         <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
//                             {withdrawals
//                                 .filter((withdrawal) => withdrawal.status === "confirmed")
//                                 .map((withdrawal) => (
//                                     <Card elevation={4} key={withdrawal.id} sx={{ mb: 2 }}>
//                                         <CardContent>
//                                             <Typography variant="h6" fontWeight="bold">
//                                                 Withdrawal ID: {withdrawal.id}
//                                             </Typography>
//                                             <Typography>User ID: {withdrawal.user_id}</Typography>
//                                             <Typography>Amount: ${withdrawal.amount}</Typography>
//                                             <Typography>Status: {withdrawal.status}</Typography>
//                                             <Typography>Pending sent on: {new Date(withdrawal.created_at).toLocaleString()}</Typography>
//                                         </CardContent>
//                                     </Card>
//                                 ))}
//                         </Box>
//                     </Grid>

//                     <Grid item xs={12} md={6}>
//                         <Typography variant="h5" gutterBottom>
//                             Pending Withdrawals
//                         </Typography>
//                         <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
//                             {withdrawals
//                                 .filter((withdrawal) => withdrawal.status === "pending")
//                                 .map((withdrawal) => (
//                                     <Card elevation={4} key={withdrawal.id} sx={{ mb: 2 }}>
//                                         <CardContent>
//                                             <Typography variant="h6" fontWeight="bold">
//                                                 Withdrawal ID: {withdrawal.id}
//                                             </Typography>
//                                             <Typography>User ID: {withdrawal.user_id}</Typography>
//                                             <Typography>Amount: ${withdrawal.amount}</Typography>
//                                             <Typography>Status: {withdrawal.status}</Typography>
//                                             <Button
//                                                 variant="contained"
//                                                 color="primary"
//                                                 onClick={() => handleConfirmWithdrawal(withdrawal.id)}
//                                                 sx={{ mt: 2 }}
//                                             >
//                                                 Confirm Withdrawal
//                                             </Button>
//                                         </CardContent>
//                                     </Card>
//                                 ))}
//                         </Box>
//                     </Grid>
//                 </Grid>
//             )}

//             <Modal open={openModal} onClose={handleCloseModal}>
//                 <Box
//                     sx={{
//                         position: "absolute",
//                         top: "50%",
//                         left: "50%",
//                         transform: "translate(-50%, -50%)",
//                         width: 400,
//                         bgcolor: "background.paper",
//                         boxShadow: 24,
//                         p: 4,
//                     }}
//                 >
//                     <img src={currentImage} alt="Full View" style={{ width: "100%" }} />
//                 </Box>
//             </Modal>

//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={handleSnackbarClose}
//             >
//                 <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </Container>
//     );
// };

// export default AdminPanel;

import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Box,
  Modal,
  Snackbar,
  Alert,
  IconButton,
  Badge,
} from "@mui/material";
import { AccountBalance, Logout, Notifications } from "@mui/icons-material";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../services/Authentication";

const AdminPanel = () => {
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const baseUrl =
    "https://gold-blue-backend-zk1834563cke-84ddfc10b917.herokuapp.com";
  const BASE_URL = `${baseUrl}/`;
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const auth = useAuth();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const depositsRes = await Axios.get(`${baseUrl}/api/AllTransactions`);
        const withdrawalsRes = await Axios.get(`${baseUrl}/api/AllWithdrawals`);
        setDeposits(depositsRes.data);
        setWithdrawals(withdrawalsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch transactions.");
        setLoading(false);
      }
    };

    fetchTransactions();
    const intervalId = setInterval(fetchTransactions, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmDeposit = async (id) => {
    try {
      const response = await Axios.post(
        `${baseUrl}/api/deposits/confirm/${id}`
      );
      if (response.status === 200) {
        await Axios.post(`${baseUrl}/api/notifications`, {
          user_id: response.data.user_id,
          message: `Your deposit of ₱${response.data.amount} has been confirmed.`,
          headers: { "x-access-token": token },
        });

        setSnackbarMessage("Notification sent to user!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }

      setDeposits((prevDeposits) =>
        prevDeposits.map((deposit) =>
          deposit.id === id ? { ...deposit, status: "confirmed" } : deposit
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to confirm deposit.");
    }
  };

  const handleConfirmWithdrawal = async (id) => {
    try {
      const response = await Axios.post(
        `${baseUrl}/api/withdraw/confirm/${id}`
      );

      if (response.status === 200) {
        await Axios.post(`${baseUrl}/api/notifications`, {
          user_id: response.data.user_id,
          message: `Your withdrawal of ₱${response.data.amount} has been confirmed.`,
        });

        setSnackbarMessage("Notification sent to user!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      }

      setWithdrawals((prevWithdrawals) =>
        prevWithdrawals.map((withdrawal) =>
          withdrawal.id === id
            ? { ...withdrawal, status: "confirmed" }
            : withdrawal
        )
      );
    } catch (err) {
      console.error(err);
      setError("Failed to confirm withdrawal.");
    }
  };

  const handleImageClick = (imagePath) => {
    const fullImagePath = `${baseUrl}/api/images/${imagePath.split('/').pop()}`;
    setCurrentImage(fullImagePath);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentImage("");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const totalConfirmedDeposits = deposits.filter(
    (deposit) => deposit.status === "confirmed"
  ).length;
  const totalPendingDeposits = deposits.filter(
    (deposit) => deposit.status === "pending"
  ).length;
  const totalConfirmedWithdrawals = withdrawals.filter(
    (withdrawal) => withdrawal.status === "confirmed"
  ).length;
  const totalPendingWithdrawals = withdrawals.filter(
    (withdrawal) => withdrawal.status === "pending"
  ).length;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          padding: 2,
          borderRadius: 2,
          mb: 4,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <AccountBalance sx={{ fontSize: 40, mr: 2 }} color="primary" />
          <Typography variant="h4" fontWeight="bold">
            Admin Dashboard
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Badge
            badgeContent={totalPendingDeposits + totalPendingWithdrawals}
            color="secondary"
          >
            <Notifications color="action" />
          </Badge>
          <Button
            variant="contained"
            color="error"
            startIcon={<Logout />}
            onClick={handleLogout}
            sx={{ ml: 2 }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Summary Section */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#e3f2fd" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Confirmed Deposits
              </Typography>
              <Typography variant="h4" color="primary">
                {totalConfirmedDeposits}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#fff3e0" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Pending Deposits
              </Typography>
              <Typography variant="h4" color="green">
                {totalPendingDeposits}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#e8f5e9" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Confirmed Withdrawals
              </Typography>
              <Typography variant="h4" color="success">
                {totalConfirmedWithdrawals}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: "#ffebee" }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                Pending Withdrawals
              </Typography>
              <Typography variant="h4" color="error">
                {totalPendingWithdrawals}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Confirmed Deposits
            </Typography>
            <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
              {deposits
                .filter((deposit) => deposit.status === "confirmed")
                .map((deposit) => (
                  <Card elevation={4} key={deposit.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        Deposit ID: {deposit.id}
                      </Typography>
                      <Typography>User ID: {deposit.user_id}</Typography>
                      <Typography>Amount: ₱{deposit.amount}</Typography>
                      <Typography>Status: {deposit.status}</Typography>
                      <Typography>
                        Pending sent on:{" "}
                        {new Date(deposit.created_at).toLocaleString()}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Pending Deposits
            </Typography>
            <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
            {deposits
                .filter((deposit) => deposit.status === "pending")
                .map((deposit) => (
                  <Card elevation={4} key={deposit.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        Deposit ID: {deposit.id}
                      </Typography>
                      <Typography>User ID: {deposit.user_id}</Typography>
                      <Typography>Amount: ₱{deposit.amount}</Typography>
                      <Typography>Status: {deposit.status}</Typography>
                      <Typography>
                        Pending sent on:{" "}
                        {new Date(deposit.created_at).toLocaleString()}
                      </Typography>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 1 }}
                        onClick={() => handleConfirmDeposit(deposit.id)}
                      >
                        Confirm Deposit
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        sx={{ mt: 1, ml: 1 }}
                        onClick={() => handleImageClick(deposit.image_path)}
                      >
                        View Image
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Confirmed Withdrawals
            </Typography>
            <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
              {withdrawals
                .filter((withdrawal) => withdrawal.status === "confirmed")
                .map((withdrawal) => (
                  <Card elevation={4} key={withdrawal.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        Withdrawal ID: {withdrawal.id}
                      </Typography>
                      <Typography>User ID: {withdrawal.user_id}</Typography>
                      <Typography>Amount: ₱{withdrawal.amount}</Typography>
                      <Typography>Status: {withdrawal.status}</Typography>
                      <Typography>Method: {withdrawal.method}</Typography>
                      <Typography>
                        Account:{" "}
                        {
                          withdrawal.method === "trx"
                            ? withdrawal.wallet_key // Display wallet key for TRX
                            : `${withdrawal.account_name} (Acc #: ${withdrawal.account_number})` // Display account name and number for GCash or GOTYME
                        }
                      </Typography>
                      <Typography>
                        Requested on:{" "}
                        {withdrawal.date
                          ? new Date(
                              withdrawal.date.replace(" ", "T")
                            ).toLocaleString()
                          : "N/A"}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Pending Withdrawals
            </Typography>
            <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
              {withdrawals
                .filter((withdrawal) => withdrawal.status === "pending")
                .map((withdrawal) => (
                  <Card elevation={4} key={withdrawal.id} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        Withdrawal ID: {withdrawal.id}
                      </Typography>
                      <Typography>User ID: {withdrawal.user_id}</Typography>
                      <Typography>Amount: ₱{withdrawal.amount}</Typography>
                      <Typography>Status: {withdrawal.status}</Typography>
                      <Typography>Method: {withdrawal.method}</Typography>
                      <Typography>
                        Account:{" "}
                        {
                          withdrawal.method === "trx"
                            ? withdrawal.wallet_key // Display wallet key for TRX
                            : `${withdrawal.account_name} (Acc #: ${withdrawal.account_number})` // Display account name and number for GCash or GOTYME
                        }
                      </Typography>
                      <Typography>
                        Requested on:{" "}
                        {withdrawal.date
                          ? new Date(
                              withdrawal.date.replace(" ", "T")
                            ).toLocaleString()
                          : "N/A"}
                      </Typography>

                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleConfirmWithdrawal(withdrawal.id)}
                        sx={{ mt: 1 }}
                      >
                        Confirm
                      </Button>
                    </CardContent>
                  </Card>
                ))}
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Modal for displaying images */}
      <Modal open={openModal} onClose={handleCloseModal}>
         <Box
           sx={{
          position: "absolute",
           top: "50%",
           left: "50%",
          transform: "translate(-50%, -50%)",
           bgcolor: "background.paper",
           boxShadow: 24,
            p: 4,
            maxHeight: "90vh",
            maxWidth: "90vw",
             overflowY: "auto",
           }}
         >
           <img
             src={currentImage}
            alt="Deposit Proof"
         style={{ maxWidth: "100%", maxHeight: "100%" }}
           />
         </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AdminPanel;


// import React, { useEffect, useState } from "react";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   CircularProgress,
//   Box,
//   Modal,
//   Snackbar,
//   Alert,
//   IconButton,
//   Badge,
// } from "@mui/material";
// import { AccountBalance, Logout, Notifications } from "@mui/icons-material";
// import Axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../services/Authentication";

// const AdminPanel = () => {
//   const [deposits, setDeposits] = useState([]);
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [openModal, setOpenModal] = useState(false);
//   const [currentImage, setCurrentImage] = useState("");
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState("");
//   const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//   const baseUrl =
//     "https://gold-blue-backend-zk1834563cke-84ddfc10b917.herokuapp.com";
//   const BASE_URL = `${baseUrl}/`;
//   const token = localStorage.getItem("jwt");
//   const navigate = useNavigate();

//   const auth = useAuth();

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       try {
//         const depositsRes = await Axios.get(`${baseUrl}/api/AllTransactions`);
//         const withdrawalsRes = await Axios.get(`${baseUrl}/api/AllWithdrawals`);
//         setDeposits(depositsRes.data);
//         setWithdrawals(withdrawalsRes.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch transactions.");
//         setLoading(false);
//       }
//     };

//     fetchTransactions();
//     const intervalId = setInterval(fetchTransactions, 5000);

//     return () => clearInterval(intervalId);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await auth.logout();
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleConfirmDeposit = async (id) => {
//     try {
//       const response = await Axios.post(
//         `${baseUrl}/api/deposits/confirm/${id}`
//       );
//       if (response.status === 200) {
//         await Axios.post(`${baseUrl}/api/notifications`, {
//           user_id: response.data.user_id,
//           message: `Your deposit of ₱${response.data.amount} has been confirmed.`,
//           headers: { "x-access-token": token },
//         });

//         setSnackbarMessage("Notification sent to user!");
//         setSnackbarSeverity("success");
//         setSnackbarOpen(true);
//       }

//       setDeposits((prevDeposits) =>
//         prevDeposits.map((deposit) =>
//           deposit.id === id ? { ...deposit, status: "confirmed" } : deposit
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setError("Failed to confirm deposit.");
//     }
//   };

//   const handleConfirmWithdrawal = async (id) => {
//     try {
//       const response = await Axios.post(
//         `${baseUrl}/api/withdraw/confirm/${id}`
//       );

//       if (response.status === 200) {
//         await Axios.post(`${baseUrl}/api/notifications`, {
//           user_id: response.data.user_id,
//           message: `Your withdrawal of ₱${response.data.amount} has been confirmed.`,
//         });

//         setSnackbarMessage("Notification sent to user!");
//         setSnackbarSeverity("success");
//         setSnackbarOpen(true);
//       }

//       setWithdrawals((prevWithdrawals) =>
//         prevWithdrawals.map((withdrawal) =>
//           withdrawal.id === id
//             ? { ...withdrawal, status: "confirmed" }
//             : withdrawal
//         )
//       );
//     } catch (err) {
//       console.error(err);
//       setError("Failed to confirm withdrawal.");
//     }
//   };

//   const handleImageClick = (imagePath) => {
//     const fullImagePath = `${baseUrl}/api/images/${imagePath.split('/').pop()}`;
//     setCurrentImage(fullImagePath);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setOpenModal(false);
//     setCurrentImage("");
//   };

//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   const totalConfirmedDeposits = deposits.filter(
//     (deposit) => deposit.status === "confirmed"
//   ).length;
//   const totalPendingDeposits = deposits.filter(
//     (deposit) => deposit.status === "pending"
//   ).length;
//   const totalConfirmedWithdrawals = withdrawals.filter(
//     (withdrawal) => withdrawal.status === "confirmed"
//   ).length;
//   const totalPendingWithdrawals = withdrawals.filter(
//     (withdrawal) => withdrawal.status === "pending"
//   ).length;

//   return (
//     <Container maxWidth="lg" sx={{ mt: 4 }}>
//       {/* Header */}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           backgroundColor: "#f5f5f5",
//           padding: 2,
//           borderRadius: 2,
//           mb: 4,
//         }}
//       >
//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <AccountBalance sx={{ fontSize: 40, mr: 2 }} color="primary" />
//           <Typography variant="h4" fontWeight="bold">
//             Admin Dashboard
//           </Typography>
//         </Box>

//         <Box sx={{ display: "flex", alignItems: "center" }}>
//           <Badge
//             badgeContent={totalPendingDeposits + totalPendingWithdrawals}
//             color="secondary"
//           >
//             <Notifications color="action" />
//           </Badge>
//           <Button
//             variant="contained"
//             color="error"
//             startIcon={<Logout />}
//             onClick={handleLogout}
//             sx={{ ml: 2 }}
//           >
//             Logout
//           </Button>
//         </Box>
//       </Box>

//       {/* Summary Section */}
//       <Grid container spacing={4} sx={{ mb: 4 }}>
//         <Grid item xs={12} md={6}>
//           <Card sx={{ backgroundColor: "#e3f2fd" }}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold">
//                 Confirmed Deposits
//               </Typography>
//               <Typography variant="h4" color="primary">
//                 {totalConfirmedDeposits}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card sx={{ backgroundColor: "#fff3e0" }}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold">
//                 Pending Deposits
//               </Typography>
//               <Typography variant="h4" color="green">
//                 {totalPendingDeposits}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card sx={{ backgroundColor: "#e8f5e9" }}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold">
//                 Confirmed Withdrawals
//               </Typography>
//               <Typography variant="h4" color="success">
//                 {totalConfirmedWithdrawals}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <Card sx={{ backgroundColor: "#ffebee" }}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold">
//                 Pending Withdrawals
//               </Typography>
//               <Typography variant="h4" color="error">
//                 {totalPendingWithdrawals}
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {loading ? (
//         <CircularProgress />
//       ) : error ? (
//         <Typography color="error">{error}</Typography>
//       ) : (
//         <Grid container spacing={4}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" gutterBottom>
//               Confirmed Deposits
//             </Typography>
//             <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
//               {deposits
//                 .filter((deposit) => deposit.status === "confirmed")
//                 .map((deposit) => (
//                   <Card elevation={4} key={deposit.id} sx={{ mb: 2 }}>
//                     <CardContent>
//                       <Typography variant="h6" fontWeight="bold">
//                         Deposit ID: {deposit.id}
//                       </Typography>
//                       <Typography>User ID: {deposit.user_id}</Typography>
//                       <Typography>Amount: ₱{deposit.amount}</Typography>
//                       <Typography>Status: {deposit.status}</Typography>
//                       <Typography>
//                         Pending sent on:{" "}
//                         {new Date(deposit.created_at).toLocaleString()}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 ))}
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" gutterBottom>
//               Pending Deposits
//             </Typography>
//             <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
//               {deposits
//                 .filter((deposit) => deposit.status === "pending")
//                 .map((deposit) => (
//                   <Card elevation={4} key={deposit.id} sx={{ mb: 2 }}>
//                     <CardContent>
//                       <Typography variant="h6" fontWeight="bold">
//                         Deposit ID: {deposit.id}
//                       </Typography>
//                       <Typography>User ID: {deposit.user_id}</Typography>
//                       <Typography>Amount: ₱{deposit.amount}</Typography>
//                       <Typography>Status: {deposit.status}</Typography>
//                       <Typography>
//                         Pending sent on:{" "}
//                         {new Date(deposit.created_at).toLocaleString()}
//                       </Typography>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         sx={{ mt: 1 }}
//                         onClick={() => handleConfirmDeposit(deposit.id)}
//                       >
//                         Confirm Deposit
//                       </Button>
//                       <Button
//                         variant="contained"
//                         color="secondary"
//                         sx={{ mt: 1, ml: 1 }}
//                         onClick={() => handleImageClick(deposit.image_path)}
//                       >
//                         View Image
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" gutterBottom>
//               Confirmed Withdrawals
//             </Typography>
//             <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
//               {withdrawals
//                 .filter((withdrawal) => withdrawal.status === "confirmed")
//                 .map((withdrawal) => (
//                   <Card elevation={4} key={withdrawal.id} sx={{ mb: 2 }}>
//                     <CardContent>
//                       <Typography variant="h6" fontWeight="bold">
//                         Withdrawal ID: {withdrawal.id}
//                       </Typography>
//                       <Typography>User ID: {withdrawal.user_id}</Typography>
//                       <Typography>Amount: ₱{withdrawal.amount}</Typography>
//                       <Typography>Status: {withdrawal.status}</Typography>
//                     </CardContent>
//                   </Card>
//                 ))}
//             </Box>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" gutterBottom>
//               Pending Withdrawals
//             </Typography>
//             <Box sx={{ maxHeight: 400, overflowY: "auto" }}>
//               {withdrawals
//                 .filter((withdrawal) => withdrawal.status === "pending")
//                 .map((withdrawal) => (
//                   <Card elevation={4} key={withdrawal.id} sx={{ mb: 2 }}>
//                     <CardContent>
//                       <Typography variant="h6" fontWeight="bold">
//                         Withdrawal ID: {withdrawal.id}
//                       </Typography>
//                       <Typography>User ID: {withdrawal.user_id}</Typography>
//                       <Typography>Amount: ₱{withdrawal.amount}</Typography>
//                       <Typography>Status: {withdrawal.status}</Typography>
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         sx={{ mt: 1 }}
//                         onClick={() => handleConfirmWithdrawal(withdrawal.id)}
//                       >
//                         Confirm Withdrawal
//                       </Button>
//                     </CardContent>
//                   </Card>
//                 ))}
//             </Box>
//           </Grid>
//         </Grid>
//       )}

//       {/* Image Modal */}
//       <Modal open={openModal} onClose={handleCloseModal}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             maxHeight: "90vh",
//             maxWidth: "90vw",
//             overflowY: "auto",
//           }}
//         >
//           <img
//             src={currentImage}
//             alt="Deposit Proof"
//             style={{ maxWidth: "100%", maxHeight: "100%" }}
//           />
//         </Box>
//       </Modal>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={handleSnackbarClose}
//       >
//         <Alert
//           onClose={handleSnackbarClose}
//           severity={snackbarSeverity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default AdminPanel;

