import React from 'react';
import { connect } from 'react-redux';
import { doLogout } from '../actions';

const mapStateToProps = ({isLoggedIn = false}) => ( { isLoggedIn } );

export default connect(mapStateToProps)(props => {
	const {isLoggedIn, dispatch, history} = props;
	
	return (
		<header>
			<nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
				<a className="navbar-brand" href="/">User App</a>
				<div className="collapse navbar-collapse" id="navbarCollapse">
					<ul className="navbar-nav mr-auto"></ul>
					<div className="form-inline mt-2 mt-md-0">
						<button className="btn btn-outline-success my-2 my-sm-0" onClick={() => {
							isLoggedIn ? dispatch(doLogout()) : history.push('/login');
						}}>
							{isLoggedIn ? 'Logout' : 'Login' }
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
});
