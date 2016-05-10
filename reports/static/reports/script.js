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
		dayOfMonthTemp.innerHTML = '  ' + months[date.getUTCMonth()] + ' ' + date.getUTCDate();

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

// Populate days with information
for(var i = 0; i < 5; i ++){

	var dayReport = $('.dayReport' + i);
	
	for(var j = 0; j < 8; j++){
		var date = new Date((data[j + i * 8]['localTimestamp'] + 14400) * 1000);
		var time = document.createElement('p');
		time.innerHTML = date.toLocaleTimeString();
		time.classList.add('times');
		$(dayReport).append(time);






		var swell = document.createElement('h6');

		if(data[j + i * 8]['swell']['minBreakingHeight'] != data[j + i * 8]['swell']['maxBreakingHeight'])
			swell.innerHTML = 'Waves: ' + data[j + i * 8]['swell']['minBreakingHeight'] + '-' + 
				data[j + i * 8]['swell']['maxBreakingHeight'] + ' ft ' + ' &nbsp;@ &nbsp;' + 
				data[j + i * 8]['swell']['components']['combined']['period'] + ' sec';
		else
			swell.innerHTML = 'Waves: ' + data[j + i * 8]['swell']['minBreakingHeight'] + ' ft' + ' &nbsp; &nbsp; @ &nbsp;' + 
				data[j + i * 8]['swell']['components']['combined']['period'] + ' sec';

		$(dayReport).append(swell);







	}
}










