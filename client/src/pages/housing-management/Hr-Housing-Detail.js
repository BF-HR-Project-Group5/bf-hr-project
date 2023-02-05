import React, { useState, useEffect } from "react";
import '../../layout/Personal-Information.css';
import '../../layout/hr-housing-detail.css';
import { connect } from 'react-redux';
import MaterialTable from "material-table";
import { createComment, fecthAllHouses, updateComment, createHouse, deleteHouse } from '../../redux/actions/index';
import {useLocation} from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';

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

const HrHousingDetail = (props) => {
    console.log('props',props)
    const classes = useStyles();
    const location = useLocation();
    const {houseInfo} = location.state
    console.log('location',location.state)
    const [columns, setColumns] = useState([
        { title: "Address's line2",field: 'address.line2'},
    ]);

    const handleClick = ()=>{
        navigate('/housing/comments',{state:houseInfo});
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