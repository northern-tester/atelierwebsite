script(src="https://maps.googleapis.com/maps/api/js?v=3.exp")
		script.
			var leeds = new google.maps.LatLng(53.7955277,-1.5400696);
			var map;
			function initialize() {
				var mapOptions = {
						zoom: 15,
						center: leeds
						};
				map = new google.maps.Map(document.getElementById('map-canvas'),
						mapOptions);
				}
			google.maps.event.addDomListener(window, 'load', initialize);