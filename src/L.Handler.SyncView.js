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

L.Handler.SyncView = L.Handler.extend({
    options: {
        latitude: null,
        longitude: null,
        zoom: null,
    },

    addHooks: function() {
        L.DomEvent.on(this._map, "moveend", this._pullView, this);
        L.DomEvent.on(this._map, "zoomend", this._pullView, this);

        $(this.options.latitude).on("change", this, this._pushView);
        $(this.options.longitude).on("change", this, this._pushView);
        $(this.options.zoom).on("change", this, this._pushView);
    },

    removeHooks: function() {
        L.DomEvent.off(this._map, "moveend", this._pullView, this);
        L.DomEvent.off(this._map, "zoomend", this._pullView, this);
        
        $(this.options.latitude).off("change", this, this._pushView);
        $(this.options.longitude).off("change", this, this._pushView);
        $(this.options.zoom).off("change", this, this._pushView);
    },

    _pullView: function(e) {
        $(this.options.latitude).val(this._map.getCenter().lat);
        $(this.options.longitude).val(this._map.getCenter().lng);
        $(this.options.zoom).val(this._map.getZoom());
    },
    
    _pushView: function(e) {
        var latitude = $(e.data.options.latitude).val() ? $(e.data.options.latitude).val() : e.data._map.getCenter().lat;
        var longitude = $(e.data.options.longitude).val() ? $(e.data.options.longitude).val() : e.data._map.getCenter().lng;
        var zoom = $(e.data.options.zoom).val() ? $(e.data.options.zoom).val() : e.data._map.getZoom();
        e.data._map.setView([latitude, longitude], zoom);
    },
});

L.Map.addInitHook("addHandler", "syncView", L.Handler.SyncView);
