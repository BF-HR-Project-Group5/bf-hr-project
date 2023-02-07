import React from 'react';
import { Paper } from '@material-ui/core';
import '../layout/AddressPaperRow.css';

function AddressPaperRow({ rowClasses, paperClasses, address }) {
	return (
		<div className={rowClasses}>
			<div className="title">
				<h2>Address</h2>
			</div>
			<Paper
				variant="outlined"
				className={paperClasses}
				style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr'}}
			>
				<div>
					<label>Address Line 1:</label>
					<p>{address?.line1}</p>
				</div>
				<div>
					<label>Address Line 2:</label>
					<p>{address?.line2}</p>
				</div>
				<div style={{gridRowStart: '2'}}>
					<label>City:</label>
					<p>{address?.city}</p>
				</div>
				<div style={{gridRowStart: '2'}}>
					<label>State:</label>
					<p>{address?.state}</p>
				</div>
				<div style={{gridRowStart: '2'}}>
					<label>Zipcode:</label>
					<p>{address?.zipcode}</p>
				</div>
			</Paper>
		</div>
	);
}

export default AddressPaperRow;
