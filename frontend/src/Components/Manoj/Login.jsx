import React from 'react'
import { useState,useContext } from 'react'
import './Signup.css'
import { RiEyeFill,RiEyeCloseFill } from "react-icons/ri";
import { Globalcontext } from '../../Context/Context';
import { apiurl } from './Apiurl';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import {Navigate} from 'react-router-dom'
import { Link } from 'react-router-dom';

const initialsate={
    username:"",
    password:""
}

const Login = () => {
    const [pass,setpass]=useState(false)
    const [user,setuser]=useState(initialsate)
    const [toadmin,settoadmin]=useState(false)
    const [tohome,settohome]=useState(false)
    const {token,settoken,userdetails,setuserdetails}=useContext(Globalcontext)
    const toast = useToast()

    const handleuser=(e)=>{
        const {name,value}=e.target
        setuser({...user,[name]:value})
    }

    const loginuser=(e)=>{
        e.preventDefault()
        axios({
            method:'post',
            url:`${apiurl}/login`,
            data:user
        })
        .then((res)=>{
            console.log(res)
            if(res.data.status==='success'){
                setuserdetails(res.data.userData)
                settoken(res.data.token)
                if(res.data.userData.role==='admin'){
                    toast({
                        title: `Admin login successful`,
                        position: 'top',
                        status:'success',
                        isClosable: true,
                      })
                    //   settoadmin(true)
                }else{
                    toast({
                        title: `Login successful`,
                        position: 'top',
                        status:'success',
                        isClosable: true,
                      })
                    //   settohome(true)
                }
            }else{
                toast({
                    title: 'Wrong credentials',
                    position: 'top',
                    status:'error',
                    isClosable: true,
                  })
            }
        })
        .catch((err)=>{
            toast({
                title: 'Wrong credentials',
                position: 'top',
                status:'error',
                isClosable: true,
              })
        })
    }
    if(toadmin){

    }
    // if(tohome){
    //     return <Navigate to='/' />
    // }

    const {username,password}=user
  return (
    <div className='signup'>
        <div className='box'>
            <img src="https://images.meesho.com/images/marketing/1661417516766.webp" alt="signup-box-image" />
            <div>
                <input type="text" name='username' value={username} placeholder='Username' onChange={handleuser} />
                <div>
                    <input type={pass?"text":"password"} name='password' value={password} placeholder='Password' onChange={handleuser}/>
                    <i onClick={()=>setpass(!pass)}>{pass?<RiEyeCloseFill/>:<RiEyeFill/>}</i>
                </div>
                <button className='button' onClick={loginuser}>Login</button>
                <button className='google'>Login with Google</button>
                <p>Dont't have account? <Link to='/signup'><span>Sign Up</span></Link></p>
            </div>
        </div>
    </div>
  )
}

export default Login