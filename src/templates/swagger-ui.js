import 'swagger-ui/dist/swagger-ui.css';

class SwaggerUI extends HTMLElement {
  async connectedCallback() {
    const url = (window.location.origin || '') + this.textContent.trim();
    this.innerHTML = '';

    // swagger-ui doesn't work in SSR. In fact if you even
    // import it server-side it throws errors.
    const { default: swaggerUI } = await import('swagger-ui');

    swaggerUI({
      domNode: this,
      deepLinking: true,
      url
    });
  }
}

customElements.define('swagger-ui', SwaggerUI);
