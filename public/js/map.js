mapboxgl.accessToken = mapToken;

const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: coordinates,   // 🔥 dynamic from EJS
  zoom: 9
});

new mapboxgl.Marker({ color: "black" })
  .setLngLat(coordinates)
  .addTo(map);
