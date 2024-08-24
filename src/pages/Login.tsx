import React from 'react'
import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiImage, EuiPanel, EuiProvider, EuiSpacer, EuiText, EuiTextColor } from '@elastic/eui'
import animation from '../assets/animation.gif'
import logo from '../assets/logo.png'
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth'
import { firebaseAuth, useRef } from '../utils/FirebaseConfig'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { setUser } from '../app/slices/AuthSlice'
function Login() {
  const navigate=useNavigate()
  const dispatch=useAppDispatch()

  onAuthStateChanged(firebaseAuth,(currentUser)=>{
    if(currentUser) navigate('/')
  })
  const login =async()=>{
    const provider=new GoogleAuthProvider()
    const
    {
      user: {displayName,email,uid},
    }
   =await signInWithPopup(firebaseAuth,provider)
    if(email){
      const firststoreQuery=query(useRef,where("uid","==",uid))
      const fetchedUsers=await getDocs(firststoreQuery)
      if(fetchedUsers.docs.length===0){
        await addDoc(useRef,{
          uid,name:displayName,email
        })
      }
    }
    dispatch(setUser({uid,name:displayName,email}))
    navigate('/')
  }
  return (
    <EuiProvider colorMode='dark'>
<EuiFlexGroup alignItems='center' justifyContent='center' style={{width:"100vw",height:"100vh"}}>
  <EuiFlexItem grow={false}>
    <EuiPanel paddingSize='xl'>
      <EuiFlexGroup justifyContent='center' alignItems='center'>
      <EuiFlexItem>


<EuiImage src={animation} alt='logo'/>
</EuiFlexItem>
<EuiFlexItem>        
    <EuiImage src={logo} alt='logo' size={'230px'}/>
    <EuiSpacer size="xs" />
            <EuiText textAlign="center" grow={false}>
              <h3>
                <EuiTextColor>One Platform to</EuiTextColor>
                <EuiTextColor color="#0b5cff"> connect</EuiTextColor>
              </h3>
            </EuiText>
            <EuiSpacer size='l'/>
            <EuiButton fill onClick={login}>Login with Google</EuiButton>
</EuiFlexItem>

      </EuiFlexGroup>
    </EuiPanel>

  </EuiFlexItem>
</EuiFlexGroup>
    </EuiProvider>
  )
}
export default Login