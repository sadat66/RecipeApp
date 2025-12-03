import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import CategoryScreen from './screens/CategoryScreen';
import RecipeDetailScreen from './screens/RecipeDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Wrapper components for passing props to CategoryScreen
const SnacksScreen = (props) => <CategoryScreen {...props} category="Snack" />;
const DinnerScreen = (props) => <CategoryScreen {...props} category="Dinner" />;
const DessertScreen = (props) => <CategoryScreen {...props} category="Dessert" />;

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#FFFFFF',
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                    position: 'absolute',
                    bottom: 20,
                    width: '90%',
                    marginHorizontal: '5%',
                    borderRadius: 30,
                },
                tabBarActiveTintColor: '#FF8C00',
                tabBarInactiveTintColor: '#BDBDBD',
                tabBarShowLabel: true,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Snacks') {
                        iconName = focused ? 'fast-food' : 'fast-food-outline';
                    } else if (route.name === 'Dinner') {
                        iconName = focused ? 'restaurant' : 'restaurant-outline';
                    } else if (route.name === 'Dessert') {
                        iconName = focused ? 'ice-cream' : 'ice-cream-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Snacks" component={SnacksScreen} />
            <Tab.Screen name="Dinner" component={DinnerScreen} />
            <Tab.Screen name="Dessert" component={DessertScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="light" />
            <Stack.Navigator
                initialRouteName="Main"
                screenOptions={{
                    headerShown: false,
                    cardStyle: { backgroundColor: '#FFF3E0' }
                }}
            >
                <Stack.Screen name="Main" component={TabNavigator} />
                <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
