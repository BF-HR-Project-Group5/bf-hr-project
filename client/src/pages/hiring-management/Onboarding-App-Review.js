import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { fetchAllProfiles } from '../../redux/actions/index';
import { makeStyles } from '@material-ui/core/styles';
import OnboardingTable from './Onboarding-Table'
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography component={'span'}>{children}</Typography>
          </Box>
        )}
      </div>
    );
}
  
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
    table: {
      minWidth: 650,
    },
}));

const OnboardingAppReview = (props) => {
    const [value, setValue] = React.useState(0);
    const [data,setData]  = useState()
    const {fetchAllProfiles} = props
    const classes = useStyles();

    useEffect(() => {
        (async function () {
            try {
                const response = await fetchAllProfiles();
                console.log('response',response)
                let users = []
                response.users.forEach((item,index) => {
                    if(item.role == 'user' && item.profile){users.push(item)}
                });
                setData(users)
            } catch (err) {
                console.log(err);
            }
          })()
      }, []);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
         <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
              >
                  <Tab label="PENDING"  {...a11yProps(0)} />
                  <Tab label="APPROVED" {...a11yProps(1)} />
                  <Tab label="REJECTED" {...a11yProps(2)} />
              </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <>
                {
                    data ? (<><OnboardingTable data={data} status='PENDING' /></>) : (<></>)
                }
            </>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <>
                {
                    data ? (<><OnboardingTable data={data} status='APPROVED' /></>) : (<></>)
                }
            </>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <>
                {
                    data ? (<><OnboardingTable data={data} status='REJECTED' /></>) : (<></>)
                }
            </>
          </TabPanel>
          
        </>
    )
}

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps,
    {fetchAllProfiles}
)(OnboardingAppReview);