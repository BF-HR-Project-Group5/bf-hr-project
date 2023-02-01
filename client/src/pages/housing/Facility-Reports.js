import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';
import * as yup from "yup";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { Formik } from 'formik';
import Button from 'react-bootstrap/Button';

const yupSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
  });

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
  
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }
  
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


    function createData(title, description, createdBy, timestamp, status, action) {
        return { title, description, createdBy, timestamp, status, action };
    }

    const rows = [
    createData('Light issue', "Light is not working", 'Joe', '01/31/2023','Open','View comment'),
    createData('Window issue', "The window is broken, I feel really cold", 'Tao', '01/30/2023','In Progress','View comment'),
    createData('Refrigerator issue', "Refrigerator not working", 'Yuxing', '01/29/2023','Closed','View comment'),
    createData('air-conditioning issue', "The air-conditioning doesn't work, I feel super hot", 'Teressa', '01/28/2023','Open','View comment'),
    ];

    const FacilityReports = (props) => {
        console.log('props',props)
        const classes = useStyles();
        const [value, setValue] = React.useState(0);
        const [formData, setFormData] = useState(null);

        useEffect(() => {
            (async function() {
            if (formData) {
                try {
                    props.history.push({pathname: '/housing'})
                } catch (err) {
                console.log(err);
                }
            }
            })()
        }, [formData]);

        const handleChange = (event, newValue) => {
            setValue(newValue);
        };

        const handleRoute = (index) =>{
            // props.history.push({pathname: '/housing/comments'})
            window.location.href = '/housing/comments'
        }

        const onSubmit = (data) => {
            console.log('data',data)
            reset();
            setFormData(data)
        };

        return (
            <>
            <div className="mb-3">
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
                        <Tab label="Creating a Facility Report" {...a11yProps(0)} />
                        <Tab label="Viewing existing reports" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                <Formik
                validationSchema={yupSchema}
                onSubmit={console.log}
                initialValues={{
                    title: '',
                    description: '',
                }}>
            {({
                handleSubmit,
                handleChange,
                handleBlur,
                values,
                touched,
                isValid,
                errors,
            }) => (
                <Form noValidate onSubmit={handleSubmit}>
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationFormik01">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        isValid={touched.title && !errors.title}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                    
                <Row className="mb-3">
                    <Form.Group as={Col} md="6" controlId="validationFormik02">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        type="text"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        isValid={touched.description && !errors.description}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Button type="submit">Submit form</Button>
                </Form>
            )}
            </Formik>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className="tableHead">
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Created By</TableCell>
                                    <TableCell align="right">Timestamp</TableCell>
                                    <TableCell align="right">Status</TableCell>
                                    <TableCell align="right">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {rows.map((row,index) => (
                                <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.createdBy}</TableCell>
                                <TableCell align="right">{row.timestamp}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right"><Button onClick={(index)=>{handleRoute(index)}}>{row.action}</Button></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </TabPanel>
            </div>
            </>
        )
    }

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps
)(FacilityReports);
