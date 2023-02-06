import React, { useState, useEffect } from "react";
import '../../layout/House.css';
import { connect } from 'react-redux';
import Link from '@material-ui/core/Link';
import MaterialTable from "material-table";
import { createComment } from '../../redux/actions/index';
import { updateComment } from '../../redux/actions/index';
import {useLocation} from 'react-router-dom';
const columns = [
        { title: 'Description', field: 'description' },
        { title: 'Created By', field: 'createdBy.username', initialEditValue: 'initial edit value', editable: 'never' },
        { title: 'Timestamp', field: 'updatedAt', editable: 'never' },
    ];

const HrHousingComment = (props) => {
    console.log('props',props)
    const { createComment, updateComment } = props
	const location = useLocation();
    const [data,setData] = useState(location.state.comments)
    console.log('location',location)

    return (
        <div className='container'>            
            <MaterialTable
                title="Add/Edit Comments"
                columns={columns}
                data={data}
                editable={{
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        newData.createdBy = {}
                        newData.createdBy.username = props.auth.user.username
                        const d = new Date();
                        const n = d.toLocaleDateString();
                        newData.updatedAt = n
                        console.log('newData',newData)
                        setData([...data, newData]);
                        resolve();
                        (async function () {
                            try {
                                console.log('location',location)
                                const reportId = location.state._id
                                const response = await createComment(reportId, newData)
                                console.log('res',response)
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
                        setData([...dataUpdate]);
                        resolve();
                        (async function () {
                            try {
                                console.log('oldData',oldData)
                                console.log('newData',newData)
                                const response = await updateComment(newData)
                                console.log('res',response)
                            } catch (err) {
                                console.log(err);
                            }
                        })()
                    }),
                }}
            />
        </div>
    )
}

const mapStateToProps = ({ auth, house }) => ({
    auth,
    house
});

export default connect(
    mapStateToProps,
    {createComment, updateComment}
)(HrHousingComment);
