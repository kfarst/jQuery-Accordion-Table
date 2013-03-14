<h1>jQuery Accordion Table</h1>

 <p>This plugin allows for a table in which the alternating rows are "collapsed" and are able to be
 "expanded", similar to the accordion jQuery plugin. The difference, however, is that the accordion
 plugin transforms an unordered HTML list into an accordion, whereas this plugin converts an HTML
 table into an accordion.</p>

 Example:

```javascript
  $("table.listTable").accordionTable({
     'accordionOpenImg'      : 'minusImg',
     'accordionClosedImg'    : 'plusImg',
     'urlForAccordionRow'    : '/foo/bar',
     'spinnerId'             : 'spinnerId',
     'accordionRow'          : 'classForAccordionRowsInTable',
     'dataAttrs'             : function(e) {
       var foo_id = $(e.target).parents("tr").attr("data-foo"),
           uid = $(e.target).parents("table").attr("data-user")
       return { foo_id : foo_id, uid : uid }
     }
   });
```
<br />
 Methods:
<br />
 <p>The only method that needs to be called is $(selector).accordionTable({ options }); where
 $(selector) is the CSS selector for finding the table in the DOM, and .accordionTable({ options })
 initializes the accordion table with options for properly rendering the accordion.</p>
<br />
 Options:
```
 accordionOpenImg   :   This is the class for the image that will be displayed in the previous
                        row of an expanded row in the accordion table to not only indicate that the
                        row is expanded, but is also the image that is clicked to collapse the row
                        again. A suggestion might be an image of a minus sign.

 accordionClosedImg :   This is the class for the image that will be displayed in the previous
                        row of a collapsed row in the accordion table to not only indicate that the
                        row is collapsed, but is also the image that is clicked to expand the row
                        again. A suggestion might be an image of a plus sign.

 urlForAccordionRow :   This is the URL for fetching the data to be inserted into a table row that
                        is being expanded.

 spinnerId          :   This is the selector for the spinner image that will appear when a table
                        row is being expanded to indicate to the user that the data is being
                        fetched. Simply adding an ID (not class name) will be enough. The plugin
                        will handle all hiding and showing of the spinner image.

 accordionRow       :   This is the class name that should be applied to each table row that has
                        the ability to be expanded or collapsed in the accordion. Although
                        different configurations can be used, it is reccomended that this be every
                        other table row in order to make the most sense for the user and the
                        easiest logic to follow.

 dataAttrs          :   This is potentially the most confusing of all of the options. This option
                        is actually a function that is responsible for retreving the data to be
                        passed to the urlForAccordionRow action in order to return the correct data
                        for the expanded row. The only two requirements are that you return a JSON
                        object and that you pass the 'e' parameter into the function (this is the
                        click event that the plugin uses to action expanding of a table row when
                        the accordionClosedImg image is clicked. In the above example, the function
                        captures two data attributes from the previous (non-accordion) row so that
                        each accordion row displays the correct data related to the previous
                        (non-accordion) row.
```

