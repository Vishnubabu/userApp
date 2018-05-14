import React from 'react';
import Login from '../../components/Login';
import { Button } from 'react-bootstrap';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'

const shallow = Enzyme.shallow;
const mockStore = configureStore()

Enzyme.configure({ adapter: new Adapter() });

it('renders Login form', () => {
    let store = mockStore({});

    const wrapper = Enzyme.shallow(<Login store={store}/>).dive();

    expect(wrapper.contains(<label htmlFor="email" className="control-label">Email</label>)).toEqual(true);
    expect(wrapper.contains(<label htmlFor="password" className="control-label">Password</label>)).toEqual(true);
    expect(wrapper.contains(<Button bsStyle="primary" type="submit">Login</Button>)).toEqual(true);

});

