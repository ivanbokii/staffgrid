StaffGrid
==========

Simple table widget built as an Angular.js directive.
You can see an example of this directive
[here](http://staffgrid.ivanbokii.com)

![alt tag](http://i40.tinypic.com/rvx7o0.jpg)


Installation
------------
Widget uses jQuery, Underscore.js and of course Angular.js

```html
<!DOCTYPE html>
<html ng-app='staffgridApp'>
  <head>
    <title>Angular table</title>
    <link rel='stylesheet' href='/stylesheets/style.css' />
    <link rel='stylesheet' href='/stylesheets/grids.css' />
  </head>
  <body>
    <div class='container'>
      <h1>Angular table directive example</h1>
      <div ng-controller='MainController'>
        <staffgrid class='simple-grid' data='data' items-per-page='10' initial-sort='1' width='800'>
          <staffgridpager></staffgridpager>
        </staffgrid>

        <staffgrid class='second-grid' data='data' items-per-page='5' initial-sort='4' width='800'>
          <staffgridpager></staffgridpager>
        </staffgrid>
      </div>
    </div>
  </body>

  <script type="text/javascript" src='/javascripts/vendor/jquery.min.js'></script>
  <script type="text/javascript" src='/javascripts/vendor/underscore.js'></script>
  <script type="text/javascript" src='/javascripts/vendor/angular.js'></script>
  <script type="text/javascript" src='/javascripts/main.js'></script>
  <script type="text/javascript" src='/javascripts/staffgrid.js'></script>
  <script type="text/javascript" src='/javascripts/staffgrid-pager.js'></script>
</html>
```

Description
-----------
StaffGrid directive has supplementary 'pager' directive that is used to add paging support to the grid.
Pager directive does not have any configuration and adds a small navigation panel below the grid.

###API
StaffGrid directive has next parameters:
- data - JSON array with objects that should be shown in the grid. StaffGrid directive uses objects' keys
to create columns' headers
- items-per-page - sets how much items grid should show per page. If staffgridpager is not used, grid
grid only shows first page.
- initial-sort - sets index of the column by which grid would be sorted after initialization
- width - grid's width in pixels

Tests
-----
Solutions contains jasmine tests that run by Karma tests runner.
To run tests install Karma:

```sh
$ npm install -g karma
$ karma start
```

Example page
------------
Solution also contains an example page with a couple of StaffGrids. It is using express.js to
run web server. To look at the page, run node server:

```sh
$ npm install
$ node app.js
```

and open http://localhost:3000 in your browser


You can subscribe to the events during plugin initialization, like this:
```javascript
$('oh-yeah-super-selector').tinyEvents({‘
  handlers: {
    onDateChange: yourHandler,
    //...other events
  }
});
```

Styling
-------
StaffGrid can be styled by modifying css styles.