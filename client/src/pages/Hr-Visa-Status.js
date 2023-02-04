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
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import {Button} from '@material-ui/core';
import { fetchAllProfiles } from '../redux/actions/index';
import { Link, withRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Chip from '@material-ui/core/Chip';

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

const HrVisaStatus = (props) => {
    console.log('props',props)
    const [data,setData]  = useState()
    const classes = useStyles();
    const {fetchAllProfiles} = props
    const navigate = useNavigate();

    useEffect(() => {
        (async function () {
            try {
                const response = await fetchAllProfiles();
                console.log('response',response)
                let users = []
                response.users.forEach((item,index) => {
                    console.log('item',item)
                    if(item.role == 'user' && item.profile){users.push(item)}
                });
                setData(users)
            } catch (err) {
            console.log(err);
            }
          })()
      }, []);

      const handleClick = (index,row,e)=> {
        console.log('data',row)
        navigate('/hrVisaStatus/doc',{state:row});
      }
                       
    return (
        <div className="container">
            {console.log('data',data)}
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead className="tableHead">
                        <TableRow>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Work Authorization</TableCell>
                            <TableCell align="right">Next steps</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data?.map((row,index) => (
                        <TableRow key={index}>
                        <TableCell component="th" scope="row">
                            {row.name.last + ' ' + row.name.first}
                        </TableCell>
                        <TableCell align="right">
                            <p>{'Title: ' + row.profile.workAuth.title}</p>
                            <p>{'Start Date: ' + row.profile.workAuth.startDate}</p>
                            <p>{'End Date: ' + row.profile.workAuth.endDate}</p>
                            <p>{'Remaining days: ' + row.profile.workAuth.daysRemaining}</p>
                        </TableCell>
                        <TableCell align="right">{row.profile.nextStep}</TableCell>
                        <TableCell align="right">
                            <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={(e)=>{handleClick(index,row,e)}}>
                                View document
                            </Button>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps,
    {fetchAllProfiles}
)(HrVisaStatus);