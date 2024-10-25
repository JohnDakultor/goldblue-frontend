import React from 'react';
import Header from '../components/Header';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function About() {
    return (
        <div>
            <Header />
            <Container sx={{ mt: 5 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    About Grab Bridge
                </Typography>
                <Typography variant="h6" align="center" gutterBottom>
                    Your Trusted Gold Payment Platform
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" paragraph>
                        The London Gold Market is the crucial market for gold. It is the biggest marketplace for gold in the world by the volume of trade. Currently, the gold market is dominated by these two centers of gold trading. The London market is structurally different from centralized exchanges, yet it provides many useful services for the gold investing community. It clears most transactions in the global gold market, which are settled by transfers of GoldBlue through its clearing system. Moreover, the London market maintains the global standard for the quality of gold bars and offers vaulting services.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        The London market also sets the gold fix – the so-called GOLD BLUE Price – serving as a benchmark for pricing gold widely used by producers, consumers, and investors. Every investor has their reasons for picking specific investments, and investing in gold can offer a hedge against inflation and economic uncertainty. It also diversifies an investment portfolio, reducing overall risk due to its potentially low correlation with other asset classes.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Throughout history, gold has been seen as a valuable commodity. Today, owning gold can act as a hedge against inflation and deflation alike, and it also serves as a good portfolio diversifier. Gold can provide financial cover during geopolitical and macroeconomic uncertainty, and it has practical applications in industries such as electronics and dentistry.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Gold is becoming easier to acquire, and you can now own gold without having to physically maintain or secure it by simply being one of the GoldBlue trading partners. With GoldBlue, you can enjoy life to the fullest and happy earnings.
                    </Typography>
                    
                    {/* Mission and Vision sections retained as requested */}
                    <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
                        Our Vision
                    </Typography>
                    <Typography variant="body1" paragraph>
                    To be the most trusted precious metals trading company fulfilling the requirements of our clients and investors while giving them their  daily profitable earnings. 

At the heart  of Grab Bridge we look to make profitable but balanced transactions for all our suppliers, traders and investors and to continue to build on our strong foundations.


“To be the best private Gold Trading company in the world”

We look to develop world-class trading structures and initiatives, through the creation of independent fundamental research. This enables us to be at the fore front of the gold trading markets and improve life standard of every individual.

                    </Typography>
                    <Typography variant="h5" sx={{ mt: 4 }} gutterBottom>
                        Our Mission
                    </Typography>
                    <Typography variant="body1" paragraph>
                    To be the development partner of choice in the international mining and gold industry.
To be a leader in safety, environmental protection and corporate social responsibility.
To generate superior value and investor returns through prudent investment and effective project development.
To be a leader in innovation and efficiency for successful profit sharing for all investors.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Join us today and experience a new way to handle your payments. With Grab Bridge, you can transact with confidence, maximize your earnings through our referral program, and enjoy the benefits of being part of a vibrant, growing community. Together, we can redefine the payment landscape, making it more accessible, rewarding, and secure for everyone.
                    </Typography>
                </Box>
            </Container>
        </div>
    );
}
