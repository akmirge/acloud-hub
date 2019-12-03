import React from 'react';
import {
  Route,
  Switch
} from 'react-router-dom';
import Header from './components/header/header.component';
import HomePage from './pages/home/home.component';
import BlogsPage from './pages/blogs/blogs.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {
  auth,
  createUserProfileDocument
} from './firebase/firebase.utils'
import './App.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(userSnapshot => {
          this.setState({
            currentUser: {
              id: userSnapshot.id,
              ...userSnapshot.data()
            }
          });
        });
      } else {
        this.setState({
          currentUser: userAuth
        });
      }
    });
  }

  componentWillUnmount() {
    //This will automatically close the subscription to prevent memory leaks.
    this.unsubscribeFromAuth();
  }

  render() {
    return ( <
      div >
      <
      Header currentUser = {
        this.state.currentUser
      }
      /> <
      Switch >
      <
      Route exact path = '/'
      component = {
        HomePage
      }
      /> <
      Route path = '/blogs'
      component = {
        BlogsPage
      }
      /> <
      Route path = '/signIn'
      component = {
        SignInAndSignUpPage
      }
      /> < /
      Switch > <
      /div>
    );
  }
}

export default App;