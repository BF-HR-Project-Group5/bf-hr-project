import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import {Button} from '@material-ui/core';
import '../../layout/House.css';
import { useForm } from 'react-hook-form';
import { sendInvites, getAllInvites } from '../../redux/actions/index';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import {
	StyledForm,
	StyledStack,
} from '../../components/styled-components/login-register/login-register';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
}));

const RegistrationToken = (props) => {
    const classes = useStyles();
    const [allInvites,setAllInvites] = useState([])
    const [curInvites,setCurInvites] = useState({})
    const {sendInvites,getAllInvites} = props
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(()=>{
        const promise = getAllInvites()
        promise.then((res)=>{
            console.log('res',res)
            setAllInvites(res.invites)
        })
    },[curInvites])

    const onSubmit = (data) => {
        console.log(data)
        const promise = sendInvites(
            {'email':data.email,'name':{'first':data.firstName,'last':data.lastName}}
        )
        promise.then((res)=>{
            console.log('res',res)
            setCurInvites(res)
        })
    };

    return (
        <>
            <div className="row my-5 mb-3">
                <div className="title">
                    <h2>Registration Token</h2>
                </div>
                <Paper variant="outlined" className="container">
                    <StyledForm className="RegTokenForm" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
				        <StyledStack>
                            <TextField 
                            placeholder="First name" 
                            {...register("firstName", {required: true, maxLength: 80})} 
                            id="outlined-basic" 
                            label="First name" 
                            variant="outlined" 
                            />
                            <TextField 
                            placeholder="Last name" 
                            {...register("lastName", {required: true, maxLength: 100})}
                            id="outlined-basic" 
                            label="Last name" 
                            variant="outlined" 
                            />
                            <TextField 
                            placeholder="Email" 
                            id="outlined-basic" 
                            label="Email" 
                            variant="outlined" 
                            {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                            />
                        </StyledStack>
                        <Button 
                        className="RegTokenBtn" 
                        type="submit" 
                        variant="contained" 
                        fullWidth>
                            Generate token and send email
                        </Button>
                    </StyledForm>
                </Paper>
            </div>
            <div className="row my-5">
                <div className="title">
                    <h2>Registration History</h2>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className="tableHead">
                            <TableRow>
                                <TableCell>Full name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Registration link</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {allInvites?.map((row,index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.name?.last + ' ' + row.name?.first}
                                </TableCell>
                                <TableCell align="right">{row.email}</TableCell>
                                <TableCell align="right">{row.link}</TableCell>
                                <TableCell align="right">
						            <Chip 
                                        color={row.isRegistered?'primary':'secondary'} 
                                        size="small" 
                                        label={row.isRegistered?'registered':'unregistered'} 
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps,
    {sendInvites,getAllInvites}
)(RegistrationToken);