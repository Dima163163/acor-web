export const mountLabPalette = ({ t, appearance }) => {
  const labRandom = document.querySelector('#lab-random');
  const labPaletteChoices = document.querySelectorAll('[data-lab-palette]');
  const labPageArt = document.querySelector('.lab-art');
  if (labPageArt && labRandom) {
    const palettes = ['studio', 'night', 'moss'];
    const applyLabPalette = (value) => {
      const palette = palettes.includes(value) ? value : 'studio';
      labPageArt.dataset.palette = palette;
      labPaletteChoices.forEach((button) => {
        const selected = button.dataset.labPalette === palette;
        button.classList.toggle('is-selected', selected);
        button.setAttribute('aria-pressed', String(selected));
      });
      const url = new URL(location.href);
      url.searchParams.set('palette', palette);
      history.replaceState(null, '', url);
    };
    labPaletteChoices.forEach((button) => button.addEventListener('click', () => applyLabPalette(button.dataset.labPalette)));
    document.querySelector('#lab-reset')?.addEventListener('click', () => applyLabPalette('studio'));
    const labParams = new URLSearchParams(location.search);
    applyLabPalette(labParams.get('palette') || 'studio');
    labRandom.addEventListener('click', () => {
      const sets = Array.from(document.querySelectorAll('.lab-preset-set'));
      sets.forEach((set) => {
        const choices = Array.from(set.querySelectorAll('.lab-preset'));
        choices[Math.floor(Math.random() * choices.length)]?.click();
      });
      const rotationInput = document.querySelector('#lab-rotation');
      const scaleInput = document.querySelector('#lab-scale');
      if (rotationInput) rotationInput.value = String(Math.round(Math.random() * 50 - 25));
      if (scaleInput) scaleInput.value = String(Math.round(Math.random() * 45 + 70));
      rotationInput?.dispatchEvent(new Event('input', { bubbles: true }));
      scaleInput?.dispatchEvent(new Event('input', { bubbles: true }));
      applyLabPalette(palettes[Math.floor(Math.random() * palettes.length)]);
      if (!appearance.isMotionDisabled()) labPageArt.animate([{ transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
    });
  }
};
