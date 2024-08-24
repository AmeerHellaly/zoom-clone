import React from 'react'
import { EuiDatePicker, EuiFormRow } from '@elastic/eui'
import moment from 'moment'

export default function MettingDateField({
    selected,
setStartDate
}:{
    selected:moment.Moment;
    setStartDate:React.Dispatch<React.SetStateAction<moment.Moment>>;
}) {
  return (
    <EuiFormRow>
   <EuiDatePicker selected={selected} onChange={(date)=>setStartDate(date!)}/>
   </EuiFormRow>
  )
}
