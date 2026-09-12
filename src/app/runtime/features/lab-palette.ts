import type { RuntimeContext } from '../types';

type Palette = 'studio' | 'night' | 'moss';
const palettes: Palette[] = ['studio', 'night', 'moss'];

export const mountLabPalette = ({ appearance }: RuntimeContext): void => {
  const labRandom = document.querySelector<HTMLButtonElement>('#lab-random');
  const labPaletteChoices = document.querySelectorAll<HTMLButtonElement>('[data-lab-palette]');
  const labPageArt = document.querySelector<HTMLElement>('.lab-art');
  if (!labPageArt || !labRandom) return;

  const applyLabPalette = (value: string | null | undefined): void => {
    const palette: Palette = palettes.includes(value as Palette) ? value as Palette : 'studio';
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
  document.querySelector<HTMLButtonElement>('#lab-reset')?.addEventListener('click', () => applyLabPalette('studio'));
  applyLabPalette(new URLSearchParams(location.search).get('palette'));
  labRandom.addEventListener('click', () => {
    document.querySelectorAll<HTMLElement>('.lab-preset-set').forEach((set) => {
      const choices = Array.from(set.querySelectorAll<HTMLButtonElement>('.lab-preset'));
      choices[Math.floor(Math.random() * choices.length)]?.click();
    });
    const rotationInput = document.querySelector<HTMLInputElement>('#lab-rotation');
    const scaleInput = document.querySelector<HTMLInputElement>('#lab-scale');
    if (rotationInput) rotationInput.value = String(Math.round(Math.random() * 50 - 25));
    if (scaleInput) scaleInput.value = String(Math.round(Math.random() * 45 + 70));
    rotationInput?.dispatchEvent(new Event('input', { bubbles: true }));
    scaleInput?.dispatchEvent(new Event('input', { bubbles: true }));
    applyLabPalette(palettes[Math.floor(Math.random() * palettes.length)]);
    if (!appearance.isMotionDisabled()) labPageArt.animate([{ transform: 'scale(.97)' }, { transform: 'scale(1)' }], { duration: 420, easing: 'ease-out' });
  });
};
