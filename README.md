# Huddl React Native App

This is the repository for the Huddl app, built using react native and expo. Expo is a toolchain that allows you to quickly build, test and deploy test versions of your app.

You will need to have react-native and expo installed to run this code:
https://facebook.github.io/react-native/docs/getting-started
https://expo.io/

## Navigation

Navigation is based on the awesome `react-navigation` library (https://reactnavigation.org/). Navigation stacks are defined as key-value pairs where the key maps to a particular screen, which is a component that is passed some navigation props.

## State

State is managed using redux, split into logical modals based roughly on the modals of the app. Currently this is just a shell, as the current state of the app just implements login and signup flows, but as you progress you will add redux state subtrees for businesses, offers etc https://redux.js.org/