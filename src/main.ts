import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
// .then(appRef => {
//   // Create an injector context manually
//   const injector = createEnvironmentInjector([], appRef.injector); // First argument is an empty array of providers

//   // Run code inside the injection context
//   runInInjectionContext(injector, () => {
//     const loadingService = injector.get(LoadingService);

//     // Now you can pass `loadingService` to the decorator or other contexts
//     console.log('LoadingService available in main.ts', loadingService);
//   });
// })
  .catch((err) => console.error(err));

