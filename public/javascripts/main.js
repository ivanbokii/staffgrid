var app = angular.module('staffgridApp', []);

app.controller('MainController', function ($scope, $http) {
  $http.get('/grid-data')
  .success(initGrid)
  .error(showError);

  function initGrid (gridData) {
    $scope.data = gridData;
    window.data = gridData;
  }

  function showError () {
    console.log('something went wrong');
  }
});