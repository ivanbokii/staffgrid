var app = angular.module('staffgridApp');
app.directive('staffgridpager', function () {
  var pager = {
    restrict: 'E',
    require: '^staffgrid',
    templateUrl: '/templates/staffgrid-pager.html',
    replace: true,
    link: function (scope, element, attrs, gridController) {

      //wait for data
      scope.$watch('data', function () {
        if (_.isUndefined(scope.data) || scope.data.length == 0) return;

        computePagerInfo();
      });

      scope.changePage = function () {
        if (!_.isEmpty(scope.currentPage) && scope.currentPage != 0 && !isNaN(parseInt(scope.currentPage))) {
          scope.message = '';
          scope.currentPage = parseInt(scope.currentPage);
          gridController.changePage(scope.currentPage - 1);
        }
        else {
          scope.message = 'wrong value';
        }
      }

      scope.prevPage = function () {
        if (scope.currentPage > 1) {
          scope.currentPage -= 1;
          gridController.changePage(scope.currentPage - 1);
        }
      }

      scope.nextPage = function () {
        if (scope.currentPage != scope.totalPages) {
          scope.currentPage += 1;
          gridController.changePage(scope.currentPage - 1);
        }
      }

      var computePagerInfo = function () {
        //need to +1 because user should see 1 for the first page instead of 0
        //because of this we also need to +1 total pages
        scope.totalItems = scope.data.length;
        scope.totalPages = Math.floor(scope.data.length / gridController.getItemsPerPage()) + 1;
        scope.currentPage = 1;
      }
    }
  }

  return pager;
});