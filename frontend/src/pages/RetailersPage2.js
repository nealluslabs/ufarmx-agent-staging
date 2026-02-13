import { Helmet } from 'react-helmet-async';
import {
  Grid,
  Container,
  Typography,
  TextField,
  Box,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  InputAdornment,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Pagination,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { deleteRetailer, fetchAllRetailerProducts, fetchRetailerById, fetchRetailerProductsForOneRetailer } from 'src/redux/actions/group.action';
import { getOutboxCount } from 'src/offline/outboxDb';
import { syncOutboxNow } from 'src/offline/outboxSync';

// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Search as SearchIcon, Add as AddIcon, MoreHoriz as MoreIcon } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BsPencil } from 'react-icons/bs';
import { IoEyeOutline } from 'react-icons/io5';
import { CiTrash } from 'react-icons/ci';
import { clearRetailerInFocus } from 'src/redux/reducers/group.slice';
export default function RetailersPage2() {
  const theme = useTheme();
  const { page } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { allRetailers,allLoans,totalPagesForms, currentAgentsToDisplay } = useSelector((state) => state.group);
  console.log('All LOANS---->',allLoans);

  const [selectedAgent, setSelectedAgent] = useState(/.*/);
  const [loadingPage, setLoadingPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pendingOutboxCount, setPendingOutboxCount] = useState(0);

  const refreshPendingOutboxCount = async () => {
    try {
      const count = await getOutboxCount();
      setPendingOutboxCount(count);
    } catch (error) {
      setPendingOutboxCount(0);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(true);
    }, 1500);
  }, []);

  useEffect(() => {
    refreshPendingOutboxCount();

    const handleOnline = async () => {
      await syncOutboxNow();
      await refreshPendingOutboxCount();
    };

    window.addEventListener('online', handleOnline);
    const timer = window.setInterval(refreshPendingOutboxCount, 15000);

    if (navigator.onLine) {
      handleOnline();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.clearInterval(timer);
    };
  }, []);

  console.log('SELECTED AGENT IS NOW==>', selectedAgent);
  const [responsesFromDB, setResponsesFromDB] = useState([]);

  useEffect(() => {
    console.log('USER ON REtailers PAGE--->', user);

    if (!user) {
      navigate('/login');
    }
  }, [user]);

  useEffect(() => {
    /*THIS USE EFFECT IS IMPORTANT TO ASSGIN AN ID SO MUI DATA GRID WILL ACCEPT THE DATA */
    const forcedId = [];
  
  const sortedRetailers = allRetailers && [...allRetailers].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

    sortedRetailers &&

      sortedRetailers.forEach((item, index) => {
        forcedId.push({
          ...item,
          id: item._id,
        });
      });

    setResponsesFromDB(forcedId);

    console.log('WHAT WE ARE PRESENTING FOR RETAILERS-->', sortedRetailers);
    console.log('ALL Retailers-->', sortedRetailers);
  }, [allRetailers]);

  const chartData = [
    { name: 'Aug 2025', 'Active Retailers': 3, 'Loans Generated': 0 },
    { name: 'Sept 2025', 'Active Retailers': 4, 'Loans Generated': 0 },
    { name: 'Oct 2025', 'Active Retailers': 5, 'Loans Generated': 0 },
    { name: 'Nov 2025', 'Active Retailers': 4, 'Loans Generated': 0 },
    { name: 'Dec 2025', 'Active Retailers': 5, 'Loans Generated': 0 },
    { name: 'Jan 2025', 'Active Retailers': 6, 'Loans Generated': 0 },
  ];

  const COLORS = {
    primary: '#0A6054',
    success: '#ECFDF3',
    successText: '#027A48',
    risk: '#FEF3F2',
    riskText: '#B42318',
    border: '#EAECF0',
    textSecondary: '#667085',
    backgroundColor: '#FFF4F4',
  };
  const StatCard = ({ title, value, subtext }) => (
    <Card variant="outlined" sx={{ p: 2, borderRadius: 3, minHeight: 120 }}>
      <Typography variant="body2" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography variant="caption" color="textSecondary">
        {subtext}
      </Typography>
    </Card>
  );

  const RiskCard = ({ name, location, rate, loans, outstanding }) => (
    <Box
      sx={{
        p: 2,
        mb: 2,
        borderRadius: 2,
        border: `1px solid #FDA29B`,
        backgroundColor: '#FFF',
      }}
    >
      <Grid container justifyContent="space-between">
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {name}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {location}
          </Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="caption" color="textSecondary">
            Seeds & Fertilizer Dealer
          </Typography>
        </Box>
      </Grid>
      <Grid container sx={{ mt: 2 }} justifyContent="space-between">
        <Box>
          <Typography variant="caption" display="block" color="textSecondary">
            Default Rate
          </Typography>
          <Typography variant="caption" sx={{ color: COLORS.riskText, fontWeight: 700 }}>
            {rate}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" display="block" color="textSecondary">
            Loans
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {loans}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" display="block" color="textSecondary">
            Outstanding
          </Typography>
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            {outstanding}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
  return (
    <>
      <Helmet>
        <title> UfarmX </title>
      </Helmet>

      {totalPagesForms < 0 || !loadingPage ? (
        <center style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '90vh' }}>
          <CircularProgress />
        </center>
      ) : (
        <Container maxWidth="xl">
          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#101828' }}>
                Retailers
              </Typography>
              <Typography variant="body1" color="textSecondary">
                View and manage all retailers
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', gap: 1 }}>
                <Chip
                  size="small"
                  label={`Pending sync: ${pendingOutboxCount}`}
                  sx={{ backgroundColor: '#EEF2FF', color: '#1E3A8A', fontWeight: 500 }}
                />
              </Box>
            </Box>
            <Button
              onClick={() => {
                navigate('/dashboard/new-add-new-retailer');
              }}
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ bgcolor: COLORS.primary, borderRadius: 2, px: 3, py: 1.2, '&:hover': { bgcolor: '#084d43' } }}
            >
              New Retailer
            </Button>
          </Box>

          {/* KPI Row */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={2.4}>
              <StatCard title="Total Retailers" value={allRetailers && allRetailers.length} subtext="Registered" />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <StatCard title="Active Retailers" value={allRetailers && allRetailers.length} subtext="83% active rate" />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <StatCard
                title="Loans Generated"
                value={allLoans && allLoans.length >0 ? allLoans.length:"0"  }
                subtext={allLoans && allLoans.length >0 ? allLoans.length:"All Loans"  }
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <StatCard
                title="Repayments"
                value={"0" }
                subtext="Total collected"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={2.4}>
              <StatCard title="Default Rate" value="0" subtext=">10% default rate" />
            </Grid>
          </Grid>

          <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
            <TextField
              placeholder="Search by business name, name or location"
              size="small"
              sx={{ width: 400, bgcolor: '#F3F3F5', paddingLeft: 1, paddingRight: 1 }}
              InputProps={{ startAdornment: <InputAdornment position="start"></InputAdornment> }}
            />
            <Select
              size="small"
              defaultValue="all"
              sx={{
                width: 150,
                bgcolor: '#F3F3F5',
                paddingLeft: 1,
                paddingRight: 1,
                color: '#717182',
                fontWeight: 400,
              }}
            >
              <MenuItem value="all" sx={{ color: '#717182' }}>
                All Status
              </MenuItem>
            </Select>
            <Select
              size="small"
              defaultValue="all"
              sx={{ width: 180, bgcolor: '#F3F3F5', paddingLeft: 1, paddingRight: 1 }}
            >
              <MenuItem value="all">All Performance</MenuItem>
            </Select>
          </Box>

          {/* Charts and At Risk Section */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={8} sx={{height:"20rem"}}>
              <Card variant="outlined" sx={{ p: 3, borderRadius: 3 }}>
                <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
                  Retailer Activity Trend
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Legend verticalAlign="bottom" align="center" />
                      <Line
                        type="monotone"
                        dataKey="Active Retailers"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line type="monotone" dataKey="Loans Generated" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </Grid>
            <Grid item xs={12} md={4} sx={{height:"26.6rem"}}>
              <Card variant="outlined" sx={{ p: 3, borderRadius: 3, bgcolor: '#FDFDFD', height: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    At-Risk Retailers
                  </Typography>
                  <Chip
                    label={`${allRetailers?.atRisk?.length || 0} Retailers`}
                    size="small"
                    sx={{ bgcolor: COLORS.risk, color: COLORS.riskText, fontWeight: 600 }}
                  />
                </Box>
                {allRetailers?.length > 0 ? (
                  allRetailers.slice(0,2).map((retailer, index) => (
                    <Box key={retailer._id || index} sx={{ mb: 2 }}>
                      <RiskCard
                        name={retailer.companyName}
                        location={retailer.address}
                        rate={retailer.defaultRate || '0%'}
                        loans={retailer.loansCount || 0}
                        outstanding={`₦${retailer.outstandingAmount?.toLocaleString() || '0'}`}
                      />
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', py: 2 }}>
                    No at-risk retailers found
                  </Typography>
                )}
              </Card>
            </Grid>
          </Grid>

          {/* Table Section */}
          <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 3, overflow: 'hidden' }}>
            <Table sx={{ minWidth: 1000 }}>
              <TableHead sx={{ bgcolor: '#F9FAFB' }}>
                <TableRow>
                  <TableCell sx={{ color: COLORS.textSecondary, fontWeight: 600 }}>Business Info</TableCell>
                  <TableCell sx={{ color: COLORS.textSecondary, fontWeight: 600 }}>Location</TableCell>
                  <TableCell sx={{ color: COLORS.textSecondary, fontWeight: 600 }}>Disbursed</TableCell>
                  <TableCell sx={{ color: COLORS.textSecondary, fontWeight: 600 }}>Collected</TableCell>
                  <TableCell sx={{ color: COLORS.textSecondary, fontWeight: 600 }}>Loans</TableCell>
                  <TableCell sx={{ color: COLORS.textSecondary, fontWeight: 600 }}>Performance</TableCell>
                  <TableCell sx={{ color: COLORS.textSecondary, fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ color: COLORS.textSecondary, fontWeight: 600 }}>Default Rate</TableCell>
                  <TableCell sx={{ color: COLORS.textSecondary, fontWeight: 600 }}>Action</TableCell>
                  {/* <TableCell align="right"></TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {allRetailers && [...allRetailers].sort((a,b)=>(new Date(b.createdAt) - new Date(a.createdAt)) ).map((retailer, index) => (
                  <TableRow key={index} hover>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {retailer.companyName ||
                          retailer.businessName ||
                          retailer.firstName + ' ' + retailer.lastName ||
                          ' '}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {retailer.contactPerson ||
                          (retailer.firstName && retailer.lastName
                            ? `${retailer.firstName} ${retailer.lastName}`
                            : '') ||
                          ' '}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{retailer.companyAddress.split(',').slice(-2).join(',')}</Typography>
                    </TableCell>
                   
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {retailer.totalDisbursed || '₦0'}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {retailer.transactions || '0 '} Transactions
                      </Typography>
                    </TableCell>
                   
                   
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        ₦{retailer.totalCollected?.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {retailer.transactions || '0 '}Transactions
                      </Typography>
                    </TableCell>


                    <TableCell>
                      {console.log("THIS RETAILER IS--->",retailer)}
                      <Typography variant="body2">{allLoans?.filter((item) => (item.retailerId === retailer._id))?allLoans?.filter((item) => (item.retailerId === retailer._id)).length:0  }</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={retailer.Performance || 'Excellent'}
                        size="small"
                        sx={{ bgcolor: COLORS.success, color: COLORS.successText, fontWeight: 600, padding: 1 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={retailer.Status || 'Active'}
                        size="small"
                        variant="outlined"
                        sx={{ color: COLORS.successText, borderColor: COLORS.successText }}
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">{retailer.defaultRate || '0.0%'}</Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{ display: 'flex',border:"none"}}
                     // onClick={() => {
                     //   dispatch(fetchRetailerById(retailer._id));
                     //   setTimeout(() => {
                     //     navigate('/dashboard/view-retailer-3');
                     //   }, 1200);
                     // }}
                    >
                     {/* <IconButton size="small">
                        <MoreIcon />
                      </IconButton> */}
                       

                      <div style={{ display: 'flex',flexDirection:"row",alignItems:"center",width:"100%", gap: '0.15rem',position:"relative",top:"1.5rem" }}>
                         
                         <span
                             onClick={() => {
                               setLoading(true);
                               if (retailer) {
                                 //dispatch(saveRetailerInFocus(params.row));
                                 dispatch(fetchRetailerById(retailer._id))
                                 dispatch(fetchAllRetailerProducts(retailer._id))
                                 dispatch(fetchRetailerProductsForOneRetailer(retailer && retailer._id))
                               } else {
                                 dispatch(clearRetailerInFocus(retailer));
                               }
                         
                               setTimeout(() => {
                                 navigate('/dashboard/view-retailer');
                               }, 1700);
                         
                               setTimeout(() => {
                                 setLoading(false);
                               }, 1500);
                             }}
                             style={{ cursor: 'pointer', color: '#90C434', fontsize: '0.8rem' }}
                           >
                            <BsPencil />
                           </span>
                         
                         
                           <span
                             onClick={() => {
                               setLoading(true);
                               if (retailer) {
                                // dispatch(saveRetailerInFocus(retailer));
                                dispatch(fetchRetailerById(retailer._id))
                                 dispatch(fetchAllRetailerProducts(retailer._id))
                                 dispatch(fetchRetailerProductsForOneRetailer(retailer && retailer._id))
                               } else {
                                 dispatch(clearRetailerInFocus(retailer));
                               }
                         
                               setTimeout(() => {
                                 navigate('/dashboard/view-retailer-3');
                               }, 1200);
                         
                               setTimeout(() => {
                                 setLoading(false);
                               }, 1000);
                             }}
                             style={{ cursor: 'pointer', color: '#0A6054', fontsize: '0.8rem',marginLeft:"0.5rem"}}
                           >
                             <IoEyeOutline />
                           </span>
                         
                         
                           <span
                             onClick={() => {
                               setLoading(true);
                               if (retailer) {
                                 if(window.confirm("Are you sure you want to delete this retailer?")){
                         
                                    dispatch(deleteRetailer(retailer))
                                 }
                                 
                               } 
                         
                               
                         
                               setTimeout(() => {
                                 setLoading(false);
                               }, 1200);
                             }}
                             style={{ cursor: 'pointer', color: 'gray', fontsize: '0.8rem',marginLeft:"0.5rem"}}
                           >
                            <CiTrash />
                           </span>
                         </div>


                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', borderTop: `1px solid ${COLORS.border}` }}>
              {/* <Pagination count={3} shape="rounded" color="primary" /> */}
            </Box>
          </TableContainer>
        </Container>
      )}
    </>
  );
}
