import type { RuntimeContext } from '../types';

export const mountLabExport = ({ t, appearance }: RuntimeContext): void => {
  const button = document.querySelector<HTMLButtonElement>('#lab-export');
  const image = document.querySelector<HTMLImageElement>('#lab-object');
  const art = document.querySelector<HTMLElement>('.lab-art');
  const status = document.querySelector<HTMLElement>('#lab-export-status');
  const rotation = document.querySelector<HTMLInputElement>('#lab-rotation');
  const scale = document.querySelector<HTMLInputElement>('#lab-scale');
  if (!button || !image || !art || !rotation || !scale) return;

  button.addEventListener('click', () => {
    if (!image.complete || !image.naturalWidth) {
      status && (status.textContent = t('Изображение ещё загружается.'));
      return;
    }
    const canvas = document.createElement('canvas');
    const width = 1200;
    const height = Math.round(width * (image.naturalHeight / image.naturalWidth));
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext('2d');
    if (!context) return;
    context.fillStyle = getComputedStyle(art).backgroundColor || '#f0f1ed';
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(Number(rotation.value) * Math.PI / 180);
    const scaleValue = Number(scale.value) / 100;
    context.scale(scaleValue, scaleValue);
    context.drawImage(image, -width / 2, -height / 2, width, height);
    context.restore();
    canvas.toBlob((blob) => {
      if (!blob) return;
      const link = document.createElement('a');
      link.download = `acor-lab-${art.dataset.palette || 'studio'}.png`;
      link.href = URL.createObjectURL(blob);
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      if (status) status.textContent = t('PNG готов — файл скачан.');
      if (!appearance.isMotionDisabled()) button.animate([{ transform: 'scale(.96)' }, { transform: 'scale(1)' }], { duration: 260, easing: 'ease-out' });
    }, 'image/png');
  });
};
