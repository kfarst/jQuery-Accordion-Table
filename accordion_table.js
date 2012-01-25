/************************************** jQuery Accordion Table ****************************************/
//                                                                                                    //
// This plugin allows for a table in which the alternating rows are "collapsed" and are able to be    //
// "expanded", similar to the accordion jQuery plugin. The difference, however, is that the accordion //
// plugin transforms an unordered HTML list into an accordion, whereas this plugin converts an HTML   //
// table into an accordion.                                                                           //
//                                                                                                    //
// Example:                                                                                           //
//                                                                                                    //
//  $("table.listTable").accordionTable({                                                             //
//     'accordionOpenImg'      : 'entitlements_open',                                                 //
//     'accordionClosedImg'    : 'entitlements_closed',                                               //
//     'urlForAccordionRow'    : '/foo/bar',                                                          //
//     'spinnerId'             : 'spinnerId',                                                         //
//     'accordionRow'          : 'classForAccordionRowsInTable',                                      //
//     'dataAttrs'             : function(e) {                                                        //
//       var ca_id = $(e.target).parents("tr").attr("data-collection-asset"),                         //
//           sid = $(e.target).parents("table").attr("data-user")                                     //
//       return { ca_id : ca_id, sid : sid }                                                          //
//     }                                                                                              //
//   });                                                                                              //
//                                                                                                    //
// Methods:                                                                                           //
//                                                                                                    //
// The only method that needs to be called is $(selector).accordionTable({ options }); where          //
// $(selector) is the CSS selector for finding the table in the DOM, and .accordionTable({ options }) //
// initializes the accordion table with options for properly rendering the accordion.                 //
//                                                                                                    //
// Options:                                                                                           //
//                                                                                                    //
// accordionOpenImg   :   This is the class for the image that will be displayed in the previous      //
//                        row of an expanded row in the accordion table to not only indicate that the //
//                        row is expanded, but is also the image that is clicked to collapse the row  //
//                        again. A suggestion might be an image of a minus sign.                      //
//                                                                                                    //
// accordionClosedImg :   This is the class for the image that will be displayed in the previous      //
//                        row of a collapsed row in the accordion table to not only indicate that the //
//                        row is collapsed, but is also the image that is clicked to expand the row   //
//                        again. A suggestion might be an image of a plus sign.                       //
//                                                                                                    //
// urlForAccordionRow :   This is the URL for fetching the data to be inserted into a table row that  //
//                        is being expanded.                                                          //
//                                                                                                    //
// spinnerId          :   This is the selector for the spinner image that will appear when a table    //
//                        row is being expanded to indicate to the user that the data is being        //
//                        fetched. Simply adding an ID (not class name) will be enough. The plugin    //
//                        will handle all hiding and showing of the spinner image.                    //
//                                                                                                    //
// accordionRow       :   This is the class name that should be applied to each table row that has    //
//                        the ability to be expanded or collapsed in the accordion. Although          //
//                        different configurations can be used, it is reccomended that this be every  //
//                        other table row in order to make the most sense for the user and the        //
//                        easiest logic to follow.                                                    //
//                                                                                                    //
// dataAttrs          :   This is potentially the most confusing of all of the options. This option   //
//                        is actually a function that is responsible for retreving the data to be     //
//                        passed to the urlForAccordionRow action in order to return the correct data //
//                        for the expanded row. The only two requirements are that you return a JSON  //
//                        object and that you pass the 'e' parameter into the function (this is the   //
//                        click event that the plugin uses to action expanding of a table row when    //
//                        the accordionClosedImg image is clicked. In the above example, the function // 
//                        captures two data attributes from the previous (non-accordion) row so that  //
//                        each accordion row displays the correct data related to the previous        //
//                        (non-accordion) row.                                                        //
//                                                                                                    //
/******************************************************************************************************/

(function($){
  $.fn.accordionTable = function(options) {
  
   var settings = {
        'accordionOpenImg'      : '',
        'accordionClosedImg'    : '',
        'urlForAccordionRow'    : '',
        'dataForUrl'            : {},
        'spinnerId'             : '',
        'dataAttrs'             : {}
      };

   return this.each(function() {        
        // If options exist, lets merge them
        // with our default settings
        if ( options ) { 
          $.extend( settings, options );
        }

        hideAllAccordionRows();
        hideAllTableOpenIcons();

        $("img." + settings.accordionClosedImg).live("click", function(e) {
          toggleSpinner(e);

          $.ajax({
            url: settings.urlForAccordionRow,
            data: dataAttributes(e),
            complete: function(data) {
              var accordion_row = toggleAccordionRow(e);
              accordion_row.children("td").html(data.responseText);
              toggleSpinner(e);
            }
          });
        });

        $("img." + settings.accordionOpenImg).live("click", function(e) {
          toggleSpinner(e);
          toggleAccordionRow(e);
          toggleSpinner(e);
        });

        function dataAttributes(e) {
          if ($j.isFunction(settings.dataAttrs)) { 
            return settings.dataAttrs.call(this, e) 
          } 
          else { 
            return settings.dataAttrs
          }
        }

        function toggleSpinner(e) {
          $(e.target).parent().children("img#" + settings.spinnerId).toggle();
        }

        function toggleAccordionRow(e) {
          var non_accordion_row = $(e.target).parents("tr"),
              accordion_row = non_accordion_row.next("tr");

          accordion_row.toggle();
          non_accordion_row.children("td").last().children("img." + settings.accordionClosedImg).toggle();
          non_accordion_row.children("td").last().children("img." + settings.accordionOpenImg).toggle();
          return accordion_row;
        }

        function hideAllAccordionRows() {
          $("tr." + settings.accordionRow).each(function(index) {
            $(this).hide();
          });
        }

        function hideAllTableOpenIcons() {
          $("img." + settings.accordionOpenImg).each(function(index) {
            $(this).hide();
          });
        }


      });

  };
})(jQuery);
