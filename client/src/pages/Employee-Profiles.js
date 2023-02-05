import React, { useState,  useEffect, useRef  } from 'react';
import { useNavigate } from 'react-router-dom';
import '../layout/House.css';
import { connect } from 'react-redux';
import Navigation from '../components/navigation/navigation';
import MaterialTable from 'material-table';
import { fetchAllProfiles } from '../redux/actions';

const columns = [
	{ title: 'Name', field: 'name' },
	{ title: 'SSN', field: 'ssn', initialEditValue: 'initial edit value', editable: 'never' },
	{ title: 'Work Authorization Title', field: 'workAuthTitle', editable: 'never' },
	{ title: 'Phone Number', field: 'phoneNumber', editable: 'never' },
	{ title: 'Email', field: 'email', editable: 'never' },
];

const EmployeeProfiles = (props) => {
	const navigate = useNavigate();
	console.log('props', props);

	const [data, setData] = useState([]);
	const [resultCount, setResultCount] = useState(0);
	const [loading, setLoading] = useState(true);
	const tableRef = useRef();
	// { userId :'23545', name: 'Tao Yang', ssn: '1234568', workAuthTitle: 'OPT', phoneNumber:'13127458784', email: '55656@gmail.com' }
	useEffect(() => {
		(async function () {
			try {
				const response = await props.fetchAllProfiles();
				// console.log('response', response);
				let users = [];
				response.users.forEach((item, index) => {
					// console.log('item', item);
					if (item?.profile) users.push(item);
				});
				users.sort((a, b) => a.name.last - b.name.last);
				const adjustedUsers = users.map(u => ({
					userId: u._id,
					name: `${u.name.preferred ? u.name.preferred : u.name.first} ${u.name.last}`,
					ssn: u.profile.ssn,
					workAuthTitle: u.profile.workAuth.title,
					phone: u.profile.phone.mobile,
					email: u.email,
				}))
				console.log('sorted:',{users, adjustedUsers});
				setData(adjustedUsers);
				setResultCount(adjustedUsers.length);
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	const handleClick = (event) => {
		console.log('event', event);
	};

	return (
		<>
			<Navigation />
			<div className="container">
				<div className="container">
					{!loading && (
						<>
							<MaterialTable
								tableRef={tableRef}
								title="Employees List"
								columns={columns}
								data={data}
								onRowClick={(event, rowData) => {
									console.log('rowData', rowData);
									navigate('/personalInfo?userId=' + rowData.userId);
								}}
								onSearchChange={() => {
									setResultCount(tableRef.current.DataManager.filteredData.length);
								}}
							/>
							<p>
								{!loading && `${resultCount === 1 ? '1 result' : `${resultCount} results`} found.`}
							</p>
						</>
					)}
				</div>
			</div>
		</>
	);
};

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default connect(mapStateToProps, 
    {fetchAllProfiles}
	)(EmployeeProfiles);
