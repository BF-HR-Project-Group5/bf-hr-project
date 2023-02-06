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
			>
				<div className="col-4 mx-auto">
					<label>Address Line 1:</label>
					<p>{address?.line1}</p>
				</div>
				<div className="col-4 mx-auto">
					<label>Address Line 2:</label>
					<p>{address?.line2}</p>
				</div>
				<div className="col-4 mx-auto">
					<label>City:</label>
					<p>{address?.city}</p>
				</div>
				<div className="col-4 mx-auto">
					<label>State:</label>
					<p>{address?.state}</p>
				</div>
				<div className="col-4 mx-auto">
					<label>Zipcode:</label>
					<p>{address?.zipcode}</p>
				</div>
			</Paper>
		</div>
	);
}

export default AddressPaperRow;
