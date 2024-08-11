const apiKey = 'xJydxTVycGVGnsyUuUPOMg==O60Nf0XDngpUDeXf'; // Use your actual API key

// Initialize the map and set default view
const map = L.map('map').setView([51.505, -0.09], 13); // Default location (London)

// Add a tile layer to the map (you can use other tile providers if needed)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to handle map click events
map.on('click', function(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;
    
    // Show the selected location
    $('#weather').html(`<p>Selected Location: Latitude ${lat}, Longitude ${lon}</p>`);
    
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
            const weatherDescription = result.weather.description;
            const temperature = result.temp;
            
            $('#weather').append(`
                <p>Weather: ${weatherDescription}</p>
                <p>Temperature: ${temperature}°C</p>
            `);
        },
        error: function ajaxError(jqXHR) {
            console.error('Error: ', jqXHR.responseText);
            $('#weather').append('<p>Error fetching weather data.</p>');
        }
    });
}

// Fetch weather data for a default location on page load (optional)
fetchWeather(51.505, -0.09); // Default location (London)
