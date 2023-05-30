import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import FeedScreen from './screen/FeedScreen';
import CreatePost from './screen/CreatePost';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './screen/Profile';
import UpdateProfile from './screen/UpdateProfile';
import { Amplify } from 'aws-amplify';
import awsconfig from './src/aws-exports';

// Amplify.config(awsconfig);
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: 'center',
          }}
        >
          <Stack.Screen
            name="Feed"
            component={FeedScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <FontAwesome
                  onPress={() => navigation.navigate('Profile')}
                  name="user"
                  size={24}
                  color="gray"
                />
              ),
            })}
          />
          <Stack.Screen name="Create" component={CreatePost} />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{
              title: 'Profile',
            }}
          />
          <Stack.Screen
            name="Update"
            component={UpdateProfile}
            options={{
              title: 'Update Profile',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({});
