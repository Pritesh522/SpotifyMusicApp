$(document).ready(function () {


	//Auto Scroll Up button

	var offset = 50;

	var duration = 300;

	$(window).scroll(function () {

		if (jQuery(this).scrollTop() > offset) {

			$('.back-to-top').fadeIn(duration);

		} else {

			$('.back-to-top').fadeOut(duration);

		}

	});



	$('.back-to-top').click(function (event) {

		event.preventDefault();

		$('html, body').animate({
			scrollTop: 0
		}, duration);

		return false;

	})
	//Auto Scroll Button Finish

	//Ajax call start................
	var ofset = 0;
	var limit = 5;
	var track = "";
	var year ="";
	var selGenre="";

	// Api Call Method

	function apiCall(track, selGenre,year, ofset, limit) {


		return $.ajax({

			async: true,
			crossDomain: true,
			url: (selGenre != "" && year !="") ? "https://api.spotify.com/v1/search?q=" + track +"%20year:" + year +"%20genre:"+ selGenre+ "&type=track&offset=" + ofset + "&limit=" + limit :  "https://api.spotify.com/v1/search?q=" + track +"&type=track&offset=" + ofset + "&limit=" + limit,
			method: "GET",
			headers: {

				Authorization: "Bearer BQBnaLmtGTwnWauME91PShVqGvK4t7M5w2LPC2RQ7vbL0WCVGuE8cgT6A1YvgIbcfblxCUjGoI2zjjKPkgiMSoScgG7jGvZCKJ_fSPW45T8J_49QBzt5-XdZBbFlpWFvjqE23hmnDXnuOBCN-5PtP2Y_237B0GX6K7y6",

			},
			dataType: "json",

			success: function (data) {
				var widget = show(data);
				$('#table').html(widget);
				$('#srch-track').val('');
				console.log(data);
				$('#no-search').hide();
				$('#selectYear').val('');
				$('#selectGenre').text('');
				year="";
				selGenre="";

				
				
			}

		});

	
	}

	// Search Button Method

	$('#search').click(function () {
				
			

		track = $('#srch-track').val();
		

			
		if (track != '') {
			$('html, body').animate({
    			scrollTop: $('#tablePosition').offset().top
				 }, 1000);
			console.log(selGenre,year);
			apiCall(track, selGenre,year,ofset, limit);
			$('#error').hide();
			year="";
				selGenre="";

			
		
			

		} else {
			$('#error').show();
			$('#error').html("<div class='alert alert-danger text-center'><a href = '#'class = 'close'data - dismiss = 'alert'aria - label = 'close'></a> Field Cannot be Empty</div > ");

		}
		
	

	});
	


	$('#prev').click(function (event) {
event.preventDefault();

		if (ofset >= 5) {
			ofset = ofset - 5;
			apiCall(track, selGenre,year, ofset, limit);
		} else {
			return false;
		}

	});

	// Next Button Method

	$('#nxt').click(function (event) {
event.preventDefault();


		ofset = ofset + 5;
		apiCall(track, selGenre,year, ofset, limit);

	});

	// Calculat Miliseconds to Minute and Seconds

	function millisToMinutesAndSeconds(millis) {
		var minutes = Math.floor(millis / 60000);
		var seconds = ((millis % 60000) / 1000).toFixed(0);
		return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}

	// Api call data shows in table

	function show(data) {
		$('#table').empty();

		for (var i = 0; i < data.tracks.items.length; i++) {
			

			$("tbody").append("<tr><td> <image src=" + (data.tracks.items[i].album.images[2].url) + "/>  </td><td>" + (data.tracks.items[i].album.artists[0].name) + "</td><td>" + (data.tracks.items[i].name) + "</td><td>" + (data.tracks.items[i].album.name) + "</td> <td > " + millisToMinutesAndSeconds(data.tracks.items[i].duration_ms) + "</td><td > " + (data.tracks.items[i].popularity) + "</td><td >  <a href=" + (data.tracks.items[i].preview_url) + " target='_blank'><i class='fas fa-link'></i></a></td></tr>");
		}
	}
	
//	select genre api call
	
	function selectGenre() {


		return $.ajax({

			async: true,
			crossDomain: true,
			url: 	"https://api.spotify.com/v1/recommendations/available-genre-seeds",
			method: "GET",

			headers: {

				Authorization: "Bearer BQBnaLmtGTwnWauME91PShVqGvK4t7M5w2LPC2RQ7vbL0WCVGuE8cgT6A1YvgIbcfblxCUjGoI2zjjKPkgiMSoScgG7jGvZCKJ_fSPW45T8J_49QBzt5-XdZBbFlpWFvjqE23hmnDXnuOBCN-5PtP2Y_237B0GX6K7y6",

			},
			dataType: "json",

			success: function (gen) {
				var genre = genreShow(gen);
				$('#selectGenre').html(genre);

			
				
			}

		});

	
	}
	
	$('#filter').click(function () {

		selectGenre();

		

	});
	function genreShow(gen) {
		$('#selectGenre').empty();
		$('#selectGenre').append('<option></option>');

		for (var i = 0; i < gen.genres.length; i++) {
		

			$('#selectGenre').append('<option>'+(gen.genres[i])+'</option>');
		}
	}
	
	$('#saveChange').click(function(){
		selGenre = $('#selectGenre option:selected').text(); 
		year = $('#selectYear').val();
	
	});
});
