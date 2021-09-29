import { LitElement, html, css } from "lit";

class Component extends LitElement {
    constructor() {
        super();
    }

    static get styles() {
        return (css`
            h1 { color: red; }
        `);
    }

    render() {
        return (html`
            <h1>Hello world component!</h1>
        `);
    }
}
customElements.define('my-component', Component);