import React, {useEffect, useState} from 'react';
import firebaseHelpers from './helperFunctions/firebaseHelpers';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './screens/Home';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';

const stack = createNativeStackNavigator();
function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const fbHelpers = firebaseHelpers();

  useEffect(() => {
    fbHelpers.forAuth.handleUserStateOnChange(setUserLoggedIn);
  }, [fbHelpers]);

  return (
    <NavigationContainer>
      <stack.Navigator>
        {userLoggedIn === false ? (
          <>
            <stack.Screen name="Log In" component={LogIn} />
            <stack.Screen
              name="Sign Up"
              options={{headerShown: false}}
              component={SignUp}
            />
          </>
        ) : (
          <>
            <stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          </>
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
