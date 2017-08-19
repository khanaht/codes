(function($) {
	
  
$('.js-quickedit-page-title.page-header').removeClass('page-header');
$('h1.js-quickedit-page-title').css({'font-size':'30px'});
$('aside.col-sm-3').toggleClass('col-sm-3 col-sm-2');
$('section.col-sm-9').toggleClass('col-sm-9 col-sm-10');
$('.trigger.focusable').each(function () {
    this.style.setProperty( 'display', 'none', 'important' );
});
$('#block-navigationdashboard').children().eq(2).removeClass('menu, nav');
$('#block-navigationdashboard').children().eq(0).css({'font-size': '24px'});
$('.view-header h2').css({'font-size': '24px'});
$('thead tr th a').css({'color':'#000'});

  // Toggle class for plus and minus 
	
	function dashboard_toggle(data_target) {
		
		if(data_target.hasClass("fa-plus-square")) {

			data_target.removeClass("fa-plus-square");
			data_target.addClass("fa-minus-square"); 
		}else{
			data_target.removeClass("fa-minus-square");
			data_target.addClass("fa-plus-square"); 
		}	
	}

	$(document).ready(function(){ 
		
		
	
	// While clicking copernicus_code the data will be rendered in bottom of ID copernicus
		
		$("#data_view").on( "click"," .copernicus_code", function() {
			
		
			$("html, body").animate({ scrollTop: $(document).height() }, 1000);
			
			var parm =  $(this).text();
		
			$.ajax({
				type: 'GET', 
				url: '/launch/copernicus_code', 
				data: { copernicusName:parm}, 
			    success : function(data) {
			    	
			    	 var table = $("#copernicus");
			    	 $.each(data, function(key, val) {
			    		 
			    		  $.each(val, function(k, element) {
			    			  console.log(element);
			    	        table.append("<tr><td>"+element.SkuDesc+"</td><td>"+element.LaunchName+"</td>   <td>"+element.NpiPMemail+"</td> <td>"+element.NpiPMname+"</td></tr>");
			    		  });
			    	    });
			    	
                  }
				});

		});

		// Toggle class for plus and minus  second level 
		
		
		$("#data_view").on( "click"," .row-class i", function() {
			
			
			var data_target = $( this );
			var row_id  = $(this).parent();
	

			if(data_target.hasClass("fa-plus-square")) {

				data_target.removeClass("fa-plus-square");
				data_target.addClass("fa-minus-square"); 
			}else{
				data_target.removeClass("fa-minus-square");
				data_target.addClass("fa-plus-square"); 
				row_id.next().html('');
				return;
			}
			
			
			
			var  nid = $(this).parent().parent().parent().prev().attr('nid');
			var group_name = $(this).parent().parent().parent().prev().attr('group_name');
			var product_division = $(this).text();
			var tid  = $(this).parent().attr('tid');
			
				$.ajax({ 
				type: 'GET', 
				url: '/product_page.json', 
				data: { field_launch_target_id:nid,field_launch_group_target_id:group_name,field_product_division_target_id:product_division}, 
				success: function (data) {
					var html_datatable = '<table class="table table-responsive" style="background-color: #eee; margin-left:25px;"><thead><tr><th>Product Name</th><th>Category</th><th style="display:none;">Status</th><th style="display: none;">Track</th><th>Copernicus Codes</th><th>PM Portal</th><th style="display: none;">Business Division</th><th>Product Managers</th></tr></thead><tbody>';
					$.each(data, function(key, val) {
						html_datatable = html_datatable + '<tr>';
						html_datatable = html_datatable + '<td><a href="/products/'+val.p_nid+'/overview" hreflang="en">'+val.p_name+'<a></td>';
						html_datatable = html_datatable + '<td>'+val.p_category+'</td>';
						html_datatable = html_datatable + '<td class = "copernicus_code">'+val.p_copernicus_code+'</td>';
						html_datatable = html_datatable + '<td>'+val.p_program_name+'</td>';
						html_datatable = html_datatable + '<td>'+val.p_product_managers+'</td>';
						html_datatable = html_datatable + '</tr>';

					});
					html_datatable = html_datatable + '</tbody></table>';

					row_id.next().html('<div style ="padding-left:40px">'+html_datatable+'</div>')

				}
			});

			return false;


		});

		$("tr td[data-row]").on( "click", function() {
			
			
			var data_target = $( this ).children(); 


			if(data_target.hasClass("fa-plus-square")) {

				data_target.removeClass("fa-plus-square");
				data_target.addClass("fa-minus-square"); 
			}else{
				data_target.removeClass("fa-minus-square");
				data_target.addClass("fa-plus-square"); 
	
			}

			var data_target = $( this ).attr("data-target");  

			var loop_index = $( this ).attr("loop_index");

			var nid = $("tr[launch-row-list=row-"+loop_index+"] .launch_title").attr('nid');

			var group_name = $("tr[launch-row-list=row-"+loop_index+"] .launch_group a").text();



			$("tr[launch-row-list=row-"+loop_index+"]").attr('nid',nid);
			$("tr[launch-row-list=row-"+loop_index+"]").attr('group_name',group_name);

			$.ajax({ 
				type: 'GET', 
				url: '/product_page.json', 
				data: { field_launch_target_id:nid,field_launch_group_target_id:group_name}, 
				success: function (data) {

					var table_data = [];
					$("#"+data_target+" td").html("");
					$( "#"+data_target ).toggle("slow");

					for(var k in data) {

						table_data[data[k].p_division_tid[0]] = data[k].p_division_name;

					}
					for(var k in table_data) {


						var plus = '<a href="#" uib-popover="Expands the list of products and deliverables associated with this launch." data-toggle="collapse" ><i class="fa fa-plus-square" aria-hidden="true">&nbsp;&nbsp;'; 

						$("#"+data_target+" td").append("<div tid = "+k+" class='row-class'><i class='fa fa-plus-square' aria-hidden='true'><span style = 'padding-left:15px;'> "+table_data[k]+"</span> </i></a></div><div id = 'row-id-"+k+"' row-third-level ='third-row-id-"+k+"' class='row-collapse'> </div>");

					}
				}
			});

			return false;
		});



	});

})(jQuery);
