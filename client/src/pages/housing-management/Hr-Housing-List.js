import React, { useState, useEffect, useRef } from "react";
import '../../layout/House.css';
import { connect } from 'react-redux';
import MaterialTable from "material-table";
import { createComment, fecthAllHouses, updateComment, createHouse, deleteHouse } from '../../redux/actions/index';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {useNavigate} from 'react-router-dom';

const columns = [
		{ title: "Address's line2",field: 'address.line2'},
		{ title: "Address's line1",field: 'address.line1'},
		{ title: "Address's city",field: 'address.city',},
		{ title: "Address's state",field: 'address.state',},
		{ title: "Address's zipcode",field: 'address.zipcode',},
		{ title: "Landlord's full name", field: 'landlord.legalFullName'},
		{ title: "Landlord's email", field: 'landlord.email'},
		{ title: "Landlord's phone", field: 'landlord.phone'},
		{ title: 'Number of employee residents', field: 'numResidents'},
		{ title: "Bed's count", field: 'houseInfo.bedCount'},
		{ title: "Mattress's count", field: 'houseInfo.mattressCount'},
		{ title: "Table's count", field: 'houseInfo.tableCount'},
		{ title: "Chair's count", field: 'houseInfo.chairCount'},
];

const HrHousingList = (props) => {
	const navigate = useNavigate();
    const {fecthAllHouses,createHouse,deleteHouse} = props
    const [data,setData] = useState()
    const reqBody = {address: {}, landlord: {}, numResidents: '', houseInfo: {}}
		const [searchTerm, setSearchTerm] = useState('');
		const [resultCount, setResultCount] = useState(0);
		const tableRef = useRef(null);

    useEffect(()=>{
        (async function () {
            try {
                const res = await fecthAllHouses();
                console.log('res',res)
                setData(res.allHouses)
								setResultCount(res.allHouses.length);
            } catch (err) {
                console.log(err);
            }
        })()
    },[])


    const showViewButton = ()=> {
        return {
            icon: () => <VisibilityIcon />,
            tooltip: 'View Detail',
            onClick: (event, rowData) => {
                navigate('/hrHousingDetail',{state:rowData});
            }
        }
    }

    return (
        <div className='container'>
            {
                data ? (
                <>
							<p className="mb-3" style={{textAlign: 'center'}}>
								{
									`${searchTerm !== '' ? `Searching for "${searchTerm}": ` : ''}${
										resultCount === 1 ? '1 result' : `${resultCount} results`
									} found.`}
							</p>
                <MaterialTable
										tableRef={tableRef}
                    title="House List"
                    columns={columns}
                    data={data}
                    actions={[showViewButton]}
										onSearchChange={() => {
											console.log("onSearchChange:", {state: tableRef.current});
											setResultCount(tableRef.current?.dataManager?.searchedData?.length ?? 0);
											setSearchTerm(tableRef.current?.dataManager?.searchText ?? '');
										}}
                    editable={{
                        onRowDelete: oldData =>
                        new Promise((resolve, reject) => {
                          setTimeout(() => {
                            const dataDelete = [...data];
                            const index = oldData.tableData.id;
                            dataDelete.splice(index, 1);
                            setData([...dataDelete]);
                            resolve();
                            (async function () {
                                try {
                                    const response = await deleteHouse(oldData._id)
                                    console.log('res',response)
                                } catch (err) {
                                console.log(err);
                                }
                            })()
                          }, 1000)
                        }),
                        onRowAdd: newData =>
                            new Promise((resolve, reject) => {
                                console.log('props',props)
                                resolve();
                                (async function () {
                                    try {
                                        reqBody.address.line2 = newData['address.line2']
                                        reqBody.address.line1 = newData['address.line1']
                                        reqBody.address.city = newData['address.city']
                                        reqBody.address.state = newData['address.state']
                                        reqBody.address.zipcode = newData['address.zipcode']
                                        reqBody.houseInfo.bedCount = newData['houseInfo.bedCount']
                                        reqBody.houseInfo.chairCount = newData['houseInfo.chairCount']
                                        reqBody.houseInfo.mattressCount = newData['houseInfo.mattressCount']
                                        reqBody.houseInfo.tableCount = newData['houseInfo.tableCount']
                                        reqBody.landlord.email = newData['landlord.email']
                                        reqBody.landlord.phone = newData['landlord.phone']
                                        reqBody.landlord.legalFullName = newData['landlord.legalFullName']
                                        reqBody.numResidents = newData['numResidents']
                                        const response = await createHouse(reqBody)
                                        // console.log('res',response)
                                        setData([...data, reqBody]);
                                    } catch (err) {
                                    console.log(err);
                                    }
                                })()
                            })
                    }}
                /></>) : (<></>)
            }
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
)(HrHousingList);

