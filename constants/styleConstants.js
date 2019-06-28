import { Dimensions, Platform } from 'react-native';

const styleConstants = {};

// Window dimensions
const window = Dimensions.get('window');
styleConstants.windowWidth = window.width;
styleConstants.windowHeight = window.height;

// Consistent spacing
styleConstants.spacing = {};
styleConstants.spacing.vertical = 15;

// Consistent border radius
styleConstants.borderRadius = 2;

// fixes most of the smaller screen bugs
styleConstants.spacing.horizontal = styleConstants.windowWidth < 360 ? 10 : 20;
styleConstants.spacing.statusBarHeight = Platform.OS === 'ios' ? 22 : 0;
styleConstants.spacing.headerHeight =
  styleConstants.spacing.statusBarHeight + 60;
styleConstants.spacing.footerButtonHeight = 46;

// Grid image (one-third)
// - (left/right padding + 2 x gutters)
styleConstants.gridImageGutterSize = styleConstants.spacing.horizontal;
styleConstants.gridImageSize = Math.floor(
  (styleConstants.windowWidth -
    (2 * styleConstants.spacing.horizontal +
      2 * styleConstants.gridImageGutterSize)) /
    3,
);
styleConstants.gridImage = {
  width: styleConstants.gridImageSize,
  height: styleConstants.gridImageSize,
  marginRight: styleConstants.gridImageGutterSize,
  marginBottom: styleConstants.gridImageGutterSize,
  borderRadius: styleConstants.borderRadius,
};

// Yellow Pages colour palette
styleConstants.transparent = 'transparent';
styleConstants.primaryColor = '#FFD502';
styleConstants.transPrimaryColor = 'rgba(255,213,2, 0.5)';
styleConstants.secondaryColor = '#A968B1';
styleConstants.accentColor = '#4A90E2';
styleConstants.primaryTextColor = '#000000';
styleConstants.secondaryTextColor = '#575756';
styleConstants.tertiaryTextColor = '#C5C5C4';
styleConstants.dividerColor = '#F6F6F2';
styleConstants.inputBorderColor = '#CCCCCC';
styleConstants.white = '#FFFFFF';
styleConstants.transWhite = 'rgba(255, 255, 255, 0.5)';
styleConstants.lightTransWhite = 'rgba(255, 255, 255, 0.25)';
styleConstants.success = '#7ED321';
styleConstants.danger = '#D6001A';
styleConstants.facebookBlue = '#39579A';
styleConstants.googleOrange = '#DD4B39';
styleConstants.lightTransBlack = 'rgba(0, 0, 0, 0.4)';
styleConstants.transBlack = 'rgba(0, 0, 0, 0.67)';
styleConstants.darkTransBlack = 'rgba(0, 0, 0, 0.9)';
styleConstants.green = '#54B70A';
styleConstants.pink = '#EC4F68';
styleConstants.aqua = '#41CFAF';
styleConstants.orange = '#EC804F';
styleConstants.darkBlue = '#5C67BF';

styleConstants.fonts = {};
styleConstants.fonts.extraSmall = {
  fontSize: 8,
  color: styleConstants.secondaryTextColor,
  fontWeight: '400',
  fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : null,
  backgroundColor: 'transparent',
};
styleConstants.fonts.small = {
  fontSize: 12,
  color: styleConstants.secondaryTextColor,
  fontWeight: '400',
  backgroundColor: 'transparent',
};
styleConstants.fonts.paragraph = {
  fontSize: 14,
  lineHeight: 22, // ChatMessage
  color: styleConstants.primaryTextColor,
  fontWeight: '400',
  backgroundColor: 'transparent',
};
styleConstants.fonts.header = {
  fontSize: 16,
  lineHeight: 24, // OfferSnippet
  color: styleConstants.primaryTextColor,
  backgroundColor: 'transparent',
  fontWeight: Platform.OS === 'ios' ? '700' : '400',
  fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : null,
};
styleConstants.fonts.title = {
  fontSize: 22,
  color: styleConstants.primaryTextColor,
  fontWeight: Platform.OS === 'ios' ? '700' : '400',
  backgroundColor: 'transparent',
  fontFamily: Platform.OS === 'android' ? 'sans-serif-medium' : null,
};

// Yellow pages icon font sizes
styleConstants.verySmallIconFont = 11;
styleConstants.smallIconFont = 13;
styleConstants.regularIconFont = 15;
styleConstants.largeIconFont = 18;
styleConstants.veryLargeIconFont = 24;
styleConstants.extraLargeIconFont = 32;

// Testing small screens
styleConstants.testing = {
  width: 320,
  height: 480,
  flex: 0,
  backgroundColor: styleConstants.dividerColor,
};

/* SHADOWS */

// Elevation does not work on Android V4 so we add a border as a fallback
const isEarlyAndroid = Platform.OS === 'android' && Platform.Version <= 19;

styleConstants.smallShadow = {
  elevation: 2,
  borderWidth: isEarlyAndroid ? 1 : 0,
  borderColor: isEarlyAndroid ? styleConstants.inputBorderColor : null,

  // iOS
  shadowColor: styleConstants.black,
  shadowOpacity: 0.17,
  shadowRadius: 2,
  shadowOffset: {
    height: 1,
    width: 0,
  },
};

styleConstants.regularShadow = {
  elevation: 5,
  borderWidth: isEarlyAndroid ? 1 : 0,
  borderColor: isEarlyAndroid ? styleConstants.inputBorderColor : null,

  // iOS
  shadowColor: styleConstants.black,
  shadowOpacity: 0.33,
  shadowRadius: 2,
  shadowOffset: {
    height: 1,
    width: 0,
  },
};

styleConstants.largeShadow = {
  elevation: 10,
  borderWidth: isEarlyAndroid ? 1 : 0,
  borderColor: isEarlyAndroid ? styleConstants.inputBorderColor : null,

  // iOS
  shadowColor: styleConstants.black,
  shadowOpacity: 0.5,
  shadowRadius: 4,
  shadowOffset: {
    height: 2,
    width: 0,
  },
};

export default styleConstants;
