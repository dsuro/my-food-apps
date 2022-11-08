export const environment = {
  production: true,
  localServerUrl:'http://localhost:4900/',
  assetServerUrl:'http://localhost:5000/',
  baseServerUrl:'https://fhgrotku0d.execute-api.ap-south-1.amazonaws.com/',
  orderServerUrl:'https://inxy54ewq7.execute-api.ap-south-1.amazonaws.com/',
  inventory:{
    type:'module',
    remoteEntry:'/inventory/remoteEntry.js',
    exposedModule:'./inventory'
  },
  orders:{
    type:'module',
    remoteEntry:'/orders/remoteEntry.js',
    exposedModule:'./orders'
  },
  customers:{
    type:'module',
    remoteEntry:'/customers/remoteEntry.js',
    exposedModule:'./customers'
  }
};
