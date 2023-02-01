import React, { useState } from "react";
import '../../layout/House.css';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Navigation from '../../components/navigation/navigation';
import MaterialTable from "material-table";
  
const rows = [
{ id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
{ id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
{ id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
];

const Comments = (props) => {
    const [columns, setColumns] = useState([
        { title: 'Description', field: 'description' },
        { title: 'Created By', field: 'createdBy', initialEditValue: 'initial edit value', editable: 'never' },
        { title: 'Timestamp', field: 'timestamp', editable: 'never' },
      ]);
    
      const [data, setData] = useState([
        { description: 'Mehmet', createdBy: 'Baran', timestamp: '2/1/2023' },
        { description: 'Zerya Betül', createdBy: 'Baran', timestamp: '1/31/2023' },
      ]);

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
                    setTimeout(() => {
                        console.log('data',data)
                        console.log('newData',newData)
                        newData.createdBy = 'Tao'
                        const d = new Date();
                        const n = d.toLocaleDateString();
                        newData.timestamp = n
                        setData([...data, newData]);
                        resolve();
                    }, 1000)
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                    setTimeout(() => {
                        const dataUpdate = [...data];
                        const index = oldData.tableData.id;
                        dataUpdate[index] = newData;
                        setData([...dataUpdate]);
                        resolve();
                    }, 1000)
                    }),
                }}
                />
            </div>
        </div>
        </>
    )
}


const mapStateToProps = ({ auth }) => ({
    auth
});

export default connect(
    mapStateToProps
)(Comments);




  