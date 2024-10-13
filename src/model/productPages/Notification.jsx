// import React, { useEffect, useState } from "react";
// import {
//     AppBar,
//     Toolbar,
//     Box,
//     Snackbar,
//     Alert,
//     Typography,
//     IconButton,
//     Card,
//     CardContent,
//     Avatar,
//     Fade
// } from "@mui/material";
// import { Info, Error, CheckCircle } from "@mui/icons-material";
// import ProductDrawer from "../../components/productComponents/ProductDrawer";
// import axios from 'axios';

// export default function Deposit() {
//     const [notifications, setNotifications] = useState([]);
//     const [snackbarOpen, setSnackbarOpen] = useState(false);
//     const [snackbarMessage, setSnackbarMessage] = useState("");
//     const [snackbarSeverity, setSnackbarSeverity] = useState("success");

//     const baseUrl = 'https://gold-blue-backend-zk1834563cke-84ddfc10b917.herokuapp.com';

//     useEffect(() => {
//         const fetchNotifications = async () => {
//             try {
//                 const token = localStorage.getItem("jwt");
//                 const response = await axios.get(`${baseUrl}/api/getNotifications`, {
//                     headers: { "x-access-token": token }
//                 });
//                 setNotifications(response.data);
//                 if (response.data.length > 0) {
//                     setSnackbarMessage("You have new notifications!");
//                     setSnackbarSeverity("info");
//                     setSnackbarOpen(true);
//                 }
//             } catch (error) {
//                 console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
//                 setSnackbarMessage("Failed to fetch notifications.");
//                 setSnackbarSeverity("error");
//                 setSnackbarOpen(true);
//             }
//         };

//         fetchNotifications();
//     }, []);

//     const handleSnackbarClose = () => {
//         setSnackbarOpen(false);
//     };

//     const getIcon = (severity) => {
//         switch (severity) {
//             case "success":
//                 return <CheckCircle sx={{ color: 'var(--icon-color)' }} />;
//             case "error":
//                 return <Error sx={{ color: 'var(--icon-color)' }} />;
//             case "info":
//                 return <Info sx={{ color: 'var(--icon-color)' }} />;
//             default:
//                 return <Info sx={{ color: 'var(--icon-color)' }} />;
//         }
//     };

//     return (
//         <Box>
//             <AppBar position="static" sx={{ backgroundColor: 'var(--button-color)' }}>
//                 <Toolbar>
//                     <ProductDrawer />
//                     <Typography variant="h6" sx={{ flexGrow: 1, color: 'var(--primary-text-color)' }}>
//                         Deposit
//                     </Typography>
//                 </Toolbar>
//             </AppBar>
//             <Toolbar />
//             <Box sx={{ padding: 2 }}>
//                 <Typography variant="h5" gutterBottom sx={{ color: 'var(--primary-text-color)' }}>
//                     Your Notifications
//                 </Typography>
//                 {notifications.length === 0 ? (
//                     <Typography sx={{ color: 'var(--primary-text-color)' }}>No new notifications</Typography>
//                 ) : (
//                     notifications.map((notification) => (
//                         <Fade in key={notification.id} timeout={500}>
//                             <Card sx={{
//                                 marginBottom: 2,
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 boxShadow: 3,
//                                 backgroundColor: 'var(--card-background-color)',
//                                 color: 'var(--primary-text-color)'
//                             }}>
//                                 <Avatar sx={{ backgroundColor: 'var(--button-color)', margin: 2 }}>
//                                     {getIcon(notification.severity)}
//                                 </Avatar>
//                                 <CardContent>
//                                     <Typography variant="body1">
//                                         {notification.message}
//                                     </Typography>
//                                     <Typography variant="caption" color="textSecondary">
//                                         {new Date(notification.created_at).toLocaleString()}
//                                     </Typography>
//                                 </CardContent>
//                             </Card>
//                         </Fade>
//                     ))
//                 )}
//             </Box>

