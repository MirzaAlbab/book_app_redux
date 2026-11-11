# book_app_redux

A React Native book application with Redux state management, account screens, and media components.

[Repository](https://github.com/MirzaAlbab/book_app_redux)

## Features

- Home and book-detail screens
- Login and registration screens
- PDF, audio, and video components
- Redux persistence and screen/component snapshot tests

## Technology

`react` 17.0.2 · `react-native` 0.67.3 · `redux` ^4.1.2

## Getting started

Install Node.js and a React Native CLI development environment compatible with the version in `package.json`. Android requires a compatible JDK, Android SDK, and an emulator or connected device. iOS requires macOS, Xcode, and CocoaPods.

```bash
git clone https://github.com/MirzaAlbab/book_app_redux.git
cd book_app_redux
```

```bash
npm install
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

Configure backend endpoints used by the screen actions before testing account and catalog flows. The repository uses React Native 0.67.3 and older native dependencies.

## License

No root `LICENSE` file was present in the reviewed repository. Consult the repository owner about reuse; dependencies and third-party assets retain their own terms.
