import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Card,
    CardContent,
    Typography,
    Box,
    IconButton,
    Tooltip,
    Button,
    TextField
} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ProductDrawer from "../../components/productComponents/ProductDrawer";
import { QRCodeSVG } from 'qrcode.react';
import withUserData from '../../components/UserData';
import { deposit } from '../../services/Axios'; // Import the deposit function
import Modal from "../../components/Modal";

const Deposit = () => {
    const BankNumber = "0165 0397 8973"; // Placeholder Tron wallet address
    const [copied, setCopied] = useState(false);
    const [image, setImage] = useState(null);
    const [amount, setAmount] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
    const [modalTitle, setModalTitle] = useState(""); // Title for modal
    const [modalContent, setModalContent] = useState(""); // Content for modal

    const handleCopyAddress = () => {
        navigator.clipboard.writeText(BankNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleImageUpload = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);

        if (!image || !amount) {
            setModalTitle("Error");
            setModalContent("Please upload an image and enter an amount.");
            setModalOpen(true);
            setIsUploading(false);
            return;
        }

        try {
            const result = await deposit(image, amount);
            if (result.success) {
                setModalTitle("Success");
                setModalContent("Deposit confirmation submitted successfully.");
            } else {
                setModalTitle("Error");
                setModalContent("Deposit submission failed.");
            }
        } catch (error) {
            console.error("Error during submission:", error);
            setModalTitle("Error");
            setModalContent("An error occurred while submitting your deposit.");
        } finally {
            setModalOpen(true); // Open the modal
            setIsUploading(false);
        }
    };

    const handleCloseModal = () => {
        setModalOpen(false); // Close the modal
    };

    return (
        <Box sx={{ maxWidth: 400, mx: "auto", p: 3, mt: 5 }}>
            <AppBar>
                <Toolbar>
                    <ProductDrawer />
                </Toolbar>
            </AppBar>
            <Toolbar />

            {/* Deposit Card */}
            <Card className="deposit-card" sx={{ mt: 2, p: 3 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Cash In via GOTYME
                    </Typography>

                    {/* TRON Wallet Address */}
                    <Typography variant="body1" sx={{ mt: 2 }}>
                        Send amount to the following Bank account: <Typography sx={{fontWeight: 'bold'}}>Eufemia Lim</Typography>
                    </Typography>
                    <Box
                        sx={{
                            mt: 2,
                            p: 2,
                            border: "1px solid var(--input-border-color)",
                            borderRadius: "8px",
                            wordBreak: "break-all",
                            textAlign: "center",
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        {BankNumber}

                        {/* Copy Icon */}
                        <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                            <IconButton onClick={handleCopyAddress} sx={{ ml: 1, color: "var(--icon-color)" }}>
                                <ContentCopyIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>

                    {/* QR Code for Tron Wallet */}
                    <Box sx={{ textAlign: "center", mt: 3 }}>
                        <QRCodeSVG value={BankNumber} size={180} />
                        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            Scan to copy the GOTYME account number
                        </Typography>
                    </Box>

                    {/* Deposit Amount */}
                    <TextField
    label="Enter Amount you have deposited"
    variant="outlined"
    fullWidth
    sx={{
        mt: 3,
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'var(--input-border-color)',
            },
            '&:hover fieldset': {
                borderColor: 'var(--select-text-color)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'var(--select-text-color)',
            },
            '& input': {
                color: 'var(--select-text-color)',  // Text color for the input
            },
        },
        '& .MuiInputLabel-root': {
            color: 'var(--select-text-color)', // Label color
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: 'var(--select-text-color)', // Focused label color
        }
    }}
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
/>

                    {/* Image Uploader with Preview */}
                    <Box sx={{ mt: 3 }}>
                        <Typography variant="body1">Upload Deposit Confirmation:</Typography>
                        <input type="file" onChange={handleImageUpload} />

                        {image && (
                            <Box sx={{ mt: 2, textAlign: "center" }}>
                                <img
                                    src={URL.createObjectURL(image)}
                                    alt="Uploaded preview"
                                    style={{ maxWidth: '100%', maxHeight: '200px' }}
                                />
                            </Box>
                        )}
                    </Box>

                    {/* Submit Button */}
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3 }}
                        onClick={handleSubmit}
                        disabled={isUploading}
                    >
                        {isUploading ? "Submitting..." : "Confirm Deposit"}
                    </Button>
                </CardContent>
            </Card>

            {/* Modal for Feedback */}
            <Modal 
                open={modalOpen} 
                handleClose={handleCloseModal} 
                title={modalTitle} 
                content={modalContent} 
                onConfirm={handleCloseModal} 
            />
        </Box>
    );
};

