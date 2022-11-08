import { enableProdMode } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const ngVersion=require('package.json').dependencies['@angular/core'];//better just take major version

(window as any).platform=(window as any).platform ||{};
let platform=(window as any).platform[ngVersion];
if(!platform){
  platform=platformBrowser();
  (window as any).platform[ngVersion]=platform;
}


platform.bootstrapModule(AppModule)
  .catch((err:any )=> console.error(err));
