		//now what?
		/*if they enter an orgId (we will get it next class through a search), we need to find:
			-What different areas of information the organization has (/Application/Tabs?orgId=x)
			-then, find each area on demand (each will need it's own call)
				General
					Path: ...ESD/{orgId}/General  (this one we did together!)
				Locations
					Path: ...ESD/{orgId}/Locations
				Treatment
					Path: ...ESD/{orgId}/Treatments
				Training
					Path: ...ESD/{orgId}/Training
				Facilities
					Path: ...ESD/{orgId}/Facilities
				Equipment
					Path: ...ESD/{orgId}/Equipment
				Physicians
					Path: ...ESD/{orgId}/Physicians
				People
					Path: ...ESD/{orgId}/People
		*/
		
	///////////////////////////////////////
	//Build the search functionality.
	//onload, get the cities for the state.
	$(document).ready(function(){
		getCities('NY');
		getOrgTypes();

		// Setup modal plugin
		$( "#dialog" ).dialog({ 
			autoOpen: false,
			dialogClass: "outer-container dialog-override"
		});

		// Setup jQuery outside events plugin
		// Added extra firstTime bool check since it fires an outside click
		// the second the dialog is opened, thus auto closing it otherwise
		var firstTime = true;
		$("#dialog").bind('clickoutside',function(){
			if($("#dialog").dialog("isOpen")){
				// If first outside click when open, set first time to false
				if(firstTime){	
					firstTime = false;
				}
				// If not first outside click when open, close dialog
				// and reset firstTime to true
				else{
	    			$( "#dialog" ).dialog( "close" );
	    			firstTime = true;
				}
			}
		});	

		// $("#orgTabs a").click(function(){
			// window['get'+$(this).href()]('+id+')
		// });
	});
		
	//For now, this will be a select to get the 'tabs' needed for the orgId.   
	// For the project you will do this with tabs from the jQuery UI.
	function getData(id){
	//we need to figure out how many 'tabs' or areas of information this type of org has
		$.ajax({
			type:'get',
			async:true,
			url:'proxy.php',
			data:{path:'/Application/Tabs?orgId='+id},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
					//output that server is down/sucks
				}else{
					//data should be an xml doc with the tabs that I need
					var x = "<ul id='orgTabs'>";
					// var x='<select onchange="window[\'get\'+$(this).val()]('+id+')">';				

					$('Tab',data).each(function(){
						x+= '<li><a>' + $(this).text() + '</a></li>';
						// x+='<option value="'+$(this).text()+'">'+$(this).text()+'</option>';
					});
					x+= "</ul>";

					//dump it out
					$('#dump').html(x+'</select>');
					getGeneral(id);
					
					$("#orgTabs li a").click(function(){
						$(this).addClass("current");
						window['get'+$(this).text()](id);
					});
				}
			}
		});
	}

	// This will be called by the changing of the select to get the general information for orgId
	function getGeneral(id){
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/General'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}
				else{
				var x='<table><tr><td>Name:</td><td>'+myFind('name', data)+'</td></tr>';
				x+='<tr><td>Description:</td><td>'+myFind('description', data)+'</td></tr>';
				x+='<tr><td>Email:</td><td>'+myFind('email', data)+'</td></tr>';
				x+='<tr><td>Website:</td><td>'+myFind('website', data)+'</td></tr>';
				x+='<tr><td>Number of Members:</td><td>'+myFind('nummembers', data)+'</td></tr>';
				x+='<tr><td>Cumber of Calls:</td><td>'+myFind('numcalls', data)+'</td></tr></table>';
						
					/// this line will change slightly when we add the tabs plugin
					$('#output').html(x);
				}
			}
		});
	}
	
	//Student needs to build these:
	function getLocations(id){
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Locations'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}
				else{
					var x = '<table>';
					x+= '<tr>';
					x+= 	'<th class="header">Type</th>';
					x+= 	'<th class="header">Address 1</th>';
					x+= 	'<th class="header">Address 2</th>';
					x+= 	'<th class="header">City</th>';
					x+= 	'<th class="header">State</th>';
					x+= 	'<th class="header">Zip</th>';
					x+= 	'<th class="header">Phone</th>';
					x+= 	'<th class="header">TTY Phone</th>';
					x+= 	'<th class="header">Fax</th>';
					x+= 	'<th class="header">Latitude</th>';
					x+= 	'<th class="header">Longitude</th>';
					x+= 	'<th class="header">County</th>';
					x+= '</tr>';

					$locations = $(data).find('location');
					$locations.each(function(i){
						x+= '<tr>';
						x+=		'<td>' + myFind('type', this)	+ '</td>';
						x+=		'<td>' + myFind('address1', this)	+ '</td>';
						x+=		'<td>' + myFind('address2', this)	+ '</td>';
						x+=		'<td>' + myFind('city', this)	+ '</td>';
						x+=		'<td>' + myFind('state', this)	+ '</td>';
						x+=		'<td>' + myFind('zip', this)	+ '</td>';
						x+=		'<td>' + myFind('phone', this)	+ '</td>';
						x+=		'<td>' + myFind('ttyPhone', this)	+ '</td>';
						x+=		'<td>' + myFind('fax', this)	+ '</td>';
						x+=		'<td>' + myFind('latitude', this)	+ '</td>';
						x+=		'<td>' + myFind('longitude', this)	+ '</td>';
						x+=		'<td>' + myFind('countyName', this)	+ '</td>';
						x+= '</tr>';					
					})
					x+= '</table>';
					
					/// this line will change slightly when we add the tabs plugin
					$('#output').html(x);
				}
			}
		});
	}
	
	function getTraining(id){
		console.log(id);
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Training'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}
				else{
					var x = '<table>';
					x+= '<tr>';
					x+= 	'<th class="header">Type ID</th>';
					x+= 	'<th class="header">Type</th>';
					x+= 	'<th class="header">Abbreviation</th>';
					x+= '</tr>';

					$training = $(data).find('training');
					$training.each(function(i){
						x+= '<tr>';
						x+=		'<td>' + myFind('typeId', this)	+ '</td>';
						x+=		'<td>' + myFind('type', this)	+ '</td>';
						x+=		'<td>' + myFind('abbreviation', this)	+ '</td>';
						x+= '</tr>';					
					})
					x+= '</table>';
					
					/// this line will change slightly when we add the tabs plugin
					$('#output').html(x);
				}
			}
		});
	}

	function getTreatment(id){
		console.log(id);
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Treatments'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}
				else{
					var x = '<table>';
					x+= '<tr>';
					x+= 	'<th class="header">Type ID</th>';
					x+= 	'<th class="header">Type</th>';
					x+= 	'<th class="header">Abbreviation</th>';
					x+= '</tr>';

					$training = $(data).find('treatment');
					$training.each(function(i){

						x+= '<tr>';
						x+=		'<td>' + myFind('typeId', this)	+ '</td>';
						x+=		'<td>' + myFind('type', this)	+ '</td>';
						x+=		'<td>' + myFind('abbreviation', this)	+ '</td>';
						x+= '</tr>';					
					})
					x+= '</table>';
					
					/// this line will change slightly when we add the tabs plugin
					$('#output').html(x);
				}
			}
		});
	}

	function getFacilities(id){
		console.log(id);
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Facilities'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}
				else{
					var x = '<table>';
					x+= '<tr>';
					x+= 	'<th class="header">Type ID</th>';
					x+= 	'<th class="header">Type</th>';
					x+= 	'<th class="header">Quantity</th>';
					x+= 	'<th class="header">Description</th>';
					x+= '</tr>';

					$training = $(data).find('facility');
					$training.each(function(i){
						x+= '<tr>';
						x+=		'<td>' + myFind('typeId', this)	+ '</td>';
						x+=		'<td>' + myFind('type', this)	+ '</td>';
						x+=		'<td>' + myFind('quantity', this)	+ '</td>';
						x+=		'<td>' + myFind('description', this)	+ '</td>';
						x+= '</tr>';					
					})
					x+= '</table>';
					
					/// this line will change slightly when we add the tabs plugin
					$('#output').html(x);
				}
			}
		});
	}

	function getEquipment(id){
		console.log(id);
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Equipment'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}
				else{
					var x = '<table>';
					x+= '<tr>';
					x+= 	'<th class="header">Type ID</th>';
					x+= 	'<th class="header">Type</th>';
					x+= 	'<th class="header">Quantity</th>';
					x+= 	'<th class="header">Description</th>';
					x+= '</tr>';

					$training = $(data).find('equipment');
					$training.each(function(i){
						x+= '<tr>';
						x+=		'<td>' + myFind('typeId', this)	+ '</td>';
						x+=		'<td>' + myFind('type', this)	+ '</td>';
						x+=		'<td>' + myFind('quantity', this)	+ '</td>';
						x+=		'<td>' + myFind('description', this)	+ '</td>';
						x+= '</tr>';					
					})
					x+= '</table>';
					
					/// this line will change slightly when we add the tabs plugin
					$('#output').html(x);
				}
			}
		});
	}
	function getPhysicians(id){
		console.log(id);
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/Physicians'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}
				else{
					var x = '<table>';
					x+= '<tr>';
					x+= 	'<th class="header">Person ID</th>';
					x+= 	'<th class="header">First Name</th>';
					x+= 	'<th class="header">Middle Name</th>';
					x+= 	'<th class="header">Last Name</th>';
					x+= 	'<th class="header">Suffix</th>';
					x+= 	'<th class="header">Phone</th>';
					x+= 	'<th class="header">License</th>';
					x+= '</tr>';

					$training = $(data).find('physician');
					$training.each(function(i){
						x+= '<tr>';
						x+=		'<td>' + myFind('personId', this)	+ '</td>';
						x+=		'<td>' + myFind('fName', this)	+ '</td>';
						x+=		'<td>' + myFind('mName', this)	+ '</td>';
						x+=		'<td>' + myFind('lName', this)	+ '</td>';
						x+=		'<td>' + myFind('suffix', this)	+ '</td>';
						x+=		'<td>' + myFind('phone', this)	+ '</td>';
						x+=		'<td>' + myFind('license', this)	+ '</td>';
						x+= '</tr>';					
					})
					x+= '</table>';
					
					/// this line will change slightly when we add the tabs plugin
					$('#output').html(x);
				}
			}
		});
	}

	function getPeople(id){
		$('#output').html('going to get People of '+id);
		console.log(id);
		$.ajax({
			type:'get',
			url:'proxy.php',
			data:{path:'/'+id+'/People'},
			dataType:'xml',
			success:function(data){
				if($(data).find('error').length!=0){
				//do something....
				}
				else{
					var x = '<table>';
					x+= '<tr>';
					x+= 	'<th class="header">Person ID</th>';
					x+= 	'<th class="header">First Name</th>';
					x+= 	'<th class="header">Middle Name</th>';
					x+= 	'<th class="header">Last Name</th>';
					x+= 	'<th class="header">Suffix</th>';
					x+= 	'<th class="header">Phone</th>';
					x+= 	'<th class="header">License</th>';
					x+= '</tr>';

					$training = $(data).find('person');
					$training.each(function(i){
						x+= '<tr>';
						x+=		'<td>' + myFind('personId', this)	+ '</td>';
						x+=		'<td>' + myFind('fName', this)	+ '</td>';
						x+=		'<td>' + myFind('mName', this)	+ '</td>';
						x+=		'<td>' + myFind('lName', this)	+ '</td>';
						x+=		'<td>' + myFind('suffix', this)	+ '</td>';
						x+=		'<td>' + myFind('phone', this)	+ '</td>';
						x+=		'<td>' + myFind('license', this)	+ '</td>';
						x+= '</tr>';					
					})
					x+= '</table>';
					
					/// this line will change slightly when we add the tabs plugin
					$('#output').html(x);
				}
			}
		});
	}

	//This function is called when user changes the state select (and onload)
    function getCities(which){
		if(which == ''){
			$('#orgCitySearch').html('City/Town<input id="cityTown" type="text"/>');
		}
		else{
			$.ajax({
				type: "GET",
				async: true,
				cache:false,
				url: "proxy.php",
				data: {path: "/Cities?state="+which},  
				dataType: "xml",
				success: function(data, status){ 
	   	 			var x='';
	   	 			if($(data).find('error').length != 0){
	       	 			//do nothing?
	   	 			}else if($(data).find('row').length==0 && which != ''){
	   	 				$('#orgCitySearch').html('City/Town<input id="cityTown" type="text" value="No cities/Towns in "'+which+'"/>');
	   	 			}else{
	   	 				x+='<select id="cityTown" name="town"><option value="">--cities--<\/option>';
	   	 				$('row',data).each(
	   	 					function(){
	   	 						x+='<option value="'+$(this).find('city').text()+'">'+$(this).find('city').text()+'<\/option>';
	   	 					}
	   	 				);
	   	 				x+="<\/select>";
	   	 				$('#orgCitySearch').html(x);
	   	 			}
		   		}
			});
		}
	}
	
	//Because the orgTypes could change we load them 'fresh' every time.
	//In reality you should load these in PHP on the server end (saves a round trip)
	//but since this is client...
	function getOrgTypes(){
		$.ajax({
			type: "GET",
			async: true,
			cache:false,
			url: "proxy.php",
			data: {path: "/OrgTypes"},  
			dataType: "xml",
			success: function(data, status){ 
   	 			var x='';
   	 			if($(data).find('error').length != 0){
       	 			//do nothing?
   	 			}else{
   	 				x+='<option value="">All Organization Types<\/option>';
   	 				$('row',data).each(
   	 					function(){
   	 						x+='<option value="'+myFind('type', this)+'">'+myFind('type', this)+'<\/option>';
   	 					}
   	 				);
   	 				//return x;
   	 				$("#orgType").html(x);
   	 			}
	   		}
		});
	}
	
	//Do a search. 
	//so when an org is clicked it will create the select and getGeneral().
	function checkSearch(){
		$.ajax({
			type: "GET",
			async: true,
			cache:false,
			url: "proxy.php",
			data: {path: "/Organizations?"+$('#Form1').serialize()},
			dataType: "xml",
			success: function(data, status){ 
					var x='';
   	 			$('#tabelOutput').html('');
   	 			if($(data).find('error').length != 0){
       	 			$('error', data).each(
	   	 				function(){
   		 				x+="error getting data"; 
   	 					}
   	 				);
   	 			}
   	 			else if($(data).find('row').length==0){
   	 				x+="No data matches for: "+$('#orgType').val() + (($('#orgName').val()!='')?" > name: "+$('#orgName').val():"") + (($('#state').val()!='')?" > State: "+$('state').val():"");
   	 				if($('#cityTown').val()=='' || $('#cityTown').val().search(/No cities/)==0){
   	 					x+="";
   	 				}else{
   	 					x+=" > City: "+$('#cityTown').val();
   	 				}
   	 			//This is for a Physician - it will be different data coming back
   	 			}
   	 			else if($("#orgType").val() == "Physician"){
   	 				$("#resultsTitle").html(' ('+$(data).find('row').length+' total found)');
   	 				// build a table of Physician information
   	 			}
   	 			else{
   	 				$("#resultsTitle").html(' ('+$(data).find('row').length+' total found)');
   	 				x+="<div><table id=\"myTable\" class=\"tablesorter table table-striped table-hover\" border=\"0\" cellpadding=\"0\" cellspacing=\"1\"><thead><tr><th class=\"header\" style=\"width:90px;\">Type<\/th><th class=\"header\">Name<\/th><th class=\"header\">City<\/th><th class=\"header\">Zip<\/th><th class=\"header\" style=\"width:70px;\">County<\/th><th class=\"header\" style=\"width:40px;\">State<\/th><\/tr><\/thead>";
   	 				x+="<tbody id='tbody'>"
   	 				$('row',data).each(
   	 					function(){
   	 						x+='<tr>';
   							x+="<td>"+myFind('type', this)+"<\/td>";
    						x+="<td class='openModal' style=\"cursor:pointer;color:#987;\" onclick=\"getData("+myFind('OrganizationID', this)+");\">"+myFind('Name', this)+"<\/td>";
   	 						x+="<td>"+myFind('city', this)+"<\/td>";
   	 						x+="<td>"+myFind('zip', this)+"<\/td>";
   	 						x+="<td>"+myFind('CountyName', this)+"<\/td>";
   	 						x+="<td>"+myFind('State', this)+"<\/td><\/tr>";
   	 					}
   	 				);
   	 				x+="</tbody><\/table>";
   	 			}
	     		$('#tabelOutput').html(x);


	     		$("div.holder").jPages({
			        containerID : "tbody",
			        perPage : 15
			    });

			    $( ".openModal" ).click(function() {
					$( "#dialog" ).dialog( "open" );			
				});
	   		}
		});
	}
	
	//Occasionally we will get back 'null' as a value
	//you should NEVER show 'null' in the client - make it blank...
	function myFind(what,data){
		return (($(data).find(what).text()!='null')?$(data).find(what).text()+' ':'')
	}