var authInterceptorFactoryModule = angular.module('authInterceptorFactoryModule', []);

authInterceptorFactoryModule.factory('authInterceptor', function ($rootScope, $q, $window, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },
        responseError: function (response) {
            if (response.status == 401) {
                $location.path('/');
            }
            return $q.reject(response);
        }
    };
});