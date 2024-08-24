import { onAuthStateChanged } from 'firebase/auth'
import React ,{useEffect}from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { firebaseAuth } from '../utils/FirebaseConfig'
import { setUser } from '../app/slices/AuthSlice'

function useAuth() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    useEffect(()=>{
const unsubsucribe=onAuthStateChanged(firebaseAuth,(currenUser)=>{
  
    if(!currenUser) navigate('/login')
    else {
dispatch(setUser({
    uid:currenUser.uid,
    email:currenUser.email,
    name:currenUser.displayName,

}))}
})
return ()=>unsubsucribe()
    },[dispatch,navigate])
 
}

export default useAuth