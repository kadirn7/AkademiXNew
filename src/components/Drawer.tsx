import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import DataManager from '../utils/DataManager';

interface DrawerProps {
  isVisible: boolean;
  onClose: () => void;
  onNavigate: (screen: string) => void;
}

const Drawer: React.FC<DrawerProps> = ({ isVisible, onClose, onNavigate }) => {
  const user = DataManager.getInstance().getCurrentUser();

  const menuItems = [
    { id: 'profile', title: 'Profilim', icon: '👤', action: 'profile' },
    { id: 'notes', title: 'Notlarım', icon: '📝', action: 'notes' },
    { id: 'plans', title: 'Planlarım', icon: '📅', action: 'plans' },
    { id: 'settings', title: 'Ayarlar', icon: '⚙️', action: 'settings' },
    { id: 'logout', title: 'Çıkış Yap', icon: '🚪', action: 'logout' },
  ];

  const handleMenuPress = (action: string) => {
    switch (action) {
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
        onNavigate(action);
        break;
    }
  };

  if (!isVisible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <View style={styles.drawer}>
        <View style={styles.header}>
          <Text style={styles.userAvatar}>{user?.avatar || '👤'}</Text>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user?.name || 'Kullanıcı'}</Text>
            <Text style={styles.userTitle}>{user?.title || 'Akademisyen'}</Text>
            <Text style={styles.userUniversity}>{user?.university || 'Üniversite'}</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.action)}
            >
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={[
                styles.menuText,
                item.id === 'logout' && styles.logoutText
              ]}>
                {item.title}
              </Text>
              <Text style={styles.menuArrow}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.versionText}>AkademiX v1.0</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 280,
    height: '100%',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    fontSize: 50,
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 2,
  },
  userUniversity: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  menuSection: {
    flex: 1,
    paddingTop: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 15,
    width: 25,
    textAlign: 'center',
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutText: {
    color: '#f44336',
  },
  menuArrow: {
    fontSize: 18,
    color: '#999',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
});

export default Drawer; 