import RecentTransactionHistory from "./components/Transaction/RecentTransactionHistory";
import Dashboard from "./components/Dashboard/Dashboard";
import DashboardOption from "./components/Dashboard/DashboardOption";

import Grid2 from '@mui/material/Unstable_Grid2';

function Homepage() {
    return (
        <>
            <div className="side-margin">
                <Grid2 container spacing={3}>
                    <Grid2 xs={12} md={2}>
                        <DashboardOption />
                    </Grid2>
                    <Grid2 xs={12} md={5}>
                        <Dashboard />
                    </Grid2>
                    <Grid2 xs={12} md={5}>
                        <RecentTransactionHistory />
                    </Grid2>
                </Grid2>
            </div>
        </>
    )
}

export default Homepage;