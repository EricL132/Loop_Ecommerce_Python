import { Route } from 'react-router-dom'
import { Redirect } from 'react-router'
import { useEffect, useState } from 'react'
const PrivateRoute = ({ component: Component, isAuthenticated, setisAuthenticated, ...rest }) => {
    const [isAuth, setIsAuth] = useState(false)


    return <Route {...rest} render={(props) => (
        isAuthenticated === true
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />


}

export default PrivateRoute