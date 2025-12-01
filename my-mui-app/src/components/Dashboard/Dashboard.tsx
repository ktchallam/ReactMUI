import React, { useState, useMemo } from 'react';
import { Box, Container, Paper, Typography, Grid, Card, CardContent } from '@mui/material';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Papa from 'papaparse';
import { useThemeContext } from '../../context/ThemeContext';
import { dashboardThemes } from '../../styles/dashboardThemes';
import ThemeSwitcher from '../ThemeSwitcher';

interface StockData {
  Date: string;
  'Close Price': number;
  'Deliverable Qty': number;
  'Average Price': number;
  'Total Traded Quantity': number;
  'Last Price': number;
}

export default function Dashboard() {
  const [data, setData] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useThemeContext();
  const theme = dashboardThemes[currentTheme];

  // Fetch and parse CSV data from file
  React.useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/file.csv');
        const csvText = await response.text();
        
        Papa.parse(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results: any) => {
            const parsedData = results.data.map((row: any) => ({
              Date: row['Date  '].trim(),
              'Close Price': parseFloat(row['Close Price  '].trim()),
              'Deliverable Qty': parseInt(row['Deliverable Qty  '].trim().replace(/,/g, '')),
              'Average Price': parseFloat(row['Average Price '].trim()),
              'Total Traded Quantity': parseInt(row['Total Traded Quantity  '].trim().replace(/,/g, '')),
              'Last Price': parseFloat(row['Last Price  '].trim()),
            }));
            setData(parsedData);
            setLoading(false);
          },
          error: (error: any) => {
            console.error('Error parsing CSV:', error);
            setLoading(false);
          },
        });
      } catch (error) {
        console.error('Error fetching CSV file:', error);
        setLoading(false);
      }
    };

    fetchCSV();
  }, []);

  // Calculate statistics
  const stats = useMemo(() => {
    if (data.length === 0) return null;
    
    const prices = data.map(d => d['Close Price']);
    const quantities = data.map(d => d['Deliverable Qty']);

    return {
      avgPrice: (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2),
      maxPrice: Math.max(...prices).toFixed(2),
      minPrice: Math.min(...prices).toFixed(2),
      avgQty: (quantities.reduce((a, b) => a + b, 0) / quantities.length).toLocaleString(),
      maxQty: Math.max(...quantities).toLocaleString(),
      minQty: Math.min(...quantities).toLocaleString(),
    };
  }, [data]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography>Loading data...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, backgroundColor: theme.background, minHeight: '100vh', transition: 'all 0.3s ease' }}>
      <ThemeSwitcher />
      
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold', color: theme.textPrimary }}>
        NATCOPHARM Stock Dashboard
      </Typography>

      {/* Statistics Cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {/* Price Stats */}
        <Grid>
          <Card sx={{ backgroundColor: theme.statsCard1, color: theme.textPrimary }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Average Close Price
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.chartLine1 }}>
                ₹{stats?.avgPrice}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ backgroundColor: theme.statsCard2, color: theme.textPrimary }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Highest Price
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: theme.chartLine2 }}>
                ₹{stats?.maxPrice}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ backgroundColor: theme.statsCard3, color: theme.textPrimary }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Lowest Price
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#388e3c' }}>
                ₹{stats?.minPrice}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid>
          <Card sx={{ backgroundColor: theme.statsCard4, color: theme.textPrimary }}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Avg Delivery Qty
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#f57c00' }}>
                {stats?.avgQty}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Moving Price Chart */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, backgroundColor: theme.cardBackground, color: theme.textPrimary }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: theme.textPrimary }}>
          Close Price Trend
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} />
            <XAxis 
              dataKey="Date" 
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12, fill: theme.textSecondary }}
            />
            <YAxis tick={{ fill: theme.textSecondary }} />
            <Tooltip 
              formatter={(value) => `₹${value}`}
              contentStyle={{ backgroundColor: theme.cardBackground, border: `1px solid ${theme.cardBorder}`, borderRadius: 4 }}
              labelStyle={{ color: theme.textPrimary }}
            />
            <Legend wrapperStyle={{ color: theme.textPrimary }} />
            <Line 
              type="monotone" 
              dataKey="Close Price" 
              stroke={theme.chartLine1}
              strokeWidth={2}
              dot={{ fill: theme.chartLine1, r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>

      {/* Delivery Quantity Chart */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, backgroundColor: theme.cardBackground, color: theme.textPrimary }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: theme.textPrimary }}>
          Deliverable Quantity Trend
        </Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} />
            <XAxis 
              dataKey="Date"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12, fill: theme.textSecondary }}
            />
            <YAxis tick={{ fill: theme.textSecondary }} />
            <Tooltip 
              formatter={(value) => value.toLocaleString()}
              contentStyle={{ backgroundColor: theme.cardBackground, border: `1px solid ${theme.cardBorder}`, borderRadius: 4 }}
              labelStyle={{ color: theme.textPrimary }}
            />
            <Legend wrapperStyle={{ color: theme.textPrimary }} />
            <Bar 
              dataKey="Deliverable Qty" 
              fill={theme.chartBar}
              name="Deliverable Quantity"
            />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      {/* Dual Axis Comparison */}
      <Paper elevation={2} sx={{ p: 3, backgroundColor: theme.cardBackground, color: theme.textPrimary }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', color: theme.textPrimary }}>
          Price vs Delivery Quantity Comparison
        </Typography>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.cardBorder} />
            <XAxis 
              dataKey="Date"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12, fill: theme.textSecondary }}
            />
            <YAxis yAxisId="left" label={{ value: 'Close Price (₹)', angle: -90, position: 'insideLeft' }} tick={{ fill: theme.textSecondary }} />
            <YAxis yAxisId="right" orientation="right" label={{ value: 'Deliverable Qty', angle: 90, position: 'insideRight' }} tick={{ fill: theme.textSecondary }} />
            <Tooltip 
              contentStyle={{ backgroundColor: theme.cardBackground, border: `1px solid ${theme.cardBorder}`, borderRadius: 4 }}
              labelStyle={{ color: theme.textPrimary }}
            />
            <Legend wrapperStyle={{ color: theme.textPrimary }} />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="Close Price" 
              stroke={theme.chartLine1}
              strokeWidth={2}
              dot={{ fill: theme.chartLine1, r: 3 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="Deliverable Qty" 
              stroke={theme.chartLine2}
              strokeWidth={2}
              dot={{ fill: theme.chartLine2, r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Paper>
    </Container>
  );
}
