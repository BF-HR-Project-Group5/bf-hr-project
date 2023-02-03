import React, { useState } from "react";
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
import { createReport } from '../../redux/actions/index';
import { fetchHouse } from '../../redux/actions/index';
import { Link, withRouter } from 'react-router-dom';

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

    const FacilityReports = (props) => {
        console.log('props',props)
        const classes = useStyles();
        const [value, setValue] = React.useState({'title':'','description':''});
        const [formData, setFormData] = useState(null);
        const { fetchHouse } = props;

        const handleChange = (event, newValue) => {
            console.log('event',event)
            setValue(newValue);
        };

        const onSubmit = (data) => {
            console.log('data',data)
            const promise = createReport(data)
            promise().then((res)=>{
                console.log('res-createReport',res)
            })
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
                onSubmit={onSubmit}
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
                            {props.house.reports.map((row,index) => (
                                <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.title}
                                </TableCell>
                                <TableCell align="right">{row.description}</TableCell>
                                <TableCell align="right">{row.createdBy}</TableCell>
                                <TableCell align="right">{row.updatedAt}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                                <TableCell align="right">
                                    {/* <Link to={{pathname:`/housing/comments?reportId=${row._id}`}}> */}
                                    <Link to={{pathname:`/housing/comments`, state: row._id}}>
                                        <Button>View Comments</Button>
                                    </Link>
                                    {/* <Button onClick={(e)=>{handleClick(index,row,e)}}>View Comments</Button> */}
                                </TableCell>
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

const mapStateToProps = ({ auth, house }) => ({
    auth,
    house
});

export default connect(
    mapStateToProps,
    {fetchHouse}
)(FacilityReports);
