import React, { useState, useEffect } from "react";
import '../../layout/House.css';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Navigation from '../../components/navigation/navigation';
import MaterialTable from "material-table";
import { createComment } from '../../redux/actions/index';
import { updateComment } from '../../redux/actions/index';
import {useLocation} from 'react-router-dom';

    const columns = [
        { title: 'Description', field: 'description' },
        { title: 'Created By', field: 'createdBy', initialEditValue: 'initial edit value', editable: 'never' },
        { title: 'Timestamp', field: 'updatedAt', editable: 'never' },
    ];
    
const Comments = (props) => {
    console.log('props',props)
    const location = useLocation();
    console.log('location',location)
    const { createComment, updateComment } = props
    const reportId = location.state


    
    const [data, setData] = useState([]);

    useEffect(() => {
        (async function () {
            try {
                props.house.reports.forEach(element => {
                    if(element._id == reportId){setData(element.comments)}
                    return
                });
            } catch (err) {
            console.log(err);
            }
        })()
    }, []);

    return (
        <>
            <Navigation />
            <div className='container'>            
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" href="/housing">
                        Housing
                    </Link>
                    <Typography className="facilityReportsNav" color="textPrimary">Facility Reports</Typography>
                    <Typography color="textPrimary">Comments</Typography>
                </Breadcrumbs>
                <div className='container'>            
                    <MaterialTable
                        title="Add/Edit Comments"
                        columns={columns}
                        data={data}
                        editable={{
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                console.log('props',props)
                                newData.createdBy = props.auth.user.username
                                const d = new Date();
                                const n = d.toLocaleDateString();
                                newData.updatedAt = n
                                resolve();
                                (async function () {
                                    try {
                                        const response = await createComment(reportId, newData)
                                        console.log('res',response)
                                        setData([...data, newData]);
                                    } catch (err) {
                                    console.log(err);
                                    }
                                })()
                            }),
                        onRowUpdate: (newData, oldData) =>
                            new Promise((resolve, reject) => {
                                const dataUpdate = [...data];
                                const index = oldData.tableData.id;
                                dataUpdate[index] = newData;
                                resolve();
                                (async function () {
                                    try {
                                        const response = await updateComment(newData)
                                        console.log('res',response)
                                        setData([...dataUpdate]);
                                    } catch (err) {
                                        console.log(err);
                                    }
                                })()
                            }),
                        }}
                    />
                </div>
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
    {createComment, updateComment}
)(Comments);




  
