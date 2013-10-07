var app = angular.module('staffgridApp');
app.directive('staffgrid', function () {
  var staffgrid = {
    restrict: 'E',
    replace: false,
    scope: {
      data: '=data',
      itemsPerPage: '@itemsPerPage'
    },
    templateUrl: '/templates/staffgrid.html',
    link: function (scope) {

      //wait for data
      scope.$watch('data', function () {
        //do not do anything since there is no data
        if (_.isUndefined(scope.data) || scope.data.length == 0) return;

        renderTable();
        renderPager();
      });

      var renderTable = function () {
        scope.headers = extractHeaders(scope.data);

        //used in template to render rows
        scope.headersKeys = extractHeadersKeys(scope.data);
        scope.items = _.first(scope.data, scope.itemsPerPage);
      }

      var renderPager = function () {
        var totalItems = scope.data.length;
        var totalPages = Math.floor(totalItems / scope.itemsPerPage);
        // var currentPage =
      }
    }
  }

  return staffgrid;
});

//assume that we need to extract headers from the data itself
//the other option is to pass headers from the outer scope (by controller)
function extractHeaders (data) {
  var element = data[0];

  //capitalize headers
  var headers = _.chain(_.keys(element))
    .map(function (key) {
      return key.charAt(0).toUpperCase() + key.substring(1).toLowerCase();
    })
    .value();

  return headers;
}

//extracts item's keys' names as is (for convenience)
function extractHeadersKeys (data) {
  return _.keys(data[0]);
}