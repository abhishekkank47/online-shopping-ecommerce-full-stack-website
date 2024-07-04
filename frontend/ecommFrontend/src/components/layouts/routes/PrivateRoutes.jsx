import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import axios from 'axios';
import Spinner from '../../Spinner.jsx';
import { useAuth } from '../../../contextApi/auth.jsx';


export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    useEffect(() => {
      const authCheck = async () => {
        const res = await axios.get(`http://localhost:8000/api/v1/auth/user-auth`, {
          headers: {
            Authorization: auth?.token,
            'Content-Type': 'application/json'
          }})
        console.log("auth check response:",res.data)
        if (res.data.ok) {
          setOk(true);
          console.log('response ok is true')
        } else {
          setOk(false);
          console.log('response ok is Not true')
        }
      };
      if (auth?.token) {authCheck();console.log("authcheck working")}
    }, [auth?.token]);
  
    return ok ? <Outlet /> : <Spinner />;
  }

