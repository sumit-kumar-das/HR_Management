function retrive_column_order(TableName)
{

	 var column_order=new  Object();
	 var result  = $.ajax
	 ({ 
	 	type: "POST",   
         	url: "retrive_column_order.php", 
         	data: {TableName:TableName},  
         	async: false,
         	success : function(text)
         	{
         		//console.log(text)
			return text;	
         	}
   	 });
	 
         var text = result.responseText;
         var str =  text.replace(/\"/g, '');
         var str1 =  str.replace("[", '');
         var str2 =  str1.replace("]", '');
         var column_order= str2.split(",");
	 for (var i=0; i<column_order.length; i++)
	 {
    		column_order[i] = parseInt(column_order[i], 10);
	 }
	 return column_order;


} 
function retrive_column_visibility(TableName)
{
	 var column_visibility=new Object();
	 var visibility_data  = $.ajax({ 
	 type: "POST",   
         url: "retrive_column_visibility.php",  
         data: {TableName:TableName},   
         async: false,
         success : function(string)
         {
         	//console.log(string)
		return string;	
         }
   	 });
       
         var string = visibility_data.responseText; 
	 var str =  string.replace(/\"/g, '');
         var str1 =  str.replace("[", '');
         var str2 =  str1.replace("]", '');
         var column_visibility= str2.split(",");
         return column_visibility;
}
function  assign_column_visibility(tableId,columnvisibility,columnOrder,iColumns)
{
	var assingvisiblilty;
	for (var i=0; i < iColumns; i++) 
	{	
		assingvisiblilty = columnvisibility[i];
		if(assingvisiblilty =="true") 
		{  
  			assingvisiblilty = true;  //assign boolean value
		} 
		else 
		{  
  			assingvisiblilty= false;  //assign boolean value
		}
		var table = $("#"+tableId).DataTable();	
		table.column(columnOrder[i]).visible(assingvisiblilty);
    	}
}
