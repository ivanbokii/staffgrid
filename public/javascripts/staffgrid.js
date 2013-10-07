var app = angular.module('staffgridApp');
app.directive('staffgrid', function () {
  var staffgrid = {
    restrict: 'E',
    replace: false,
    transclude: true,
    scope: {
      data: '=data',
      itemsPerPage: '@itemsPerPage'
    },
    templateUrl: '/templates/staffgrid.html',
    controller: function ($scope) {
      this.getCurrentPage = function () {
        return $scope.currentPage;
      }

      this.getItemsPerPage = function () {
        return $scope.itemsPerPage;
      }

      this.changePage = function (currentPage) {
        var skip = currentPage * $scope.itemsPerPage;

        $scope.items = _.first(_.rest($scope.data, skip), $scope.itemsPerPage);
        $scope.currentPage = currentPage;
      }

      $scope.changePage = this.changePage;
    },
    link: function (scope) {

      //wait for data
      scope.$watch('data', function () {
        //do not do anything since there is no data
        if (_.isUndefined(scope.data) || scope.data.length == 0) return;

        renderTable();
      });

      var renderTable = function () {
        scope.headers = extractHeaders(scope.data);

        //used in template to render rows
        scope.headersKeys = extractHeadersKeys(scope.data);

        //initial sort, this should be configurable
        scope.sort(0);

        scope.items = getInitialItems(scope.data, scope.itemsPerPage);
        scope.currentPage = 0;
      }

      //----sorting-------------------------------------------------------------
      //sorts column with index == headerIndex
      scope.sort = function (headerIndex) {
        //nothing was sorted yet
        if (_.isUndefined(scope.sortInfo)) {

          scope.sortInfo = {
            index: headerIndex,
            order: 'asc'
          }

          showSorting(headerIndex, scope.sortInfo.order, false);
        }
        else if (scope.sortInfo.index === headerIndex && scope.sortInfo.order === 'asc') {
          scope.sortInfo.order = 'desc';
          showSorting(headerIndex, scope.sortInfo.order, true);
        }
        else if (scope.sortInfo.index === headerIndex && scope.sortInfo.order === 'desc') {
          scope.sortInfo.order = 'asc';
          showSorting(headerIndex, scope.sortInfo.order, true);
        }
        else {
          removeSortingSymbol(scope.sortInfo.index);

          scope.sortInfo.index = headerIndex;
          scope.sortInfo.order = 'asc';

          showSorting(headerIndex, scope.sortInfo.order, false);
        }

        scope.data = scope.data.sort(function (a, b) {
          var key = scope.headersKeys[headerIndex];

          if (a[key] > b[key])
            return scope.sortInfo.order === 'asc' ? 1 : -1
          if (a[key] < b[key])
            return scope.sortInfo.order === 'asc' ? -1 : 1
          return 0;
        });

        scope.changePage(scope.currentPage);
      }

      var showSorting = function (headerIndex, order, isAlreadyApplied) {
        if (isAlreadyApplied) {
          removeSortingSymbol(headerIndex);
        }

        if (order === 'asc') {
          scope.headers[headerIndex] += "\u25BC";
        }
        else if (order === 'desc') {
          scope.headers[headerIndex] += "\u25B2";
        }
      }

      var removeSortingSymbol = function (headerIndex) {
        scope.headers[headerIndex] = scope.headers[headerIndex].slice(0, -1);
      }
      //------------------------------------------------------------------------
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

function getInitialItems (data, itemsPerPage) {
  if (itemsPerPage == 'all') {
    return data;
  }
  else {
    return _.first(data, itemsPerPage);
  }
}