import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { NavigationContainer } from "@react-navigation/native"
import { HomeScreen } from "./homeScreen";
import { GettingToKnow } from "./GettingToKnow";
import { Form } from "./step01a";
import { graphs } from "./graph";
import { AI } from "./ai";

const Stack = createNativeStackNavigator()

export const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="step01a">
                <Stack.Screen options={{ headerShown: false }} name={"WelcomeScreen"} component={HomeScreen} />                
                <Stack.Screen options={{ headerShown: false }} name={"GettingToKnowYou"} component={GettingToKnow} />  
                <Stack.Screen options={{ headerShown: false }} name={"step01a"} component={Form} />   
                <Stack.Screen options={{ headerShown: false }} name={"graph"} component={graphs} />  
                <Stack.Screen options={{ headerShown: false }} name={"ai"} component={AI} /> 
            </Stack.Navigator>
        </NavigationContainer>
    )
}


// to do
// faire le data pour first step complet
// faire UI
// faire IA derniere step
