# scanzy-barcodescanner-sample-ionic-cordova
ionic cordova sample to use cordova-plugin-scanzy-barcodescanner

## Plugins

The following plugins are included:

- [cordova-plugin-scanzy-barcodescanner](https://www.npmjs.com/package/cordova-plugin-scanzy-barcodescanner)
To learn how to install cordova-plugin-scanzy-barcodescanner and use the scan feature, check our [official documentation](https://scanzy.com/ionic)

## Development Setup 💻

### Prerequisites

- Install [Node.js v14](https://nodejs.org) or higher, with [Node Package Manager](https://www.npmjs.com/get-npm) v7.24 or higher
- Android development: Install [Android Studio](https://developer.android.com/studio)
- iOS development: Install [XCode](https://apps.apple.com/de/app/xcode/id497799835?mt=12)
- This project uses [Ionic](https://ionicframework.com/) as app development platform and the [Ionic CLI](https://ionicframework.com/docs/cli).

### Getting Started

With Node and NPM setup, let’s install the Ionic and Cordova CLI.

```
npm install -g ionic cordova
```

Clone this repository:

```
git clone https://github.com/ScanzyLLC/scanzy-barcodescanner-sample-ionic-cordova.git
```

Change to the root directory of the project:

```
cd scanzy-barcodescanner-sample-ionic-cordova
```

Install all dependencies:

```
npm i
```

Add native platforms to the project:

```
ionic cordova platform add ios
ionic cordova platform add android
```

Build the web assets:

```
ionic cordova build ios
ionic cordova build android
```

Copies assets to Cordova platforms, preparing them for native builds:

```
ionic cordova prepare ios
ionic cordova prepare android

```

Install the native-run utility for native package deployment:
```
npm install -g native-run
```

Launch the native app:

```
ionic cordova run ios
ionic cordova run android
```
