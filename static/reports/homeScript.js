var dataList = []

for(var i = 0; i < reports.length; i++){

	// set up divs and titles
	var spotDiv = document.createElement('div');
	spotDiv.classList.add('spotDiv');
	spotDiv.classList.add('spot' + i);
	var br = document.createElement('br');

	var spotName = document.createElement('h3');
	spotName.innerHTML = names[i];
	var a = document.createElement('a');
	a.href = '/reports/' + reports[i];
	$(a).append(spotName);

	$('#spotbyspot').append(spotDiv);
	$('#spotbyspot').append(br);
	$('.spot' + i).append(a);
	
	// get data for each favorited spot
	var data = '';
	$.get('http://magicseaweed.com/api/aa1171867a9a7698c04e99235767afb8/forecast/?spot_id=' + reports[i] + '&units=us', function(x){
		data = x;
	}, 'jsonp').success(function(){
		dataList.push(data);		
	});

}

// account for stupid AJAX
setTimeout(function(){

	console.log(dataList);

	for(var j = 0; j < reports.length; j++){
		for(var k = 0; k < 3; k++){

			var time = document.createElement('p');
			time.classList.add('times');


			if(k == 0){
				time.innerHTML = '6:00:00 AM';
				var minHeight = dataList[j][2]['swell']['minBreakingHeight'];
				var maxHeight = dataList[j][2]['swell']['maxBreakingHeight'];
				var period = dataList[j][2]['swell']['components']['combined']['period'];
				var windSpeed = dataList[j][2]['wind']['speed'];
				var temperature = dataList[j][2]['condition']['temperature'];

				// Manage rating
				var rating = [];

				for(var h = 0; h < dataList[j][2]['solidRating']; h++){
					rating.push('<img src="http://cdnimages.magicseaweed.com/star_filled.png" />');
				}

				for(var h = 0; h < dataList[j][2]['fadedRating']; h++){
					rating.push('<img src="http://cdnimages.magicseaweed.com/star_empty.png" />');		
				}

				// Manage wind arrow
				var temp2 = '';
				for(var h = 0; h < 365; h += 5){
					if(dataList[j][2]['wind']['direction'] >= h && dataList[j][2]['wind']['direction'] < h + 5)
						if(dataList[j][2]['wind']['direction'] <= 180)
							temp2 = "<span class='wa-" +  (h + 180).toString() + "'></span>";
						else
							temp2 = "<span class='wa-" +  (h - 180).toString() + "'></span>";
				}

			}
			else if( k == 1){
				time.innerHTML = '12:00:00 PM';	
				var minHeight = dataList[j][4]['swell']['minBreakingHeight'];
				var maxHeight = dataList[j][4]['swell']['maxBreakingHeight'];
				var period = dataList[j][4]['swell']['components']['combined']['period'];
				var windSpeed = dataList[j][4]['wind']['speed'];
				var temperature = dataList[j][4]['condition']['temperature'];

				var rating = [];

				for(var h = 0; h < dataList[j][4]['solidRating']; h++){
					rating.push('<img src="http://cdnimages.magicseaweed.com/star_filled.png" />');
				}

				for(var h = 0; h < dataList[j][4]['fadedRating']; h++){
					rating.push('<img src="http://cdnimages.magicseaweed.com/star_empty.png" />');		
				}

				// Manage wind arrow
				var temp2 = '';
				for(var h = 0; h < 365; h += 5){
					if(dataList[j][4]['wind']['direction'] >= h && dataList[j][4]['wind']['direction'] < h + 5)
						if(dataList[j][4]['wind']['direction'] <= 180)
							temp2 = "<span class='wa-" +  (h + 180).toString() + "'></span>";
						else
							temp2 = "<span class='wa-" +  (h - 180).toString() + "'></span>";
				}

			}
			else if (k == 2){
				time.innerHTML = '6:00:00 PM';
				var minHeight = dataList[j][6]['swell']['minBreakingHeight'];
				var maxHeight = dataList[j][6]['swell']['maxBreakingHeight'];
				var period = dataList[j][6]['swell']['components']['combined']['period'];
				var windSpeed = dataList[j][6]['wind']['speed'];
				var temperature = dataList[j][6]['condition']['temperature'];

				var rating = [];

				for(var h = 0; h < dataList[j][6]['solidRating']; h++){
					rating.push('<img src="http://cdnimages.magicseaweed.com/star_filled.png" />');
				}

				for(var h = 0; h < dataList[j][6]['fadedRating']; h++){
					rating.push('<img src="http://cdnimages.magicseaweed.com/star_empty.png" />');		
				}

				// Manage wind arrow
				var temp2 = '';
				for(var h = 0; h < 365; h += 5){
					if(dataList[j][6]['wind']['direction'] >= h && dataList[j][6]['wind']['direction'] < h + 5)
						if(dataList[j][6]['wind']['direction'] <= 180)
							temp2 = "<span class='wa-" +  (h + 180).toString() + "'></span>";
						else
							temp2 = "<span class='wa-" +  (h - 180).toString() + "'></span>";
				}

			}


			var swell = document.createElement('span');
			var swellInfo = document.createElement('h6');
			swellInfo.classList.add('homeDetail');

			var temp = ''; 
			if(period < 10) 
				temp = '&nbsp;&nbsp;';

			if(k == 1)
				var waveString = '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' + 'Waves: ';
			else
				var waveString = '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' + 'Waves: ';


			if(minHeight != maxHeight)
				var swellString = minHeight + '-' + maxHeight + ' ft ' + ' &nbsp;@ &nbsp;' + period + ' sec &nbsp; &nbsp; &nbsp;'
				+ temp + "<span>" + rating.join(' ') + "</span>" + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;';
			else
				var swellString = minHeight + ' ft ' + ' &nbsp; &nbsp; @ &nbsp;' + period + ' sec &nbsp; &nbsp; &nbsp;'
			 	+ temp + "<span>" + rating.join(' ') + "</span>" + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;';



			if(windSpeed < 10)
				var windString =  'Wind: ' + windSpeed + ' mph' + '&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;' + temp2 + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@ &nbsp;&nbsp;' + temperature + '&#8457';
			else
				var windString =  'Wind: ' + windSpeed + ' mph' + '&nbsp; &nbsp; &nbsp; &nbsp;' + temp2 + ' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;@ &nbsp;&nbsp;' + temperature + '&#8457';

			
			swellInfo.innerHTML = waveString + swellString + windString;



			$(swell).append(swellInfo);
			$(time).append(swell);
			$('.spot' + j).append(time);

		}
	}





}, 700);
