import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Navigation from '../../components/navigation/navigation';
import HouseDetails from './House-Details'
import FacilityReports from './Facility-Reports'

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
  
const Housing = (props) => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
      <>
        <Navigation />
        <div className='container'>
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
                  <Tab label="House Details" {...a11yProps(0)} />
                  <Tab label="Facility Reports" {...a11yProps(1)} />
              </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <HouseDetails />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <FacilityReports />
          </TabPanel>
        </div>
      </>
    );
  }

const mapStateToProps = ({ auth, house }) => ({
    auth,
    house
});

export default connect(
    mapStateToProps
)(Housing);