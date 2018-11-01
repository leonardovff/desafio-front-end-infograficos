// Initialize and add the map
function initMap() {
  // The location of Minuto
  const pin = {lat: 51.5213358, lng: -0.157326};
  
  // The map, centered at 
  let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16.5, 
      disableDefaultUI: true,
      center: {lat: pin.lat, lng: pin.lng + 0.004}
  });
  // The marker, positioned at Minuto
  let marker = new google.maps.Marker({
    position: pin,                                   
    map: map, 
    icon: 'assets/img/pin.png'
  });
}
var app = {
    let: 
}