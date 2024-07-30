import React from 'react';
import { useQuery, gql } from '@apollo/client';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material';

const GET_ANALYTICS_DATA = gql`
  query GetAnalyticsData {
    keyMetrics {
      footfall
      patientSatisfaction
      revenue
    }
    staffEfficiency {
      name
      efficiencyDelta
      npsDelta
      reportedIssues
    }
  }
`;

const Dashboard: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ANALYTICS_DATA);

  if (loading) return <CircularProgress />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Analytics
      </Typography>
      <Grid container spacing={3}>
        {/* Key Metrics */}
        <Grid item xs={12} sm={4}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6">Footfall</Typography>
              <Typography variant="h4">{data.keyMetrics.footfall}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6">Patient Satisfaction</Typography>
              <Typography variant="h4">{data.keyMetrics.patientSatisfaction}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6">Revenue</Typography>
              <Typography variant="h4">{data.keyMetrics.revenue}</Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Staff Efficiency */}
        <Grid item xs={12}>
          <Paper>
            <Box p={2}>
              <Typography variant="h6">Staff Efficiency</Typography>
              <Grid container spacing={2}>
                {data.staffEfficiency.map((staff: any) => (
                  <Grid item xs={12} sm={6} md={3} key={staff.name}>
                    <Paper>
                      <Box p={2}>
                        <Typography variant="h6">{staff.name}</Typography>
                        <Typography variant="body1">
                          Efficiency Delta: {staff.efficiencyDelta}
                        </Typography>
                        <Typography variant="body1">
                          NPS Delta: {staff.npsDelta}
                        </Typography>
                        <Typography variant="body1">
                          Reported Issues: {staff.reportedIssues}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
