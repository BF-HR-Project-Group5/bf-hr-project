import { connect } from "react-redux";
import Login from "../../pages/Login";
// import {Outlet} from 'react-router-dom';

// const GuardRouteAuth = ({ auth, children }) => {
// 	console.log('GuardRouteAuth', {auth});
// 		return (auth?.user ? <>{children}</> : <Login />)
// 		// return (auth?.user ? <Outlet/> : <Login />)

// }

function GuardRouteAuth({auth, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return auth?.user !== undefined ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

const mapStateToProps = ({ auth }) => ({
	auth,
});

export default connect(mapStateToProps)(GuardRouteAuth);
