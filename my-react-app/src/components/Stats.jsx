import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import Cookies from 'js-cookie';
import { Box, Grid, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableFooter } from '@mui/material';
import { LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontWeight: 'bold',
}));

const Stats = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [childData, setChildData] = useState(null);
  const [averageData, setAverageData] = useState({});
  const [loading, setLoading] = useState(true);
  const averageScore = 80; // Assuming 80% is the average score

  useEffect(() => {
    const fetchChildData = async () => {
      const childID = Cookies.get('childID');
      if (!childID) {
        navigate('/addchilddata');
        return;
      }

      try {
        const childRef = doc(db, 'childrenData', childID);
        const childSnap = await getDoc(childRef);

        if (childSnap.exists()) {
          setChildData(childSnap.data());
        } else {
          console.error('No such document!');
          navigate('/addchilddata');
        }
      } catch (error) {
        console.error('Error fetching child data:', error);
      }
    };

    fetchChildData();
  }, [navigate]);

  useEffect(() => {
    if (childData) {
      // Assuming we've defined average data based on age
      const age = childData.age;
      const averages = {
        3: { weight: 14.5, height: 95, screenTime: 1 },
        4: { weight: 16, height: 100, screenTime: 1 },
        5: { weight: 18, height: 105, screenTime: 1 },
      };
      setAverageData(averages[age]);
      setLoading(false);
    }
  }, [childData]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login'); // Redirect to login after logout
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box sx={{ padding: 3 }}>
      {/* Top Navigation Bar */}
      <div className="topnav bg-blue-600 w-full flex justify-around p-4 shadow-lg">
        <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/">LOGO</a>
        <a className="text-white text-lg hover:text-gray-200 transition duration-200" href="/userdashboard">Progress</a>
        <button
          onClick={handleLogout}
          className="text-white text-lg hover:text-gray-200 transition duration-200 ml-auto"
        >
          Logout
        </button>
      </div>

      {/* Title */}
      <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: 'bold', marginTop: 4, color: 'black' }}>
        Child vs Average Statistics
      </Typography>

      {/* Subtitle */}
      <Typography variant="h5" align="center" gutterBottom sx={{ marginBottom: 4, color: 'darkgray' }}>
        Compare your child's development metrics with standard averages
      </Typography>

      {/* Table */}
      <TableContainer component={Paper} elevation={6} sx={{ marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Details</StyledTableCell>
              <StyledTableCell align="center">Your Child</StyledTableCell>
              <StyledTableCell align="center">Average</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Weight
              </TableCell>
              <TableCell align="center">{childData?.weight} kg</TableCell>
              <TableCell align="center">{averageData.weight} kg</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Height
              </TableCell>
              <TableCell align="center">{childData?.height} cm</TableCell>
              <TableCell align="center">{averageData.height} cm</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Avg Daily Screen Time
              </TableCell>
              <TableCell align="center">{childData?.avgDailyScreenTime} hours</TableCell>
              <TableCell align="center">{averageData.screenTime} hours</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Game Score
              </TableCell>
              <TableCell align="center">{Math.round(childData?.score)}%</TableCell>
              <TableCell align="center">{averageScore}%</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3} align="center">
                <Typography variant="caption" sx={{ color: 'gray' }}>
                  * Data is compared based on your child's current age.
                </Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Box>
    </Box>
  );
};

export default Stats;
