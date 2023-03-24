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
- This project uses [Ionic](https://ionicframework.com/) as an app development platform and the [Ionic CLI](https://ionicframework.com/docs/cli).

### Getting Started

With Node and NPM set up, let's install the Ionic and Cordova CLI.

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

Copy assets to Cordova platforms, preparing them for native builds:

```
ionic cordova prepare ios
ionic cordova prepare android

```

#### For an IOS project, run the app using Xcode:
* Open the workspace file ScanzyBarcodeScannerSDKSampleReactNative.xcworkspace (not .xcodeproj) from the ios * directory in Xcode.
* Adjust Provisioning and Signing settings.
* Choose one simulator or local device to run the app.

#### For an Android project, run the app using Android Studio:
* Open the project located in platforms/android using Android Studio.
* Select File --> Sync Project with Gradle Files
* If you experience the 'Unable to determine Android SDK directory' build error:
  Create new File --> Project--> Platform --> android--> local.properties. 
  Then add sdk.dir={YOUR_SDK_PATH} (example: sdk.dir=/Users/admin/Library/Android/sdk) to the file, and try to sync again.
