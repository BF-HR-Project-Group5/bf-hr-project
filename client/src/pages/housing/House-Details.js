import React, { useState, useEffect } from "react";
import '../../layout/House.css';
import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { fetchHouse } from '../../redux/actions/index';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

function createData(name, calories, fat) {
    return { name, calories, fat };
}

const rows = [
createData('Joe', "Joe Moulton", 312222223),
createData('Teressa', "Teressa Sung", 312222224),
createData('Yuxin', "Yuxin Kang", 312222222),
createData('Justin', "Tao Yang", 312222225),
];

const HouseDetails = (props) => {
    console.log('props',props)
    const [data,setData] = useState()
    const { fetchHouse } = props;

    useEffect(() => {
        (async function () {
            try {
            const response = await fetchHouse();
                setData(response.house)
            } catch (err) {
            console.log(err);
            }
          })()
      }, []);

    const classes = useStyles();

    return (
        <>
            <div className="row my-5">
                <div className="title">
                    <h2>Address</h2>
                </div>
                <Paper variant="outlined" className="address-container">
                    {/* 3445 S RHODES AVE UNIT 609, Unit #5-0609, CHICAGO, IL 60616 */}
                    {data?.address.line1 + ', ' +
                     data?.address.line2 + ', ' + 
                     data?.address.city + ', ' + 
                     data?.address.state + ', ' + 
                     data?.address.zipcode 
                    }
                </Paper>
            </div>
            <div className="row my-5">
                <div className="title">
                    <h2>List of roommates</h2>
                </div>
                <TableContainer component={Paper}>
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
                                    {row.name.preferred}
                                </TableCell>
                                <TableCell align="right">{row.name.last + ' ' + row.name.first}</TableCell>
                                <TableCell align="right">{row.profile.phone.mobile}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
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
    { fetchHouse }
)(HouseDetails);
