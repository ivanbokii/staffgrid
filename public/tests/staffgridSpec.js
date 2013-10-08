//this test suite contains tests for both grid and pager
describe('app', function() {
  var elm, scope;

  var testData = [
    {"age":67,"city":"Campden","country":"PY","firstName":"James","id":"KOJILUBIHR","lastName":"Thompson","postalCode":"10687"},
    {"age":98,"city":"Burrton","country":"CI","firstName":"Matthew","id":"RWWHEECDTN","lastName":"White","postalCode":"77748"},
    {"age":26,"city":"Ransom Canyon","country":"TF","firstName":"William","id":"GNUSXTAFUC","lastName":"Johnson","postalCode":"76812"}
  ];

  beforeEach(module('staffgridApp'));
  beforeEach(module('templates/staffgrid-pager.html', 'templates/staffgrid.html'));

  beforeEach(modeSetup('all', 1));

  function modeSetup (mode, initialSort) {
    return inject(function($rootScope, $compile) {
      $rootScope.data = testData;
      elm = angular.element("<staffgrid data='data' items-per-page='" + mode + "' initial-sort='" + initialSort +"'><staffgridpager></staffgridpager></staffgrid>");

      scope = $rootScope;
      $compile(elm)(scope);
      scope.$digest();
    });
  }

  describe('grid', function() {
    it('should render headers based on the fields of the data', function () {
      var headers = elm.find('table th');

      var numberOfHeaders = _.keys(testData[0]).length
      expect(headers.length).toBe(numberOfHeaders);
    });

    it('should render all rows if mode is "all"', function () {
      // -1 because of the headers row
      var rowsNumber = elm.find('tr').length - 1;

      expect(rowsNumber).toBe(testData.length);
    });

    it('should correctly render rows', function () {
      // 1 because of the headers row
       var testRow = elm.find('tr')[1];
       var values = _.map($(testRow).find('td'), function (row) {
         return $(row).text();
       });

       var exampleRow = testData[0];
       //data from html has numbers as strings
       values[0] = parseInt(values[0]);

       _.each(_.values(exampleRow), function (value, index) {
         expect(value).toEqual(values[index])
       });
    });

    it('should render specified number of items on the first page if mode is not "all"', function () {
      //specify number of items per page and sorting column
      modeSetup(1, 1);

      //because of the headers row
      var rowsNumber = elm.find('tr').length - 1;
      expect(rowsNumber).toBe(1);
    });

    it('should sort specific column', function() {
      //sort second column
      modeSetup("all", 2);

      var testRow = elm.find('tr')[1];
      var age = parseInt($(testRow).first('td').text());

      //using actual values instead of using ones from the test data because
      //the directive sorts testData collection and therefore there would be
      //no point in using testData in this assertion
      expect(age).toBe(98);
    });

    it('should sort in desc order on a click on the already sorted in asc order column', function () {
      modeSetup("all", 1);

      //use the fact that by default grid is sorted by the first column
      var firstColumnHeader = elm.find('th a')[0];
      firstColumnHeader.click();

      var testRow = elm.find('tr')[1];
      var age = parseInt($(testRow).first('td').text());

      expect(age).toBe(98);
    });

    it('should sort in asc order on a click on the already sorted in desc order column', function () {
      modeSetup("all", 1);

      //use the fact that by default grid is sorted by the first column
      var firstColumnHeader = elm.find('th a')[0];
      firstColumnHeader.click();
      firstColumnHeader.click();

      var testRow = elm.find('tr')[1];
      var age = parseInt($(testRow).first('td').text());

      expect(age).toBe(26);
    });
  });

  describe('pager', function() {
    it('should render the pager', function () {
      expect($(elm).find('.staffgrid-pager').first().length).toBe(1);
    });

    it('should render current and total pages', function() {
      modeSetup(1, 1);

      var pager = $(elm).find('.staffgrid-pager').first();
      var currentPage = $(pager).find('input').val();
      var totalPages = $(pager).find('.total').text();

      expect(currentPage).toBe('1');
      expect(totalPages).toBe('Number of pages: 3');
    });

    it('should change the page to the next one on the "next" button click', function() {
      modeSetup(1, 1);
      var pager = $(elm).find('.staffgrid-pager').first();

      var nextButton = $(pager).find('.next');
      nextButton.click();

      var currentPage = $(pager).find('input').val();

      expect(currentPage).toBe('2');
    });

    it('should change the page to the prev one on the "prev" button click', function() {
      modeSetup(1, 1);
      var pager = $(elm).find('.staffgrid-pager').first();

      var nextButton = $(pager).find('.next');
      nextButton.click();
      var prevButton = $(pager).find('.prev');
      prevButton.click();

      var currentPage = $(pager).find('input').val();
      expect(currentPage).toBe('1');
    });

    it('should not move to the next page if the current one is the last one', function() {
      modeSetup(1, 1);
      var pager = $(elm).find('.staffgrid-pager').first();
      var nextButton = $(pager).find('.next');

      nextButton.click();
      nextButton.click();
      nextButton.click();
      nextButton.click();

      var currentPage = $(pager).find('input').val();
      expect(currentPage).toBe('3');
    });

    it('should not move to the prev page if the current one is the first one', function() {
      modeSetup(1, 1);
      var pager = $(elm).find('.staffgrid-pager').first();

      var prevButton = $(pager).find('.prev');
      prevButton.click();

      var currentPage = $(pager).find('input').val();
      expect(currentPage).toBe('1');
    });
  })
});