//             <Snackbar
//                 open={snackbarOpen}
//                 autoHideDuration={6000}
//                 onClose={handleSnackbarClose}
//             >
//                 <Alert
//                     onClose={handleSnackbarClose}
//                     severity={snackbarSeverity}
//                     icon={getIcon(snackbarSeverity)}
//                     sx={{ backgroundColor: 'var(--modal-color)', color: 'var(--primary-text-color)', boxShadow: 3 }}
//                 >
//                     {snackbarMessage}
//                 </Alert>
//             </Snackbar>
//         </Box>
//     );
// }

import React, { useEffect, useState } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    Snackbar,
    Alert,
    Typography,
    Card,
    CardContent,
    Avatar,
    Fade
} from "@mui/material";
import { Info, Error, CheckCircle } from "@mui/icons-material";
import ProductDrawer from "../../components/productComponents/ProductDrawer";
import axios from 'axios';

export default function Deposit() {
    const [notifications, setNotifications] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");

    const baseUrl = 'https://gold-blue-backend-zk1834563cke-84ddfc10b917.herokuapp.com';

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem("jwt");
                const response = await axios.get(`${baseUrl}/api/getNotifications`, {
                    headers: { "x-access-token": token }
                });
                setNotifications(response.data);
                if (response.data.length > 0) {
                    setSnackbarMessage("You have new notifications!");
                    setSnackbarSeverity("info");
                    setSnackbarOpen(true);
                }
            } catch (error) {
                console.error("Error fetching notifications:", error.response ? error.response.data : error.message);
                setSnackbarMessage("Failed to fetch notifications.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            }
        };

        fetchNotifications();
    }, []);

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const getIcon = (severity) => {
        switch (severity) {
            case "success":
                return <CheckCircle sx={{ color: '#4CAF50' }} />;
            case "error":
                return <Error sx={{ color: '#F44336' }} />;
            case "info":
                return <Info sx={{ color: '#2196F3' }} />;
            default:
                return <Info sx={{ color: '#2196F3' }} />;
        }
    };

    return (
        <Box>
            <AppBar position="static" sx={{ backgroundColor: '#212121', boxShadow: 'none' }}>
                <Toolbar>
                    <ProductDrawer />
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#FFFFFF' }}>
                        Deposit
                    </Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Box sx={{ padding: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ color: '#424242', fontWeight: 'bold' }}>
                    Your Notifications
                </Typography>
                {notifications.length === 0 ? (
                    <Typography sx={{ color: '#9E9E9E' }}>No new notifications</Typography>
                ) : (
                    // Reverse the notifications array to display new notifications at the top
                    [...notifications].reverse().map((notification) => (
                        <Fade in key={notification.id} timeout={500}>
                            <Card sx={{
                                marginBottom: 3,
                                display: 'flex',
                                alignItems: 'center',
                                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                                background: 'linear-gradient(135deg, #f5f5f5 30%, #eeeeee 100%)',
                                borderRadius: '16px',
                                padding: 2,
                                '&:hover': {
                                    boxShadow: '0px 6px 30px rgba(0, 0, 0, 0.15)'
                                }
                            }}>
                                <Avatar sx={{
                                    backgroundColor: '#FFF',
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                                    margin: 2
                                }}>
                                    {getIcon(notification.severity)}
                                </Avatar>
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="body1" sx={{ fontWeight: '500', color: '#424242' }}>
                                        {/* Replace dollar signs with peso signs */}
                                        {notification.message.replace(/\$/g, '₱')}
                                    </Typography>
                                    <Typography variant="caption" sx={{ color: '#9E9E9E', marginTop: 1, display: 'block' }}>
                                        {new Date(notification.created_at).toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Fade>
                    ))
                )}
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    icon={getIcon(snackbarSeverity)}
                    sx={{ backgroundColor: '#FFF', color: '#424242', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
}
