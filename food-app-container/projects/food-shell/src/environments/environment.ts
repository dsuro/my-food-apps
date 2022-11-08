// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  localServerUrl:'http://localhost:4900/',
  assetServerUrl:'http://localhost:5000/',
  //baseServerUrl:'http://localhost:8080/',
  //orderServerUrl:'http://localhost:8080/',
  baseServerUrl:'https://fhgrotku0d.execute-api.ap-south-1.amazonaws.com/',
  orderServerUrl:'https://inxy54ewq7.execute-api.ap-south-1.amazonaws.com/',
  inventory:{
    type:'module',
    remoteEntry:'http://localhost:5001/remoteEntry.js',
    exposedModule:'./inventory'
  },
  orders:{
    type:'module',
    remoteEntry:'http://localhost:5002/remoteEntry.js',
    exposedModule:'./orders'
  },
  customers:{
    type:'module',
    remoteEntry:'http://localhost:5003/remoteEntry.js',
    exposedModule:'./customers'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
