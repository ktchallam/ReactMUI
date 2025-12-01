import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Box, Paper, Grid, Typography } from '@mui/material';

// #region Sample data
const data = [
  {
    name: 'A',
    uv: 400,
    pv: 240,
    amt: 2400,
  },
  {
    name: 'B',
    uv: 300,
    pv: 456,
    amt: 2200,
  },
  {
    name: 'C',
    uv: 300,
    pv: 139,
    amt: 1400,
  },
  {
    name: 'D',
    uv: 200,
    pv: 980,
    amt: 2000,
  },
  {
    name: 'E',
    uv: 278,
    pv: 390,
    amt: 2200,
  },
  {
    name: 'F',
    uv: 189,
    pv: 480,
    amt: 2400,
  },
];

// #endregion

export default function IndexLineChart() {
  return (
    <div style={{ width: '100%', marginTop: '2rem', display:'table-cell' }}>    
    <Box sx={{ p: 3 }}>
      {/* Color-Coded Metrics */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid>
          <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f0f4ff', border: '2px solid #050247ff' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#050247ff' }}>
              UV Metric (blue box)
            </Typography>
          </Paper>
        </Grid>

        <Grid>
          <Paper elevation={1} sx={{ p: 2, backgroundColor: '#ffe0f0', border: '2px solid #e10958ff' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#e10958ff' }}>
              PV Metric (pink box)
            </Typography>
          </Paper>
        </Grid>

        <Grid>
          <Paper elevation={1} sx={{ p: 2, backgroundColor: '#f0fff0', border: '2px solid #011208ff' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#011208ff' }}>
              Amount (green box)
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      {/* Chart */}
      <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 800, margin: 'auto', backgroundColor:'aqua' }} responsive data={data}>
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Line type="monotone" dataKey="uv" stroke="#050247ff" />
        <Line type="monotone" dataKey="pv" stroke="#e10958ff" />
        <Line type="monotone" dataKey="amt" stroke="#011208ff" />
      </LineChart>
    </Box>
    </div>
  );
}