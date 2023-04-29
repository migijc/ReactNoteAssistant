import React, {useEffect, useState} from 'react';
import firebaseHelpers from './helperFunctions/FirebaseHelpers';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import CoverLetterForm from './screens/CoverLetterForm';
import LogIn from './screens/LogIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import AddProfessionalExp from './screens/AddProfessionalExp';
import CreatedLetter from './screens/CreatedLetter';

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
              component={Home}
              options={{
                headerStyle: {backgroundColor: 'black'},
                headerTintColor: 'white',
                headerTitleAlign: 'center',
                headerTitle: 'Create New',
              }}
            />

            <stack.Screen
              name="Cover Letter Form"
              component={CoverLetterForm}
              options={{
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {backgroundColor: 'black'},
                headerTitleAlign: 'center',
                headerTitle: 'New Cover Letter',
              }}
            />
            <stack.Screen
              name="Created Letter"
              component={CreatedLetter}
              options={{
                headerShown: true,
                headerTintColor: 'white',
                headerStyle: {backgroundColor: 'black'},
                headerTitleAlign: 'center',
                headerTitle: 'New Document',
              }}
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
