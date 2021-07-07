import React from 'react'
import EnhancedTable from '../../component/DynTable/table'
import Labelbox from '../../helpers/labelbox/labelbox';
export default function CheckListView(props){
    const header = [
        { id: 'checklist', label: 'CheckList Name' },
        { id: 'startdate', label: 'Start Date' },
        { id: 'endmonth', label: 'End Month' },
        { id: 'week', label: 'Days Of Week' },
      ];
      const Rows =[
          {checklist:"Checklist1",startdate:"15/06/2021",endmonth:"Septemper",week:"7"}
      ]
   return(
       <div>
            <div className="mainHeading">CheckList Assigning View</div>
            <div className="clAssignFields_card">
            <div className="label_div_card"><Labelbox type="select" labelname="Employee"/></div>
            <EnhancedTable 
                headCells={header}
                rows={Rows}
                aligncss="aligncss" /> 
            </div>
       </div>
   )
}