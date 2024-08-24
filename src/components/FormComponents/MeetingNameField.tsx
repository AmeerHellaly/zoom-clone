import { EuiFieldText, EuiFormRow } from '@elastic/eui'
import React from 'react'
import ThemeSelector from '../../ThemeSelector'

function MeetingNameField({label,placeholder,value,setMettingnName,isInvalid,error}:{
  label:string,
  placeholder:string,
  value:string,
  setMettingnName:React.Dispatch<React.SetStateAction<string>>,
  isInvalid:boolean,
  error:Array<string>
}) {
  return (

  <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
    <EuiFieldText 
     placeholder={placeholder} value={value} onChange={e=>setMettingnName(e.target.value)} />
  </EuiFormRow>

  )
}

export default MeetingNameField