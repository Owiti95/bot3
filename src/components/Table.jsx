import React from 'react';

const Table = ({ headers, rows }) => (
<div className='scroll'>
    <table className='table'>
        <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={index}>{header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
                {rows.length > 0 ? rows : <tr><td>No data</td></tr>}
        </tbody>
    </table>
</div>    
);

export default Table;