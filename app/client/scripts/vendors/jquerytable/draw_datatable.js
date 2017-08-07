function draw_datatable(data,divid)
{
		var tableHeaders="";
		var TableName=data.TableName;
		var tableId = data.TableId;
		var scrollY= data.scrollY;
		var scrollX= data.scrollX;
		var scrollCollapse= data.scrollCollapse;
		var bAutoWidth= data.bAutoWidth;
		var pagging =data.pagging;
		var abVisCols= data.abVisCols;
		var ColReorder= data.ColReorder;
		var ColumnArray=data.columns;
		var aoColumnDefs =data.aoColumnDefs;
		var pagging= data.pagging;
		var tabledata= data.TableData;  
		
    		$.each(data.Header, function (index, value) 
    		{
        	       tableHeaders += "<th>" + value + "</th>";
        	       
    		});
    		$("#"+divid).empty();
                $("#"+divid).append('<table id="'+ tableId +'"  class="table table-striped table-bordered table-hover table.dataTable dataTable no-footer" role="grid" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
               
	       var iColumns = $("#"+tableId + "  thead th").length;
	       var table = $('#example').DataTable();
               //get column order
               var columnOrder = retrive_column_order(TableName);
		//console.log(columnOrder);           	

               //get column visibility
               var columnvisibility = retrive_column_visibility(TableName);
		//console.log(columnvisibility);  
            
	       //datatable function        
	       var datatable = $("#"+tableId).dataTable
                ({
                "sDom": 'C<"clear">RZlfrtip',
                "serverSide": true,
                "scrollY":scrollY,
                "scrollX":scrollX,
                "scrollCollapse":scrollCollapse,
                "bAutoWidth": bAutoWidth,
                "pagging":pagging,
                "abVisCols":abVisCols,
                "ColReorder":ColReorder,
		"colResize": 
         	{
          		"tableWidthFixed": false, 
          		"handleWidth": 10 
         	},
                // "aoColumnDefs": aoColumnDefs,
         	 "pagging":pagging,
                 "ajax":
                 {
                 	url:tabledata
                 },
                 "columns":ColumnArray,
		//column order 
                 "oColReorder": 
	  	 {
	      		
	  	      "aiOrder": columnOrder,//apply column order
	              "fnReorderCallback": function ()//save column order
	           	{
	                  var reorder = new $.fn.dataTable.ColReorder(datatable);
	                  var reorderdata=reorder.fnOrder();
	                  $.ajax
      			  ({
      			  	url: "save_col_order.php",
      			  	data: {reorderdata:reorderdata,TableName:TableName},
      			  	method: "POST",
      			  	success: function (result) 
      			  	{	
      			  		//console.log(result);
      			  	},
      			  	failure: function()
            			{
                   			 alert("Failed");
            			}  
      			   });
	                  
	               },     
	  	 },// close OcolReorder
		"colVis": //display column orderwise
		{
	            	"label": function ( index, title, th ) 
			{
                		return (index+1) +'. '+ title;
			}
            	}
	  }); //close datatable function  

	$(window).bind('resize', function () 
	{
		datatable.fnAdjustColumnSizing();
	});
	 //assign column visibility
	assign_column_visibility(tableId,columnvisibility,columnOrder,iColumns); 
	var table = $("#"+tableId).DataTable();	
	
	$(".ColVis_MasterButton").click(function () //on click close/hide button
	{
  		$("ul").on("click", "li", function () //on click checkbox
		{
		
  		var length = table.columns().nodes().length;
    		var col_visibility = [];
		for(var i=0;i<length;i++)
		{
    			col_visibility.push(table.column(i).visible());
		}
		//save column visibility
		$.ajax
      		({
      			  url: "save_col_visibility.php",
      			  data: {col_visibility:col_visibility,TableName:TableName},
      			  method: "POST",
      			  success: function (result) 
      			  {	
      			  	console.log(result);
      			  },
      			  failure: function()
            		  {
                   		alert("Failed");
            		  }  
      		});
      	        })
        });  
	tableHeaders=""; 
   
}
