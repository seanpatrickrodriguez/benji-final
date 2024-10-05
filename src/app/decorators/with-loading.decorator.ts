import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

/**
 * A method decorator that manages the loading state for methods returning Promises, Observables, or Signals.
 *
 * @returns {MethodDecorator} The method decorator function.
 */
export function WithLoading(): MethodDecorator {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>
  ): TypedPropertyDescriptor<any> | void {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      // Ensure `this` is of the correct type
      const loadingService: LoadingService = (this as any).loadingService;

      // Show loading indicator
      loadingService.show();

      let result: any;
      try {
        result = originalMethod.apply(this, args);

        if (result instanceof Promise) {
          // Hide the loading indicator after the promise resolves
          return result.finally(() => {
            loadingService.hide();
          });
        } else if (result && typeof result.subscribe === 'function') {
          // Handle observable results
          return result.pipe(
            finalize(() => {
              loadingService.hide();
            })
          );
        } else {
          // For synchronous methods, hide loading after execution
          loadingService.hide();
          return result;
        }
      } catch (error) {
        // Hide the loading indicator if an error occurs
        loadingService.hide();
        throw error;
      }
    };

    return descriptor;
  };
}
