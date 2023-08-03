import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FIREBASE_AUTH, FIREBASE_DB } from "./firebaseConfig";

import "react-native-gesture-handler";
import Home from "./Screens/welcome";
import LoginForm from "./Screens/login";
import Signup from "./Screens/signup";
import Dash from "./Screens/dash";
import AccountScreen from "./Screens/account";
import Booking from "./Screens/booking";
import AdminDashboard from "./Screens/admin"


const Stack = createNativeStackNavigator();


export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      console.log("user", user);
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="login" component={LoginForm} />
            <Stack.Screen name="welcome" component={Home} />
             <Stack.Screen name="booking" component={Booking} options={{headerShown: false}}/>
            <Stack.Screen
              name="dash"
              component={Dash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="account"
              component={AccountScreen}
              options={{ title: "Account" }}
            />
            <Stack.Screen
            name="admin"
            component={AdminDashboard}
            options={{ title: "Adminstration" }} />
          </>
        ) : (
          <>
            <Stack.Screen name="signup" component={Signup} />
            <Stack.Screen name="login" component={LoginForm} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
