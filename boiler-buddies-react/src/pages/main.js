import React, { useState } from "react";
import useUser from "../hooks/useUser";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Main() {
    const currentUser = useUser()

    const [loggedIn, setLoggedIn] = useState(false)

	useEffect(() => {
		if(currentUser.loggedIn) {
			setLoggedIn(true)
		} else {
            setLoggedIn(false)
        }
	}, [currentUser.loggedIn])

    return (
    <>
    {loggedIn ? <Navigate to='/feed' />
    : <Navigate to='/signin' /> }
    </>
    )
}