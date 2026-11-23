# book_app_redux

A React Native book application with Redux state management, account screens, and media components.

[Repository](https://github.com/MirzaAlbab/book_app_redux)

## Features

- Home and book-detail screens
- Login and registration screens
- PDF, audio, and video components
- Redux persistence, action tests, and component snapshot tests

## Technology

`react` 17.0.2 · `react-native` 0.67.3 · `redux` ^4.1.2

## Getting started

Install Node.js and a React Native CLI development environment compatible with the version in `package.json`. Android requires a compatible JDK, Android SDK, and an emulator or connected device. iOS requires macOS, Xcode, and CocoaPods.

```bash
git clone https://github.com/MirzaAlbab/book_app_redux.git
cd book_app_redux
```

```bash
npm install --legacy-peer-deps
npm start
```

In another terminal, build Android:

```bash
npm run android
```

For iOS, install the pods under `ios/` first, then run `npm run ios`. If the project integrates Firebase, supply your own platform configuration and enable the authentication providers used by the app.

## Development and checks

```bash
npm test
npm run lint
```

## Project structure

- `__tests__/` — JavaScript test files
- `android/` — Android native project
- `ios/` — iOS native project
- `src/` — Application source

## Project notes

The catalog and account screens use the API URL in `src/helpers/api.js`. That URL currently points to a third-party HTTP service, so account requests are sent without transport encryption. Configure an HTTPS backend you control before using real credentials or publishing the app. The API was unavailable from the review environment, so account and catalog integration could not be verified end to end.

This repository uses React Native 0.67.3 and older native dependencies. Current npm needs `--legacy-peer-deps` because the video player packages declare conflicting peer versions. The automated checks run JavaScript tests and lint; native Android and iOS builds still need their respective toolchains.

## License

Original project code is available under the [MIT License](LICENSE). Third-party libraries, templates, datasets, and assets retain their own terms and attribution.