export default withUserData(Deposit);

// import React, { useState } from "react";
// import {
//     AppBar,
//     Toolbar,
//     Card,
//     CardContent,
//     Typography,
//     Box,
//     IconButton,
//     Tooltip,
//     Button,
//     TextField,
//     MenuItem,
//     Select,
//     FormControl,
//     InputLabel
// } from "@mui/material";
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import ProductDrawer from "../../components/productComponents/ProductDrawer";
// import { QRCodeSVG } from 'qrcode.react';
// import withUserData from '../../components/UserData';
// import { deposit } from '../../services/Axios'; // Import the deposit function
// import Modal from "../../components/Modal";

// const Deposit = () => {
//     const [selectedMethod, setSelectedMethod] = useState("gotyme");
//     const [copied, setCopied] = useState(false);
//     const [image, setImage] = useState(null);
//     const [amount, setAmount] = useState("");
//     const [isUploading, setIsUploading] = useState(false);
//     const [modalOpen, setModalOpen] = useState(false); // State for modal visibility
//     const [modalTitle, setModalTitle] = useState(""); // Title for modal
//     const [modalContent, setModalContent] = useState(""); // Content for modal

//     // Account details
//     const accountDetails = {
//         gcash: {
//             name: "Eufemia Lim",
//             number: "09505832752",
//             label: "GCash"
//         },
//         gotyme: {
//             name: "Eufemia Lim",
//             number: "0165 0397 8973",
//             label: "GoTyme"
//         },
//         trx: {
//             name: "TRX Wallet",
//             number: "TNLjPvxpZF91trwKfwDVqux95e8xcRDkee",
//             label: "TRX Wallet Address"
//         }
//     };

//     const handleCopyAddress = () => {
//         navigator.clipboard.writeText(accountDetails[selectedMethod].number);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//     };

//     const handleImageUpload = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsUploading(true);

//         if (!image || !amount) {
//             setModalTitle("Error");
//             setModalContent("Please upload an image and enter an amount.");
//             setModalOpen(true);
//             setIsUploading(false);
//             return;
//         }

//         try {
//             const result = await deposit(image, amount);
//             if (result.success) {
//                 setModalTitle("Success");
//                 setModalContent("Deposit confirmation submitted successfully.");
//             } else {
//                 setModalTitle("Error");
//                 setModalContent("Deposit submission failed.");
//             }
//         } catch (error) {
//             console.error("Error during submission:", error);
//             setModalTitle("Error");
//             setModalContent("An error occurred while submitting your deposit.");
//         } finally {
//             setModalOpen(true); // Open the modal
//             setIsUploading(false);
//         }
//     };

//     const handleCloseModal = () => {
//         setModalOpen(false); // Close the modal
//     };

//     return (
//         <Box sx={{ maxWidth: 400, mx: "auto", p: 3, mt: 5 }}>
//             <AppBar>
//                 <Toolbar>
//                     <ProductDrawer />
//                 </Toolbar>
//             </AppBar>
//             <Toolbar />

//             {/* Deposit Card */}
//             <Card className="deposit-card" sx={{ mt: 2, p: 3 }}>
//                 <CardContent>
//                     <Typography variant="h5" gutterBottom>
//                         Cash In via {accountDetails[selectedMethod].label}
//                     </Typography>

