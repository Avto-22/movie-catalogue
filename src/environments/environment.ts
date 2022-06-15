// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
   firebase : {
    apiKey: "AIzaSyAUsv7haFNsUJbn1fG8XF2Zh_FhVYbVQ7k",
    authDomain: "movie-catalogue-bd574.firebaseapp.com",
    projectId: "movie-catalogue-bd574",
    storageBucket: "movie-catalogue-bd574.appspot.com",
    messagingSenderId: "36820498535",
    appId: "1:36820498535:web:2d11f5f1c84fecca1c7cc2"
  },
  movieApiBase: 'http://www.omdbapi.com/?apikey=540d1872',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
