import { AttributionControl, GeolocateControl, Map, NavigationControl } from './ui/map/maplibre';
import { uuidv4 } from './util';

class WalkMap {
    constructor(container, host) {
        this._loaded = false;
        this._map = new Map({
            container: container,
            // style: 'https://api.maptiler.com/maps/858d29b2-add6-4b67-a123-602bb3fabf4d/style.json?key=Ufz2DspPpwHKhct0Kj6J',
            // style: 'https://api.maptiler.com/maps/pastel/style.json?key=Ufz2DspPpwHKhct0Kj6J',
            style: 'https://api.maptiler.com/maps/bright/style.json?key=Ufz2DspPpwHKhct0Kj6J',
            center: [-2.017322, 50.774277],
            zoom: 12,
            minZoom: 12,
            maxZoom: 19,
            pitch: 0,
            hash: true,
            attributionControl: false
        });

        this._map.addControl(new GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true,
        }));
        this._map.addControl(
            new NavigationControl(),
            'top-right',
        );
        this._map.addControl(
            new AttributionControl({}),
            'bottom-left',
        );

        this._map.on('load', () => {
            this._loaded = true;
        });
    }

    get map() {
        return this._map;
    }

    addTrail(trailSource) {
        const fn = () => {
            this._map.addSource(trailSource.id, trailSource.source);
            this._map.addLayer(trailSource.layer);
            this._map.addLayer(trailSource.symbols);
        };
        if (this._loaded) {
            fn.call();
        } else {
            this._map.on('load', fn);
        }
    }

    toggleTrail(layer, enabled) {
        this._map.setLayoutProperty(
            layer, 'visibility', enabled ? 'visible' : 'none'
        );
        this._map.setLayoutProperty(
            layer + "-symbols", 'visibility', enabled ? 'visible' : 'none'
        );
    }
}

class TrailSource {
    constructor(url, colour, name) {
        this._id = uuidv4();
        this._name = name;
        this._colour = colour;
        this._source = {
            type: 'geojson',
            data: url,
        };
        this._layer = {
            'id': this._id,
            'type': 'line',
            'source': this._id,
            'layout': {
                'line-join': 'round',
                'line-cap': 'round',
                'visibility': 'none',
            },
            'paint': {
                'line-color': colour,
                'line-width': 2.5,
                'line-dasharray': [
                    3,
                    3,
                ],
                'line-opacity': 1,
            },
        };
        this._symbols = {
            'id': this._id + "-symbols",
            'source': this._id,
            "type": "symbol",
            "layout": {
                "text-font": ["Noto Sans Regular"],
                "text-size": 14,
                "symbol-placement": "line",
                "text-field": '{name}',
                'visibility': 'none',
            },
            "paint": {
                "text-color": "white",
                "text-halo-blur": 1,
                "text-halo-color": colour,
                "text-halo-width": 2
            },
        };
    }

    get id() {
        return this._id;
    }

    get layer() {
        return this._layer;
    }

    get symbols() {
        return this._symbols;
    }

    get source() {
        return this._source;
    }

    get colour() {
        return this._colour;
    }

}


export { WalkMap, TrailSource};
