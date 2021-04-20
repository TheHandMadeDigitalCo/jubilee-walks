class ActionButton {
    constructor(container) {
        this._container = container;
        this._enabled = false;
        this._root = this._render();
        this._container.appendChild(this._root);

        this._root.addEventListener('click', (evt) => {

            this._enabled = !this._enabled;

            const event = new CustomEvent('action-toggle', {
                detail: {
                    enabled: this._enabled
                },
            });

            this._container.dispatchEvent(event);
        });
    }

    _render() {
        const root = document.createElement('div');
        root.classList.add('control');
        root.id = 'overlay-icon';
        root.innerHTML = `
            <img src='img/jubilee.svg'>
        `;
        return root;
    }
}

/**
 *
 */
class TrailToggleButton {

    constructor(label, container, layerId, colour) {
        this._label = label;
        this._container = container;
        this._layerId = layerId;
        this._enabled = false;
        this._colour = colour;
        this._root = this._render();
        this._container.appendChild(this._root);

        this._root.addEventListener('click', (evt) => {
            const icon = this._root.querySelector('.enabled');

            if (this._enabled) {
                icon.classList.add('hidden');
            } else {
                icon.classList.remove('hidden');
            }

            this._enabled = !this._enabled;

            const event = new CustomEvent('layer-toggle', {
                detail: {
                    enabled: this._enabled,
                    layer: this._layerId,
                },
            });

            this._container.dispatchEvent(event);
        });
    }

    _render() {
        const root = document.createElement('div');
        root.classList.add('layer', 'control', 'hide');
        root.style.backgroundColor = this._colour;
        root.innerHTML = `
            <div class='enabled hidden'>
                <img src='img/circle-check.svg'/>
            </div>
            <span>${this._label}</span>
        `;

        return root;
    }

    toggle(show) {
        if (show === true) {
            this._root.classList.remove("hide");
            this._root.classList.add("show");
        } else {
            this._root.classList.remove("show");
            this._root.classList.add("hide")
        }
    }


}

export { TrailToggleButton };
export { ActionButton };
