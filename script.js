const apiKey = 'xJydxTVycGVGnsyUuUPOMg==O60Nf0XDngpUDeXf'; // Use your actual API key

// Initialize the map and set default view to Egypt
const map = L.map('map').setView([26.8206, 30.8025], 5); // Default to Egypt

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to handle map click events
map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    
    // Show the selected location
    $('#location-info').html(`<p>Selected Location: Latitude ${lat}, Longitude ${lon}</p>`);
    
    // Fetch weather data for the selected location
    fetchWeather(lat, lon);
});

// Function to fetch weather data using latitude and longitude
function fetchWeather(lat, lon) {
    $.ajax({
        method: 'GET',
        url: `https://api.api-ninjas.com/v1/weather?lat=${lat}&lon=${lon}`,
        headers: { 'X-Api-Key': apiKey },
        contentType: 'application/json',
        success: function(result) {
            console.log(result); // Log the response to inspect its structure
            
            if (result) {
                const temperature = result.temp;
                const feelsLike = result.feels_like;
                const humidity = result.humidity;
                const cloudPct = result.cloud_pct;
                
                $('#weather').html(`
                    <p>Temperature: ${temperature}°C</p>
                    <p>Feels Like: ${feelsLike}°C</p>
                    <p>Humidity: ${humidity}%</p>
                    <p>Cloud Percentage: ${cloudPct}%</p>
                `);
            } else {
                $('#weather').html('<p>No weather information available for the selected location.</p>');
            }
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
            $('#weather').html('<p>Error fetching weather data.</p>');
        }
    });
}

// Function to handle user's current location
function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Center the map on the user's location
            map.setView([lat, lon], 13);
            
            // Display the user's location
            $('#location-info').html(`<p>Current Location: Latitude ${lat}, Longitude ${lon}</p>`);
            
            // Fetch weather data for the user's location
            fetchWeather(lat, lon);
        }, function(error) {
            console.error('Error getting location: ', error);
            $('#location-info').html('<p>Unable to retrieve your location.</p>');
        });
    } else {
        $('#location-info').html('<p>Geolocation is not supported by this browser.</p>');
    }
}

// Get and display user's location on page load
getUserLocation();
