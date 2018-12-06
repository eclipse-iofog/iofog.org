import 'swagger-ui/dist/swagger-ui.css';

class SwaggerUI extends HTMLElement {
  async connectedCallback() {
    this.style.whiteSpace = 'pre';
    const swaggerSpec = this.textContent;
    this.innerHTML = '';

    const blob = new Blob([swaggerSpec], { type: 'text/yaml; charset=UTF-8' });
    const url = URL.createObjectURL(blob);

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
