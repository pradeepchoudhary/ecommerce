import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {Route, Switch, Redirect} from 'react-router-dom';
import {auth, handleUserProfile} from './firebase/utils';
import { setCurrentUser } from './redux/User/user.actions';

//layouts
import MainLayout from './layouts/MainLayout'
import HomepageLayout from './layouts/HomepageLayout';

//pages
import Login from './pages/Login/index.js'
import './default.scss'
import Homepage from './pages/Homepage';
import Registration from './pages/Registration';
import Recovery from './pages/Recovery'
import Dashboard from './pages/Dashboard';

//hoc
import WithAuth from './hoc/withAuth'

const App = props => {

  const dispatch = useDispatch();
     useEffect(()=> {
      const authListener = auth.onAuthStateChanged(async userAuth => {
        if(userAuth){
          const userRef = await handleUserProfile(userAuth);
          userRef.onSnapshot(snapshot => {
            dispatch(setCurrentUser({
                id: snapshot.id,
                ...snapshot.data()
            }))
          }) 
        }
        dispatch(setCurrentUser(userAuth))
      })
      return () => {
        authListener();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
      <div className="App">
            <Switch>

              <Route exact path="/" 
              render={()=>
                <HomepageLayout >
                  <Homepage/>
                </HomepageLayout>} 
              />

              <Route  path="/registration" 
                render={()=> (
                <MainLayout >
                  <Registration/>
                </MainLayout> 
                )}
              />
              
              <Route  path="/login" 
                render={()=> (
                <MainLayout >
                  <Login/>
                </MainLayout> )}
              />

              <Route path="/recovery" 
              render={()=>(
                <MainLayout>
                  <Recovery/> 
                </MainLayout>
              )}/>

              <Route path="/dashboard" 
              render={()=>(
                <WithAuth>
                  <MainLayout>
                    <Dashboard/> 
                  </MainLayout>
                </WithAuth>
              )}/>

            </Switch>
      </div>
    );
  }
 
export default App;
