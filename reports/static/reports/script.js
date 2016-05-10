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
	
	for(var j = 0; j < 8; j++){

		// Add timestamps
		var date = new Date((data[j + i * 8]['localTimestamp'] + 14400) * 1000);
		var time = document.createElement('p');
		time.innerHTML = date.toLocaleTimeString();
		time.classList.add('times');
		$(dayReport).append(time);


		// Manage rating
		var rating = [];

		for(var k = 0; k < data[j + i * 8]['solidRating']; k++){
			rating.push('<img src="http://cdnimages.magicseaweed.com/star_filled.png" />');
		}

		for(var k = 0; k < data[j + i * 8]['solidRating']; k++){
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
				if(data[j + i * 8]['wind']['direction'] < 180)
					temp2 = "<span class='wa-" +  (k + 180).toString() + "'></span>";
				else
					temp2 = "<span class='wa-" +  (k - 180).toString() + "'></span>";
		}

		

		// Enter data
		var swell = document.createElement('h6');

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
				data[j + i * 8]['condition']['temperature'] + '&#8457';;









		$(dayReport).append(swell);




	}
}










