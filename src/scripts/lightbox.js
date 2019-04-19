const Lightbox = (function Lightbox() {
  const render = path => `
    <img src="/images/x.svg" class="lightbox__x" alt="close" />
    <img src="${path}" class="lightbox__image" role="presentation" />
  `;

  return {
    init() {
      Array.from(document.querySelectorAll('.thumb__link')).forEach(thumb => {
        thumb.addEventListener('click', event => {
          event.preventDefault();
          const path = event.target.getAttribute('href');
          const lightbox = document.createElement('div');
          lightbox.className = 'lightbox';
          lightbox.innerHTML = render(path);
          lightbox
            .querySelector('.lightbox__x')
            .addEventListener('click', () => {
              lightbox.remove();
            });
          document.body.appendChild(lightbox);
        });
      });
    },
  };
})();

window.addEventListener('DOMContentLoaded', () => {
  Lightbox.init();
});
