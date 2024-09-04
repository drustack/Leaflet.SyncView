/**
 * (c) Wong Hoi Sing Edison <hswong3i@pantarei-design.com>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (factory, window) {
    if (typeof define === "function" && define.amd) {
        define(["leaflet"], factory);
    } else if (typeof exports === "object") {
        module.exports = factory(require("leaflet"));
    }

    if (typeof window !== "undefined" && window.jQuery && window.L) {
        window.L.Control.SyncView = factory(jQuery, L);
    }
}(function ($, L) {
    SyncView = L.Control.extend({
        options: {
            latitudeSelector: null,
            longitudeSelector: null,
            zoomSelector: null,
        },

        onAdd: function(map) {
            this._map = map;
            
            this._container = L.DomUtil.create("div", "leaflet-control-syncview");

            L.DomEvent.on(this._map, "moveend", this._pullView, this);
            L.DomEvent.on(this._map, "zoomend", this._pullView, this);

            $(this.options.latitudeSelector).on("change", this, this._pushView);
            $(this.options.longitudeSelector).on("change", this, this._pushView);
            $(this.options.zoomSelector).on("change", this, this._pushView);

            return this._container;
        },

        onRemove: function(map) {
            L.DomEvent.off(this._map, "moveend", this._pullView, this);
            L.DomEvent.off(this._map, "zoomend", this._pullView, this);
            
            $(this.options.latitudeSelector).off("change", this, this._pushView);
            $(this.options.longitudeSelector).off("change", this, this._pushView);
            $(this.options.zoomSelector).off("change", this, this._pushView);
        },

        _pullView: function(e) {
            const _latlng = this._map.getCenter();
            const _zoom = this._map.getZoom();

            const lat = parseFloat(_latlng.lat).toFixed(6);
            const lng = parseFloat(_latlng.lng).toFixed(6);

            $(this.options.latitudeSelector).val(lat);
            $(this.options.longitudeSelector).val(lng);
            $(this.options.zoomSelector).val(_zoom);

            // Also update the proximity-origin-summary Lat and Lon elements.
            $('.geofield-lat-summary').text(lat);
            $('.geofield-lon-summary').text(lng);

        },
        
        _pushView: function(e) {
            var _lat = $(e.data.options.latitudeSelector).val();
            _lat = _lat ? _lat : e.data._map.getCenter().lat;

            var _lng = $(e.data.options.longitudeSelector).val();
            _lng = _lng ? _lng : e.data._map.getCenter().lng;

            var _zoom = $(e.data.options.zoomSelector).val();
            _zoom = _zoom ? _zoom : e.data._map.getZoom();

            e.data._map.setView([_lat, _lng], _zoom);
        },
    });

    L.control.syncView = function(options) {
        return new SyncView(options);
    };

    return SyncView;
}, window));
