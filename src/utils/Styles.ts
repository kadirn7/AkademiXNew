import { StyleSheet } from 'react-native';

// Ortak renkler
export const Colors = {
  primary: '#2196F3',
  secondary: '#ffcc80',
  success: '#4CAF50',
  warning: '#FF9800',
  error: '#F44336',
  info: '#2196F3',
  light: '#f5f5f5',
  dark: '#333',
  gray: '#666',
  lightGray: '#999',
  white: '#fff',
  black: '#000',
  transparent: 'transparent',
};

// Ortak boyutlar
export const Sizes = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  icon: 40,
  avatar: 60,
  button: 44,
};

// Ortak font boyutları
export const FontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 20,
  xxxl: 24,
  title: 32,
};

// Ortak border radius
export const BorderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  round: 50,
};

// Ortak gölge stilleri
export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
};

// Ortak buton stilleri
export const ButtonStyles = StyleSheet.create({
  primary: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Sizes.lg,
    paddingHorizontal: Sizes.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondary: {
    backgroundColor: Colors.light,
    borderRadius: BorderRadius.md,
    paddingVertical: Sizes.lg,
    paddingHorizontal: Sizes.xl,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  disabled: {
    backgroundColor: Colors.lightGray,
    borderRadius: BorderRadius.md,
    paddingVertical: Sizes.lg,
    paddingHorizontal: Sizes.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Ortak input stilleri
export const InputStyles = StyleSheet.create({
  default: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: BorderRadius.md,
    paddingHorizontal: Sizes.lg,
    paddingVertical: Sizes.md,
    fontSize: FontSizes.md,
    backgroundColor: '#f9f9f9',
  },
  focused: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Sizes.lg,
    paddingVertical: Sizes.md,
    fontSize: FontSizes.md,
    backgroundColor: Colors.white,
  },
});

// Ortak kart stilleri
export const CardStyles = StyleSheet.create({
  default: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Sizes.xl,
    marginBottom: Sizes.lg,
    ...Shadows.md,
  },
  elevated: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    padding: Sizes.xl,
    marginBottom: Sizes.lg,
    ...Shadows.lg,
  },
});

// Ortak header stilleri
export const HeaderStyles = StyleSheet.create({
  default: {
    backgroundColor: Colors.primary,
    padding: Sizes.xl,
    paddingTop: 50,
  },
  title: {
    fontSize: FontSizes.xxxl,
    fontWeight: 'bold',
    color: Colors.white,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSizes.md,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    marginTop: Sizes.xs,
  },
});

// Ortak modal stilleri
export const ModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    maxHeight: '90%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Sizes.xl,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  title: {
    fontSize: FontSizes.xl,
    fontWeight: 'bold',
    color: Colors.dark,
  },
  closeButton: {
    fontSize: FontSizes.xxxl,
    color: Colors.gray,
  },
  body: {
    padding: Sizes.xl,
  },
  footer: {
    flexDirection: 'row',
    padding: Sizes.xl,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
});

// Ortak navbar stilleri
export const NavbarStyles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    overflow: 'hidden',
    ...Shadows.lg,
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
    borderTopLeftRadius: BorderRadius.xxl,
    borderTopRightRadius: BorderRadius.xxl,
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60,
    paddingHorizontal: Sizes.md,
    paddingBottom: Sizes.sm,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.sm,
    paddingHorizontal: Sizes.md,
    borderRadius: BorderRadius.xxl,
    position: 'relative',
  },
  tabButtonActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  tabButtonHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  iconContainer: {
    width: Sizes.icon,
    height: Sizes.icon,
    borderRadius: Sizes.icon / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Sizes.xs,
  },
  iconContainerActive: {
    backgroundColor: Colors.white,
    ...Shadows.md,
  },
  iconContainerHovered: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    ...Shadows.sm,
  },
  tabIcon: {
    fontSize: FontSizes.lg,
    opacity: 0.8,
  },
  tabIconActive: {
    opacity: 1,
    color: Colors.secondary,
  },
  tabIconHovered: {
    opacity: 0.9,
  },
  tabLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  tabLabelActive: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  tabLabelHovered: {
    color: Colors.white,
    fontWeight: '600',
  },
});

export default {
  Colors,
  Sizes,
  FontSizes,
  BorderRadius,
  Shadows,
  ButtonStyles,
  InputStyles,
  CardStyles,
  HeaderStyles,
  ModalStyles,
  NavbarStyles,
}; 