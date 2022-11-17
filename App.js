import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import ToDoPage from './pages/ToDo'
import CreateEntryPage from './pages/CreateEntry'
import DeleteEntryPage from './pages/DeleteEntry'
import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState } = createGlobalState({
  key: 0,
  itemId: null
})

export { useGlobalState, setGlobalState }

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="ToDo" component={ToDoPage} />
        <Stack.Screen options={{ headerShown: true }} name="CreateEntry" component={CreateEntryPage} />
        <Stack.Screen options={{ headerShown: true }} name="DeleteEntry" component={DeleteEntryPage} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
