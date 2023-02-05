import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper } from '@material-ui/core';
import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

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

const OnboardingTable = (props) => {
    console.log('props',props)
    const navigate = useNavigate();
    const classes = useStyles();
    const data = []

    props.data.forEach((item,index) => {
        if(item.profile.status == props.status){
            data.push(item)
        }
    });

    const handleClick = (index,row,e)=> {
        console.log('data',row)
        navigate('/onboardingAppDetail',{state:row});
    }

    return (
        <>
         {
            data.length > 0 ? (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className="tableHead">
                            <TableRow>
                                <TableCell>Full name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((row,index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {row.name?.last + ' ' + row.name?.first}
                                    </TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            onClick={(e)=>{handleClick(index,row,e)}}>
                                            View Application
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            ) : (<>No record to display</>)
         }
        </>
    )
}

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps
)(OnboardingTable);
