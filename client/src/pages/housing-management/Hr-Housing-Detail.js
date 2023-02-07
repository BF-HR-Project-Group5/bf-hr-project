import React, { useState, useEffect } from "react";
import '../../layout/Personal-Information.css';
import '../../layout/hr-housing-detail.css';
import { connect } from 'react-redux';
import MaterialTable from "material-table";
import { createComment, fecthAllHouses, updateComment, createHouse, deleteHouse } from '../../redux/actions/index';
import {useLocation} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Button} from '@material-ui/core';

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

const columns = [
        { title: "Address's line2",field: 'address.line2'},
    ]

const HrHousingDetail = (props) => {
    console.log('props',props)
    const classes = useStyles();
	const navigate = useNavigate();
    const location = useLocation();
    const {houseInfo,reports,roommates} = location.state

    const handleClickToComment = (index,row,e)=>{
        navigate('/hrHousingComment',{state:row});
    }

    const handleClickToProfile = (index,row,e)=>{
        navigate('/personalInfo?userId=' + row.userId);
    }

    return (
        <div className="container">
			<div className="row my-5">
                <div className="title">
                    <h2>Facility Information</h2>
                </div>
                <Paper variant="outlined" className="my-2">
                    <div className="col-3 mx-auto">
						<label>Number of beds:</label>
                        <span>{houseInfo.bedCount}</span>
                    </div>
                    <div className="col-3 mx-auto">
						<label>Number of mattresses:</label>
                        <span>{houseInfo.chairCount}</span>
                    </div>
                    <div className="col-3 mx-auto">
						<label>Number of tables:</label>
                        <span>{houseInfo.mattressCount}</span>
                    </div>
                    <div className="col-3 mx-auto">
						<label>Number of chairs:</label>
                        <span>{houseInfo.tableCount}</span>
                    </div>
                </Paper>
            </div>
			<div className="row my-5">
                <div className="title">
                    <h2>Reports Information</h2>
                </div>
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
                        {reports?.map((row,index) => (
                            <TableRow key={index}>
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="right">{row.description}</TableCell>
                            <TableCell align="right">{row.createdBy.name.last + ' ' + row.createdBy.name.first}</TableCell>
                            <TableCell align="right">{row.updatedAt}</TableCell>
                            <TableCell align="right">{row.status}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="primary" onClick={(e)=>{handleClickToComment(index,row,e)}}>View Comments</Button>
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className="row my-5">
                <div className="title">
                    <h2>Employee Information</h2>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead className="tableHead">
                            <TableRow>
                                <TableCell>Full name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Phone number</TableCell>
                                <TableCell align="right">Car information</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roommates?.map((row,index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        <a className="nameBtn" onClick={(e)=>{handleClickToProfile(index,row,e)}}>
                                            {row.name.last + ' ' + row.name.first}
                                        </a>
                                    </TableCell>
                                    <TableCell align="right">{row.email}</TableCell>
                                    <TableCell align="right">{row.profile.phone.mobile}</TableCell>
                                    <TableCell align="right">
                                        {row.profile.car.make + ', ' +
                                         row.profile.car.color + ', ' +
                                         row.profile.car.model
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    )
}

const mapStateToProps = ({ auth, house }) => ({
    auth,
    house
});

export default connect(
    mapStateToProps,
    {createComment, updateComment, fecthAllHouses, createHouse, deleteHouse}
)(HrHousingDetail);