//                     {/* Dropdown for selecting payment method */}
//                     <FormControl fullWidth sx={{ mt: 2, border: "var(--input-border-color)" }}>
//                         <InputLabel sx={{ color: "var(--primary-text-color)" }}>Select Payment Method</InputLabel>
//                         <Select
//                             value={selectedMethod}
//                             onChange={(e) => setSelectedMethod(e.target.value)}
//                             label="Select Payment Method"
//                             sx={{ color: "var(--select-text-color)" }}
//                         >
//                             <MenuItem value="gcash">GCash</MenuItem>
//                             <MenuItem value="gotyme">GoTyme</MenuItem>
//                             <MenuItem value="trx">TRX</MenuItem>
//                         </Select>
//                     </FormControl>

//                     {/* Account Details */}
//                     <Typography variant="body1" sx={{ mt: 2 }}>
//                         Send amount to the following {accountDetails[selectedMethod].label}: <Typography sx={{ fontWeight: 'bold' }}>{accountDetails[selectedMethod].name}</Typography>
//                     </Typography>
//                     <Box
//                         sx={{
//                             mt: 2,
//                             p: 2,
//                             border: "solid var(--input-border-color)",
//                             borderRadius: "8px",
//                             wordBreak: "break-all",
//                             textAlign: "center",
//                             display: 'flex',
//                             justifyContent: 'space-between',
//                             alignItems: 'center',
//                         }}
//                     >
//                         {accountDetails[selectedMethod].number}

//                         {/* Copy Icon */}
//                         <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
//                             <IconButton onClick={handleCopyAddress} sx={{ ml: 1, color: "var(--select-text-color)" }}>
//                                 <ContentCopyIcon />
//                             </IconButton>
//                         </Tooltip>
//                     </Box>

//                     {/* QR Code */}
//                     <Box sx={{ textAlign: "center", mt: 3 }}>
//                         <QRCodeSVG value={accountDetails[selectedMethod].number} size={180} />
//                         <Typography variant="caption" display="block" sx={{ mt: 1 }}>
//                             Scan to copy the {accountDetails[selectedMethod].label}
//                         </Typography>
//                     </Box>

//                     {/* Deposit Amount */}
//                     <TextField
//     label="Enter Amount you have deposited"
//     variant="outlined"
//     fullWidth
//     sx={{
//         mt: 3,
//         '& .MuiOutlinedInput-root': {
//             '& fieldset': {
//                 borderColor: 'var(--input-border-color)',
//             },
//             '&:hover fieldset': {
//                 borderColor: 'var(--select-text-color)',
//             },
//             '&.Mui-focused fieldset': {
//                 borderColor: 'var(--select-text-color)',
//             },
//             '& input': {
//                 color: 'var(--select-text-color)',  // Text color for the input
//             },
//         },
//         '& .MuiInputLabel-root': {
//             color: 'var(--select-text-color)', // Label color
//         },
//         '& .MuiFormLabel-root.Mui-focused': {
//             color: 'var(--select-text-color)', // Focused label color
//         }
//     }}
//     value={amount}
//     onChange={(e) => setAmount(e.target.value)}
// />

//                     {/* Image Uploader with Preview */}
//                     <Box sx={{ mt: 3 }}>
//                         <Typography variant="body1">Upload Deposit Confirmation:</Typography>
//                         <input type="file" onChange={handleImageUpload} />

//                         {image && (
//                             <Box sx={{ mt: 2, textAlign: "center" }}>
//                                 <img
//                                     src={URL.createObjectURL(image)}
//                                     alt="Uploaded preview"
//                                     style={{ maxWidth: '100%', maxHeight: '200px' }}
//                                 />
//                             </Box>
//                         )}
//                     </Box>

//                     {/* Submit Button */}
//                     <Button
//                         fullWidth
//                         variant="contained"
//                         sx={{ mt: 3 }}
//                         onClick={handleSubmit}
//                         disabled={isUploading}
//                     >
//                         {isUploading ? "Submitting..." : "Confirm Deposit"}
//                     </Button>
//                 </CardContent>
//             </Card>

//             {/* Modal for Feedback */}
//             <Modal 
//                 open={modalOpen} 
//                 handleClose={handleCloseModal} 
//                 title={modalTitle} 
//                 content={modalContent} 
//                 onConfirm={handleCloseModal} 
//             />
//         </Box>
//     );
// };

// export default withUserData(Deposit);
