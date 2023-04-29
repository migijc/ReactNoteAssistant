import React, {useEffect, useState} from 'react';
import firebaseHelpers from './helperFunctions/firebaseHelpers';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import CoverLetterForm from './screens/CoverLetterForm';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import AddProfessionalExp from './screens/AddProfessionalExp';

const stack = createNativeStackNavigator();
function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const fbHelpers = firebaseHelpers();
  const [newCoverLetter, setNewCoverLetter] = useState(false);

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
              options={{headerShown: false}}
              component={Home}
            />

            <stack.Screen
              name="Cover Letter Form"
              component={CoverLetterForm}
              // options={{headerShown: false}}
            />

            <stack.Screen
              name="Add Professional Experience"
              component={AddProfessionalExp}
              // options={{headerShown: false}}
            />
          </>
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
