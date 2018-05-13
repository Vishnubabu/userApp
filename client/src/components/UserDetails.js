import React from 'react';
import { Table, Button, FormGroup } from 'react-bootstrap';
import { getUserDetails, getReadingPreference } from '../actions';
import { connect } from 'react-redux';

const mapStateToProps = ({userDetails = null, readingPreference = null, isLoggedIn = true}) => (
    { userDetails, readingPreference, isLoggedIn}
);

const headers = [
    'Book Name',
    'Author Name',
    'Publisher Name'
];

class UserDetails extends React.Component {

    getReadingPreference(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        const {dispatch} = this.props;

        dispatch(getReadingPreference());
    }

    componentWillReceiveProps(props) {
        const {isLoggedIn, history} = props;

        if (!isLoggedIn) {
            history.push('/login');
        }
    }

    componentWillMount() {
        const {dispatch, userDetails} = this.props;

        if (!userDetails) {
            dispatch(getUserDetails());
        }
    }


    render() {
        const {userDetails, readingPreference, dispatch} = this.props;

        return (
            <div>
                {userDetails &&
                    <div>
                        <FormGroup>
                            <label className="col-sm-2 col-form-label">User Name: </label><input type="text" value={userDetails.fullName} disabled/>
                        </FormGroup>
                        <FormGroup>
                            <label className="col-sm-2 col-form-label">Zip Code: </label><input type="text" value={userDetails.zip} disabled/>
                        </FormGroup>
                        <FormGroup>
                            <label className="col-sm-2 col-form-label">Email ID: </label><input type="text" value={userDetails.email} disabled/>
                        </FormGroup>

                        <FormGroup>
                            <Button bsStyle="primary" type="submit" onClick={ e => dispatch(getReadingPreference()) }>Reading Preference</Button>
                        </FormGroup>
                    </div>
                }

                {readingPreference &&
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                { headers.map((h, i) => <th key={i}>{ h }</th>) }
                            </tr>
                        </thead>

                        <tbody>
                        {
                            readingPreference.map((book, i) => (
                                <tr key={i} >
                                    <td key={1}><a href={ book.link } target="_blank">{ book.title }</a></td>
                                    <td key={2}>{ book.author }</td>
                                    <td key={3}>{ book.publisher }</td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </Table>
                }

            </div>

        );
    }
};

export default connect(mapStateToProps)(UserDetails);
