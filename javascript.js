// pull from different file
const secret_api ='at_UyPMqO9c9yfhMhSd3rxAH3ImpYxsf'
const bypass_cors_url = 'https://cors-anywhere.herokuapp.com/'
const api_uri = 'https://geo.ipify.org/api/'
let current_verion = 'v1'

// elements to update 
let current_ip = document.querySelector('.ip')
let current_town = document.querySelector('.place')
let current_zone = document.querySelector('.zone')
let current_isp = document.querySelector('.isp')

// form elements 
const entered_ip = document.querySelector('.inputSearch') 
const search_btn = document.querySelector('.button')

const headers_option = {
    headers: {
        'Access-Control-Allow-Origin': '*',
    }
}

const map = L.map('mapid', {
    'center': [0,0],
    'zoom': 0,
    'layers': [
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          })
    ]
})
var marker = L.marker([17.25349204320319, 78.89830030703999]).addTo(map);

 function updateMarker (update_marker) {
    entered_ip.value="";
    marker.setLatLng(update_marker);
    map.setView(update_marker, 13);
}

getIPDetails = (default_ip) => {
    if(default_ip == undefined){
        var ip_url = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${secret_api}`
    }
    else {
        var ip_url = `${bypass_cors_url}${api_uri}${current_verion}?apiKey=${secret_api}&ipAddress=${default_ip}`
    }
    fetch(ip_url, headers_option)
    .then( results => results.json())
    .then( data => {
        current_ip.innerHTML = data.ip
        current_town.innerHTML = `${data.location.city} ${data.location.country} ${data.location.postalCode}`
        current_zone.innerHTML = data.location.timezone
        current_isp.innerHTML = data.isp

        // update map marker 
        updateMarker([data.location.lat, data.location.lng])
    })
    .catch(error => {
        alert("Unable to get IP details")
        console.log(error)
    })
}

//document.addEventListener('load', updateMarker())

search_btn.addEventListener('click', e => {
    e.preventDefault()
    if (entered_ip.value != '' && entered_ip.value != null) {
        getIPDetails(entered_ip.value)
        return
    }
    alert("Please enter a valid IP address");
})

