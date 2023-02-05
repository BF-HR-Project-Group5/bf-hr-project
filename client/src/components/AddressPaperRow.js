import React from 'react';
import { Paper } from '@material-ui/core';

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
				<div className="col-12 mx-auto">
					<p>{address?.line1}</p>
					<p>{address?.line2}</p>
					<p>
						{`${address?.city}, ${address?.state} ${address?.zipcode}`}
					</p>
				</div>
			</Paper>
		</div>
	);
}

export default AddressPaperRow;
