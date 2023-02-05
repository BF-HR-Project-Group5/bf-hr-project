import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import {Button} from '@material-ui/core';
import '../../layout/House.css';
import { useForm } from 'react-hook-form';
import { sendInvites, getAllInvites } from '../../redux/actions/index';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
    const {sendInvites,getAllInvites} = props
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(()=>{
        const promise = getAllInvites()
        promise.then((res)=>{
            console.log('res',res)
        })
    })

    const onSubmit = (data) => {
        console.log(data)
        const promise = sendInvites(
            {'email':data.email,'name':{'first':data.firstName,'last':data.lastName}}
        )
        promise.then((res)=>{
            console.log('res',res)
        })
    };
    console.log(errors);

    const handleClick = ()=> {
        
    }

    return (
        <>
            <div className="row my-5 mb-3">
                <Paper variant="outlined" className="container">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="First name" {...register("firstName", {required: true, maxLength: 80})} />
                        <input type="text" placeholder="Last name" {...register("lastName", {required: true, maxLength: 100})} />
                        <input type="text" />
                        <TextField 
                        placeholder="Email" 
                        id="outlined-basic" 
                        label="Outlined" 
                        variant="outlined" 
                        {...register("email", {required: true, pattern: /^\S+@\S+$/i})}
                        />
                        <input type="submit" />
                    </form>
                    {/* <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={(e)=>{handleClick(e)}}>
                       
                    </Button> */}
                </Paper>
            </div>
            <div className="row my-5">
                <div className="title">
                    <h2>Registration History</h2>
                </div>
                {/* <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className="tableHead">
                            <TableRow>
                                <TableCell>Preferred name</TableCell>
                                <TableCell align="right">Full name</TableCell>
                                <TableCell align="right">Phone number</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {data?.roommates.map((row,index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.name?.preferred}
                                </TableCell>
                                <TableCell align="right">{row.name?.last + ' ' + row.name?.first}</TableCell>
                                <TableCell align="right">{row?.profile?.phone.mobile}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer> */}
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