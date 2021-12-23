# Leaflet.SyncView

[![GitHub tag (latest SemVer)](https://img.shields.io/github/v/tag/drustack/Leaflet.SyncView)](https://github.com/drustack/Leaflet.SyncView/tags)
[![GitHub license](https://img.shields.io/github/license/drustack/Leaflet.SyncView)](https://github.com/drustack/Leaflet.SyncView/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/@drustack/leaflet.syncview)](https://www.npmjs.com/package/@drustack/leaflet.syncview)
[![jsDelivr hits (GitHub)](https://img.shields.io/jsdelivr/gh/hm/drustack/Leaflet.SyncView)](https://www.jsdelivr.com/package/npm/@drustack/leaflet.syncview)

A sync view control for Leaflet.

Design for [Drupal Leaflet Module](https://www.drupal.org/project/leaflet) integration.

## Requirement

  - [Leaflet](https://github.com/Leaflet/Leaflet) 1.7.1+
  - [jQuery](https://github.com/jquery/jquery) 3.6.0+

## Demo

  - <https://drustack.github.io/Leaflet.SyncView/>

## Usage

This Leaflet control don't provide any visual element, but using jQuery for bidirectional sync form input (e.g. for latitude, longitude and zoom) with current Leaflet view:

    <form>
        <input type="text" class="latitude">
        <input type="text" class="longitude">
        <input type="text" class="zoom">
    </form>
    
    <div id="map"></div>
    
    <script>
        var map = L.map("map").setView([51.505, -0.09], 13);
        
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 19,
            attribution: "&copy; <a href='https://openstreetmap.org/copyright'>OpenStreetMap contributors</a>"
        }).addTo(map);
        
        L.control.syncView({
            latitudeSelector: ".latitude",
            longitudeSelector: ".longitude",
            zoomSelector: ".zoom",
        }).addTo(map);
    </script>

## Include via CDN

Leaflet.SyncView is available through [jsDelivr](https://www.jsdelivr.com/):

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@drustack/leaflet.syncview/dist/L.Control.SyncView.min.css">
    <script src="https://cdn.jsdelivr.net/npm/@drustack/leaflet.syncview/dist/L.Control.SyncView.min.js"></script>

## Development

Install NPM depedencies:

    npm install

Build CSS and JS individually:

    npm run eslint
    npm run uglifyjs
    npm run sass

Or simply build everything once together:

    npm run build

## License

  - Code released under [Apache License 2.0](LICENSE)
  - Docs released under [CC BY 4.0](http://creativecommons.org/licenses/by/4.0/)
  - SVG released under [CC BY 4.0](https://fontawesome.com/license/free)

## Author Information

  - Wong Hoi Sing Edison
      - <https://twitter.com/hswong3i>
      - <https://github.com/hswong3i>
