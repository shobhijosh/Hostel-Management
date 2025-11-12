import React, { useState } from 'react'
import './table.css'

const TableRow = (prop)=>{
    if(prop.studentNames !=='' && prop.roomNumbers!==''){
        return(<tr>{prop.content(prop.data,prop.studentNames,prop.roomNumbers,prop.modal)}</tr>)
    }
    else{
        return (<tr>{prop.content(prop.data,prop.modal)}</tr>)
    }
}

const TableComp = (prop) => {
    const {heading,data,row} = prop
    const studentNames = prop.studentName || []
    const roomNumbers = prop.roomNum || []
    const conditionalProps = {}
    if(prop.modal){
        conditionalProps.modal = prop.modal
    }
    if(!data){
        return (
            <p style={{position:'absolute',left:'50%',transform:'translateX(50%)'}}>{"No Records Found"}</p>
        )
    }

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
                    {data && data.map((value,index)=>{
                        return <TableRow key={index} data={value} content={row} studentNames={studentNames[index]} roomNumbers={roomNumbers[index]} {...conditionalProps}/>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TableComp
