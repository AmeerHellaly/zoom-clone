import { EuiGlobalToastList, EuiProvider, EuiThemeColorMode, EuiThemeProvider } from '@elastic/eui'

import React, { useEffect, useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useAppDispatch, useAppSelector } from './app/hooks'
import ThemeSelector from './ThemeSelector'
import CreateMeeting from './pages/CreateMeeting'
import OneOnOneMeeting from './pages/OneOnOneMeeting'
import { setToasts } from './app/slices/MettingSlice'
import VideoConfrence from './pages/VideoConfrence'
import MyMeetings from './pages/MyMeetings'
import Meetings from './pages/Meetings'
import JoinMeeting from './pages/JoinMeeting'
function App() {
const dispatch=useAppDispatch()
const toasts=useAppSelector((zoom)=>zoom.meeting.toasts)

const removeToast=(removeToast:{id:string})=>{
dispatch(setToasts(
toasts.filter((toasts:{id:string})=>toasts.id !== removeToast.id)
))}

    return (
      <ThemeSelector>
  <EuiProvider colorMode={'LIGHT'}>
    
<Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/create' element={<CreateMeeting/>}/>
  <Route path='/create1on1' element={<OneOnOneMeeting/>}/>
  <Route path='/videoconference' element={<VideoConfrence/>}/>
  <Route path='/mymeetings' element={<MyMeetings/>}/>
  <Route path='/join/:id' element={<JoinMeeting/>}/>
  <Route path='/meetings' element={<Meetings/>}/>
  <Route path='/' element={<Dashboard/>}/>
  <Route path='/*' element={<Dashboard/>}/>
</Routes>
<EuiGlobalToastList
            toasts={toasts}
            dismissToast={removeToast}
            toastLifeTimeMs={4000}
          />

  </EuiProvider>
  </ThemeSelector>
  )
}

export default App
