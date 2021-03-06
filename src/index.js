import { TrailSource, WalkMap } from './map';
import { ActionButton, TrailToggleButton } from './ui/controls';

class Application {
    constructor() {
        this._walkMap = new WalkMap('map');

        this._walks = [
            new TrailSource('./data/geojson/parish.walk.1.geojson', '#1985ff', 'Parish Walk'),
            new TrailSource('./data/geojson/eastend.walk.2.geojson', '#0d9600', 'East End Walk'),
            new TrailSource('./data/geojson/heritage.walk.3.geojson', '#9300c4', 'Heritage Walk'),
            new TrailSource('./data/geojson/heath.walk.4.geojson', '#dc0608', 'Heath Walk'),
        ];
        this._mobileControls = document.getElementById('mobile-controls');

        this._buttons = [
            new TrailToggleButton('Parish Walk', this._mobileControls, this._walks[0].id, this._walks[0].colour),
            new TrailToggleButton('East End Walk', this._mobileControls, this._walks[1].id, this._walks[1].colour),
            new TrailToggleButton('Heritage Walk', this._mobileControls, this._walks[2].id, this._walks[2].colour),
            new TrailToggleButton('Heath Walk', this._mobileControls, this._walks[3].id, this._walks[3].colour),
        ];

        this._walks.forEach(walk => {
            this._walkMap.addTrail(walk);
        })

        this._actionButton = new ActionButton(this._mobileControls);

        this._mobileControls.addEventListener('layer-toggle', (evt) => {
            this._walkMap.toggleTrail(evt.detail.layer, evt.detail.enabled);
        });

        this._mobileControls.addEventListener('action-toggle', (evt) => {
            this._buttons.forEach(button => button.toggle(evt.detail.enabled));
        })

    }
}

const app = new Application();
