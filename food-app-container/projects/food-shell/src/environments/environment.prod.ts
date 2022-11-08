export const environment = {
  production: true,
  localServerUrl:'http://localhost:4900/',
  assetServerUrl:'http://localhost:5000/',
  customerServerUrl:'http://localhost:4900/',
  orderServerUrl:'http://localhost:4900/',
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
