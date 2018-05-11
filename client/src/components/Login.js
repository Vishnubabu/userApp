import React from 'react';
import { Button, FormGroup } from 'react-bootstrap';
import { doLogin, loginBoxChanged } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = ({loginBox: {email = '', password = '', emptyEmail = false, emptyPassword = false, loginError = false} = {}, isLoggedIn = false}) => (
	{ email, password, emptyEmail, emptyPassword, loginError, isLoggedIn }
);

class Login extends React.Component {
    doLogin(evt) {
        evt.stopPropagation();
        evt.preventDefault();

		const {email, password, dispatch} = this.props;
		
		let error = false;
		
		if(!email){
			dispatch(loginBoxChanged({emptyEmail: true}));
			error = true;
		}
		
		if(!password){
			dispatch(loginBoxChanged({emptyPassword: true}));
			error = true;
		}
		
		if(error){
			return;
		}
		
		dispatch(loginBoxChanged({loginError: false}));
		dispatch(doLogin({email, password}));
    }
    
    redirectIfLoggedIn(props){
		const {isLoggedIn, history} = props;

		if(isLoggedIn) {
			history.push('/details');
		}
	}

    componentWillReceiveProps(props) {
		this.redirectIfLoggedIn(props);
    }

    componentWillMount(props) {
		this.redirectIfLoggedIn(this.props);
    }

    render() {
        const {dispatch, email, password, emptyEmail, emptyPassword, loginError} = this.props;

        return (
            <form onSubmit={ this.doLogin.bind(this) } className="col col-lg-3">
				<h2>Log in.</h2>
				<p>Use a local account to log in.</p>

				<FormGroup>
					<label htmlFor="email" className="control-label">Email</label>
					<input type="text" className="form-control" name="email" title="Please enter you email" placeholder="example@gmail.com"
						value={email} onChange={ e => dispatch(loginBoxChanged({email: e.target.value, emptyEmail: false})) }/>
					
					{ emptyEmail && (<span className="help-block">Email required.</span>) }
				</FormGroup>
				
				<FormGroup>
					<label htmlFor="password" className="control-label">Password</label>
					<input type="password" className="form-control" name="password" title="Please enter your password"
						value={password} onChange={ e => dispatch(loginBoxChanged({password: e.target.value, emptyPassword: false})) }/>
					{ emptyPassword && (<span className="help-block">Password required.</span>) }
					
				</FormGroup>

				{ loginError && (<div id="loginErrorMsg" className="alert alert-danger">Wrong email or password.</div>) }

                <Button bsStyle="primary" type="submit">Login</Button>
            </form>
        );
    }
};

export default connect(mapStateToProps)(Login);
