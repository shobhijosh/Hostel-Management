import React from 'react'
import './table.css'

const TableRow = ({data,content})=>{
    return(
        <tr>
            {content(data)}
        </tr>
    )
}

const TableComp = (prop) => {
    const {heading,data,row} = prop
    return (
        <div className='table-container'>
            <table className='table'>
                <thead>
                    <tr>
                        {heading.map((value,index)=>{
                            return <th key={index}>{value}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((value,index)=>{
                        return <TableRow key={index} data={value} content={row} />
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableComp
