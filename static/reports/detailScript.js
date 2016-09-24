// This file handles parsing of JSON for wave and tide data

// Global variables
var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];


// Format time stuff, split up by days and display times for each day
for(var i = 0; i < data.length; i++){

	var date = new Date((data[i]['localTimestamp'] + 14400) * 1000);

	// separate by days
	if(i % 8 === 0){

		var br = document.createElement('br');
		var dayOfWeek = document.createElement('h3');
		dayOfWeek.innerHTML = days[date.getUTCDay()] + '  ';
		var dayOfMonth = document.createElement('span');
		var dayOfMonthTemp = document.createElement('small');
		dayOfMonthTemp.innerHTML = ' &nbsp;&nbsp;' + months[date.getUTCMonth()] + ' ' + date.getUTCDate();

		if(i != 0)
			$('#daybyday').append(br);

		$(dayOfMonth).append(dayOfMonthTemp);
		$(dayOfWeek).append(dayOfMonth);
		$('#daybyday').append(dayOfWeek);

		var div = document.createElement('div');
		div.classList.add('dayReport' + i / 8);
		$('#daybyday').append(div);

	}
}






// Populate days with information and format text
for(var i = 0; i < 5; i ++){

	var dayReport = $('.dayReport' + i);
	var tideDate;
	
	for(var j = 0; j < 8; j++){

		// Add timestamps
		var date = new Date((data[j + i * 8]['localTimestamp'] + 14400) * 1000);
		tideDate = date;
		var time = document.createElement('p');
		time.innerHTML = date.toLocaleTimeString();
		time.classList.add('times');
		$(dayReport).append(time);


		// Manage rating
		var rating = [];

		for(var k = 0; k < data[j + i * 8]['solidRating']; k++){
			rating.push('<img src="http://cdnimages.magicseaweed.com/star_filled.png" />');
		}

		for(var k = 0; k < data[j + i * 8]['fadedRating']; k++){
			rating.push('<img src="http://cdnimages.magicseaweed.com/star_empty.png" />');		
		}


		// Manage spaces
		var temp = ''; 

		if(data[j + i * 8]['swell']['components']['combined']['period'] < 10) 
			temp = '&nbsp;&nbsp;';


		// Manage wind arrow
		var temp2 = '';

		for(var k = 0; k < 365; k += 5){
			if(data[j + i * 8]['wind']['direction'] >= k && data[j + i * 8]['wind']['direction'] < k + 5)
				if(data[j + i * 8]['wind']['direction'] <= 180)
					temp2 = "<span class='wa-" +  (k + 180).toString() + "'></span>";
				else
					temp2 = "<span class='wa-" +  (k - 180).toString() + "'></span>";
		}

		

		// Enter data
		var swell = document.createElement('h6');
		swell.classList.add('details');

		if(data[j + i * 8]['swell']['minBreakingHeight'] != data[j + i * 8]['swell']['maxBreakingHeight'])
			swell.innerHTML = 'Waves: ' + data[j + i * 8]['swell']['minBreakingHeight'] + '-' + 
				data[j + i * 8]['swell']['maxBreakingHeight'] + ' ft ' + ' &nbsp;@ &nbsp;' + 
				data[j + i * 8]['swell']['components']['combined']['period'] + ' sec &nbsp; &nbsp; &nbsp;' + temp +  
				"<span>" + rating.join(' ') + "</span>" + 
				'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' +
				'<span>' + 'Wind: ' + data[j + i * 8]['wind']['speed'] + ' mph' + '</span>' +
				'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' + 
				temp2 + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@ &nbsp;&nbsp;' +
				data[j + i * 8]['condition']['temperature'] + '&#8457';
		else
			swell.innerHTML = 'Waves: ' + data[j + i * 8]['swell']['minBreakingHeight'] + ' ft' + ' &nbsp; &nbsp; @ &nbsp;' + 
				data[j + i * 8]['swell']['components']['combined']['period'] + ' sec &nbsp; &nbsp; &nbsp;' + temp +
				"<span>" + rating.join(' ') + "</span>" + 
				'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' +
				'<span>' + 'Wind: ' + data[j + i * 8]['wind']['speed'] + ' mph' + '</span>' +
				'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' + 
				temp2 + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@ &nbsp;&nbsp;' +
				data[j + i * 8]['condition']['temperature'] + '&#8457';




		$(dayReport).append(swell);

	}









	// Add tide information
	var tideinfo = document.createElement('p');
	tideinfo.classList.add('times');
	tideinfo.innerHTML = 'Tides'
	$(dayReport).append(tideinfo);

	var lowhigh = document.createElement('h6');
	lowhigh.classList.add('details');

	var tidelist = [];
	var low1 = '';
	var low2 = '';
	var high1 = '';
	var high2 = '';

	tideDate = tideDate.getUTCDate() - 1;

	for(var j = 0; j < tides['response'][0]['periods'].length; j++){
		var tempDate = new Date(tides['response'][0]['periods'][j]['timestamp'] * 1000);
		if(tideDate == tempDate.getUTCDate()){
			tidelist.push(tides['response'][0]['periods'][j]);
		}
	}

	// console.log(tidelist);

	if(tidelist.length >= 2){
		for(var j = 0; j < tidelist.length; j++){
			if(tidelist[j]['type'] == 'l'){
				if(!low1)
					low1 = new Date(tidelist[j]['timestamp'] * 1000);
				if(low1)
					low2 = new Date(tidelist[j]['timestamp'] * 1000);
			}
			else if(tidelist[j]['type'] == 'h'){
				if(!high1)
					high1 = new Date(tidelist[j]['timestamp'] * 1000);
				if(low1)
					high2 = new Date(tidelist[j]['timestamp'] * 1000);
			}
		}

		// catch errors if there is no low2 or high2
		if(low2 == ''){
			low2 = low1;
		}  
		if(high2 == ''){
			high2 = high1;
		}

		// Make sure AM appears first
		if(low1.getHours() >= 12){
			var temp = low1;
			low1 = low2;
			low2 = temp;
		}

		if(high1.getHours() >= 12){
			var temp = high1;
			high1 = high2;
			high2 = temp;
		}



		lowhigh.innerHTML = 'Low: ' + low1.toLocaleTimeString() + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' + 
		'High: ' + high1.toLocaleTimeString() + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' +
		'Low: ' + low2.toLocaleTimeString() + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' + 
		'High: ' + high2.toLocaleTimeString() + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;';



		$(dayReport).append(lowhigh);
	}
}








// favorite a location
document.getElementById('favoriteButton').onclick = function() {
	$.ajax({
    url:'/reports/' + reportId + '/',
    type: "POST",
    data: {reportId: 'reportId'},
    success:function(response){},
    complete:function(){},
    error:function (xhr, textStatus, thrownError){}
	});
}




