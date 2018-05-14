import React from 'react';
import Header from '../../components/Header';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'

const shallow = Enzyme.shallow;
const mockStore = configureStore()

Enzyme.configure({ adapter: new Adapter() });

it('renders Header', () => {
    let store = mockStore({});

    const wrapper = Enzyme.shallow(<Header store={store}/>).dive();
    const textHeader = <a className="navbar-brand" href="/">User App</a>;

    expect(wrapper.contains(textHeader)).toEqual(true);
});


it('Header has login button', () => {
    let store = mockStore({});

    const wrapper = Enzyme.shallow(<Header store={store}/>).dive();

    expect(wrapper.contains('Login')).toEqual(true);
});

it('Header has logout button if logged in', () => {
    let store = mockStore({isLoggedIn : true});

    const wrapper = Enzyme.shallow(<Header store={store}/>).dive();

    expect(wrapper.contains('Logout')).toEqual(true);
});
