# 📱 Lemon Cash – Mobile Challenge

This project is part of a **technical challenge** for the company **Lemon Cash**.  
The app was developed in **React Native CLI** (without Expo) and implements the following main features:

---

## 📌 Features Implemented

### 1. **Google Authentication**
- Secure Google Sign-In implementation.
- Session management with persistent storage.
- Error, loading, and success state handling.
- Post-login navigation to the crypto list.

### 2. **Crypto List**
- Displays a list of cryptocurrencies with:
  - Name, symbol, image, current price, and 24h change percentage.
- Pagination with infinite scroll.
- Search bar to filter coins by name.
- Sorting (ascending/descending).
- Filters:
  - Price range.
  - Positive/negative variation in the last 24 hours.
- Pull-to-refresh.
- Optimized for performance and smooth UX.
- Data powered by **CoinGecko API**.

### 3. **Exchange (Crypto ↔ Fiat)**
- Select a cryptocurrency (BTC, ETH, USDT, etc.).
- Enter an amount (e.g., 0.5 BTC) and see the equivalent in fiat currency (USD, EUR, ARS, PEN).
- Change conversion direction (fiat → crypto).
- Real-time price updates with polling every 10 seconds.
- Accessible currency picker with search and current price info.
- Handles loading and error states.

### 4. **Wallet QR Scanner**
- Uses the device camera to scan a QR code containing a wallet address.
- Supports BTC, ETH, and other formats.
- Displays scanned wallet details in a summary screen.
- Local history of scanned addresses.
- Mark/unmark addresses as favorites.
- Remove addresses from history.
- Camera permission handling and error states.

---

## 🚀 Getting Started
```bash
git clone https://github.com/santiagorobra/challengeLemon
```

```bash
cd challengeLemon
```

remember to add the .env file

```bash
npm install
```

```bash
npx pod-install
```

I recommend running
```bash
npm run start:cache
```
before running the iOS or Android build.

```bash
npm run ios
```
or
```bash
npm run android
```

## 🛠 Technologies Used
React Native CLI (no Expo)
- @react-native-async-storage/async-storage – persistent storage
- @react-native-google-signin/google-signin – Google authentication
- @react-navigation – navigation system
- @reduxjs/toolkit – state management
- react-native-vector-icons – icons
- react-native-vision-camera – QR code scanning
- react-redux – Redux binding for React
- redux-persist – state persistence

## 🌍 API Used
This project uses the CoinGecko API as the data source for cryptocurrency and fiat prices:
**CoinGecko API Documentation**
https://docs.coingecko.com/reference/coins-markets

## 📄 Notes
Normally, my merge requests aim to keep changes within 16 files maximum, but due to time constraints in this challenge, several features were implemented together, resulting in a larger number of modified files.

The project is compatible with both Android and iOS, although camera functionality was only tested on Android.
