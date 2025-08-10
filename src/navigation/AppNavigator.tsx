import React, { useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Drawer from '../components/Drawer';

// Import screens
import FeedScreen from '../screens/FeedScreen';
import DiscoverScreen from '../screens/DiscoverScreen';
import JournalsScreen from '../screens/JournalsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import TestsScreen from '../screens/TestsScreen';

const Tab = createBottomTabNavigator();

// Type definitions
interface CustomTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

// Custom Tab Bar Component
const CustomTabBar: React.FC<CustomTabBarProps> = ({ state, descriptors, navigation }) => {
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);
  const scaleAnimations = useRef<Animated.Value[]>([]).current;

  // Initialize scale animations for each tab
  React.useEffect(() => {
    // Clear and reinitialize animations
    scaleAnimations.splice(0, scaleAnimations.length);
    state.routes.forEach(() => {
      scaleAnimations.push(new Animated.Value(1));
    });
  }, [state.routes.length]);

  const handleTabPress = (route: any, index: number) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (state.index !== index && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const handleTabHover = (index: number, isHovered: boolean) => {
    setHoveredTab(isHovered ? index : null);
    
    if (scaleAnimations[index]) {
      Animated.spring(scaleAnimations[index], {
        toValue: isHovered ? 1.15 : 1,
        useNativeDriver: true,
        tension: 100,
        friction: 8,
      }).start();
    }
  };

  return (
    <View style={styles.navbarContainer}>
      {/* Wave effect at top */}
      <View style={styles.waveContainer}>
        <View style={styles.wave} />
      </View>
      
      <View style={styles.tabContainer}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

          const isFocused = state.index === index;
          const isHovered = hoveredTab === index;

          let iconName;
          if (route.name === 'Akış') {
            iconName = '📰';
          } else if (route.name === 'Keşfet') {
            iconName = '🔍';
          } else if (route.name === 'Dergiler') {
            iconName = '📚';
          } else if (route.name === 'Profilim') {
            iconName = '👤';
          } else if (route.name === 'Testler') {
            iconName = '📝';
          }

          return (
            <View key={route.key} style={styles.tabItem}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  isFocused && styles.tabButtonActive,
                  isHovered && styles.tabButtonHovered
                ]}
                onPress={() => handleTabPress(route, index)}
                onPressIn={() => handleTabHover(index, true)}
                onPressOut={() => handleTabHover(index, false)}
                onLongPress={() => {
                  // Long press simulates hover effect
                  handleTabHover(index, true);
                  setTimeout(() => handleTabHover(index, false), 1000);
                }}
                activeOpacity={0.7}
                delayLongPress={200}
              >
                <Animated.View 
                  style={[
                    styles.iconContainer,
                    isFocused && styles.iconContainerActive,
                    isHovered && styles.iconContainerHovered,
                    {
                      transform: [{ scale: scaleAnimations[index] || 1 }]
                    }
                  ]}
                >
                  <Text style={[
                    styles.tabIcon,
                    isFocused && styles.tabIconActive,
                    isHovered && styles.tabIconHovered
                  ]}>
                    {iconName}
                  </Text>
                </Animated.View>
                <Text style={[
                  styles.tabLabel,
                  isFocused && styles.tabLabelActive,
                  isHovered && styles.tabLabelHovered
                ]}>
                  {label}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
};

interface AppNavigatorProps {
  onLogout?: () => void;
}

const AppNavigator: React.FC<AppNavigatorProps> = ({ onLogout }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  const handleDrawerNavigate = (screen: string) => {
    // Drawer'dan gelen navigasyon işlemleri
    switch (screen) {
      case 'profile':
        // Profil sayfasına git
        break;
      case 'notes':
        // Notlar sayfasına git
        break;
      case 'plans':
        // Planlar sayfasına git
        break;
      case 'settings':
        // Ayarlar sayfasına git
        break;
      case 'logout':
        if (onLogout) {
          onLogout();
        }
        setDrawerVisible(false);
        break;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <NavigationContainer>
        <Tab.Navigator
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tab.Screen 
            name="Akış" 
            component={FeedScreen}
            options={{
              title: 'Akış',
            }}
          />
          <Tab.Screen 
            name="Keşfet" 
            component={DiscoverScreen}
            options={{
              title: 'Keşfet',
            }}
          />
          <Tab.Screen 
            name="Dergiler" 
            component={JournalsScreen}
            options={{
              title: 'Dergiler',
            }}
          />
          <Tab.Screen 
            name="Profilim" 
            options={{
              title: 'Profilim',
            }}
          >
            {() => <ProfileScreen onLogout={onLogout} />}
          </Tab.Screen>
          <Tab.Screen 
            name="Testler" 
            component={TestsScreen}
            options={{
              title: 'Testler',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>

      {/* Hamburger Menu Button */}
      <TouchableOpacity
        style={styles.hamburgerButton}
        onPress={() => setDrawerVisible(true)}
      >
        <Text style={styles.hamburgerIcon}>☰</Text>
      </TouchableOpacity>

      {/* Drawer */}
      <Drawer
        isVisible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        onNavigate={handleDrawerNavigate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  navbarContainer: {
    width: '100%',
    height: 80,
    backgroundColor: '#ffcc80',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -6,
    },
    shadowOpacity: 0.23,
    shadowRadius: 6,
    elevation: 10,
  },
  waveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 25,
  },
  wave: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // Enhanced wave effect
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: 8,
    paddingBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 20,
    position: 'relative',
  },
  tabButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  tabButtonHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  iconContainerActive: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  iconContainerHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  tabIcon: {
    fontSize: 18,
    opacity: 0.8,
  },
  tabIconActive: {
    opacity: 1,
    color: '#ffcc80',
  },
  tabIconHovered: {
    opacity: 0.9,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tabLabelActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabLabelHovered: {
    color: 'white',
    fontWeight: '600',
  },
  hamburgerButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  hamburgerIcon: {
    fontSize: 20,
    color: 'white',
  },
});

export default AppNavigator; 