import React, { useState } from "react";
import '../layout/House.css';
import { connect } from 'react-redux';
import Navigation from '../components/navigation/navigation';
import MaterialTable from "material-table";
 
const EmployeeProfiles = (props) => {
    console.log('props',props)
    const [columns, setColumns] = useState([
        { title: 'Name', field: 'name' },
        { title: 'SSN', field: 'ssn', initialEditValue: 'initial edit value', editable: 'never' },
        { title: 'Work Authorization Title', field: 'workAuthTitle', editable: 'never' },
        { title: 'Phone Number', field: 'phoneNumber', editable: 'never' },
        { title: 'Email', field: 'email', editable: 'never' },
    ]);
    
      const [data, setData] = useState([
        { userId :'23545', name: 'Tao Yang', ssn: '1234568', workAuthTitle: 'OPT', phoneNumber:'13127458784', email: '55656@gmail.com' },
        { userId :'67688', name: 'Teressa Sung', ssn: '657657', workAuthTitle: 'Green Card', phoneNumber:'13127458784', email: '55656@gmail.com' },
        { userId :'73478', name: 'Joe Moulton', ssn: '98090', workAuthTitle: 'Citizen', phoneNumber:'13127458784', email: '55656@gmail.com' },
    ]);

    const handleClick = (event)=>{
        console.log('event',event)
    }

    return (
        <>
            <Navigation />
            <div className='container'>            
                <div className='container'>            
                <MaterialTable
                    title="Employees List"
                    columns={columns}
                    data={data}
                    onRowClick={(event, rowData) => {
                        console.log("rowData",rowData)
                        window.location.href = '/personalInfo?userId=' + rowData.userId
                        // props.history.push({pathname: '/personalInfo?userId=' + rowData.userId})
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
)(EmployeeProfiles);

