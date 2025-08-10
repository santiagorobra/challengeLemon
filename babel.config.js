module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
       extensions: [
          '.ios.ts', '.android.ts', '.ts',
          '.ios.tsx', '.android.tsx', '.tsx',
          '.ios.js', '.android.js', '.js',
          '.json'
        ],
        alias: {
          navigation: './src/navigation',
          screens: './src/screens',
          hooks: './src/hooks',
          constants: './src/constants',
          components: './src/components',
          store: './src/store',
          types: './src/types',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
