var app = angular.module('staffgridApp');
app.directive('staffgridpager', function () {
  var pager = {
    restrict: 'E',
    require: '^staffgrid',
    templateUrl: 'templates/staffgrid-pager.html',
    replace: true,
    link: function (scope, element, attrs, gridController) {

      //wait for data
      scope.$watch('data', function () {
        if (_.isUndefined(scope.data) || scope.data.length == 0) return;

        computePagerInfo();
      });

      scope.changePage = function () {
        console.log('page change!!');
        if (!_.isEmpty(scope.currentPage) && scope.currentPage != 0 && !isNaN(parseInt(scope.currentPage))) {
          scope.message = '';
          scope.currentPage = parseInt(scope.currentPage);
          gridController.changePage(scope.currentPage - 1);
        }
        else {
          scope.message = 'wrong value';
        }
      }

      scope.prevPage = function (event) {
        if (scope.currentPage > 1) {
          scope.currentPage -= 1;
          gridController.changePage(scope.currentPage - 1);
        }

        event.preventDefault();
      }

      scope.nextPage = function (event) {
        if (scope.currentPage != scope.totalPages) {
          scope.currentPage += 1;
          gridController.changePage(scope.currentPage - 1);
        }

        event.preventDefault();
      }

      var computePagerInfo = function () {
        var itemsPerPage = gridController.getItemsPerPage();

        //need to +1 because user should see 1 for the first page instead of 0
        scope.totalItems = scope.data.length;
        scope.totalPages = Math.floor(scope.data.length / itemsPerPage);
        scope.currentPage = 1;

        //we also need to +1 total pages in case if all items / items per page
        //has excess
        if (scope.data.length % itemsPerPage !== 0) {
          scope.totalPages += 1;
        }
      }
    }
  }

  return pager;
});