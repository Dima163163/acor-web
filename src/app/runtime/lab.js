export const mountLab = (t) => {
const rotation = document.querySelector('#lab-rotation');
const scale = document.querySelector('#lab-scale');
const labObject = document.querySelector('#lab-object');
const updateLab = () => {
  if (!rotation || !scale || !labObject) return;
  labObject.style.setProperty('--angle', `${rotation.value}deg`);
  labObject.style.setProperty('--scale', String(Number(scale.value) / 100));
  document.querySelector('#lab-angle').value = `${rotation.value}°`;
  document.querySelector('#lab-size').value = `${scale.value}%`;
};
rotation?.addEventListener('input', updateLab);
scale?.addEventListener('input', updateLab);
document.querySelector('#lab-reset')?.addEventListener('click', () => {
  rotation.value = '0'; scale.value = '90'; updateLab();
});
const labArt = document.querySelector('.lab-art');
const labControls = document.querySelector('.lab-controls');
if (labArt && labControls && rotation && scale) {
  const createLabSet = (label, name, options) => {
    const set = document.createElement('div');
    set.className = 'lab-preset-set';
    set.setAttribute('role', 'group');
    set.setAttribute('aria-label', label);
    const caption = document.createElement('span');
    caption.className = 'lab-preset-label';
    caption.textContent = label;
    set.append(caption);
    options.forEach(([value, text]) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'lab-preset';
      button.dataset.labChoice = value;
      button.textContent = text;
      button.setAttribute('aria-pressed', String(value === options[0][0]));
      button.addEventListener('click', () => {
        set.querySelectorAll('.lab-preset').forEach((option) => option.setAttribute('aria-pressed', String(option === button)));
        labArt.dataset[name] = value;
      });
      set.append(button);
    });
    return set;
  };
  labArt.dataset.material = 'chrome';
  labArt.dataset.shape = 'ribbon';
  labArt.dataset.palette = 'studio';
  labControls.append(createLabSet('Материал', 'material', [['chrome', 'Chrome'], ['cobalt', 'Cobalt'], ['paper', 'Paper']]));
  labControls.append(createLabSet('Форма', 'shape', [['ribbon', 'Ribbon'], ['orb', 'Orb'], ['letter', 'Letter']]));
  const copyButton = document.createElement('button');
  copyButton.type = 'button';
  copyButton.className = 'pill-button lab-copy';
  copyButton.textContent = 'Скопировать параметры';
  const copyStatus = document.createElement('span');
  copyStatus.className = 'lab-copy-status';
  copyStatus.setAttribute('role', 'status');
  const copyParams = async () => {
    const value = `Acor Lab — ${labArt.dataset.material}, ${labArt.dataset.shape}, ${labArt.dataset.palette || 'studio'}, поворот ${rotation.value}°, масштаб ${scale.value}%`;
    try {
      await navigator.clipboard.writeText(value);
      copyStatus.textContent = t('Параметры скопированы.');
    } catch {
      copyStatus.textContent = t('Выделите и скопируйте параметры вручную.');
      copyStatus.dataset.value = value;
    }
  };
  copyButton.addEventListener('click', copyParams);
  labControls.append(copyButton, copyStatus);
  document.querySelector('#lab-reset')?.addEventListener('click', () => {
    labArt.dataset.material = 'chrome';
    labArt.dataset.shape = 'ribbon';
    labControls.querySelectorAll('.lab-preset-set').forEach((set) => set.querySelector('.lab-preset')?.click());
    copyStatus.textContent = '';
  });
}

// The Lab object can be shaped directly with a pointer or a finger. The
// range inputs remain the source of truth, so keyboard users get the same
// result and the gesture never changes the page scroll position.
if (labArt && labObject && rotation && scale) {
  let dragState = null;
  labObject.setAttribute('draggable', 'false');
  labObject.style.touchAction = 'none';
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
  const stopLabDrag = (event) => {
    if (!dragState) return;
    if (event?.pointerId !== undefined && labObject.hasPointerCapture?.(event.pointerId)) labObject.releasePointerCapture(event.pointerId);
    dragState = null;
    labArt.classList.remove('is-dragging');
  };
  labObject.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    event.preventDefault();
    labObject.setPointerCapture?.(event.pointerId);
    dragState = { x: event.clientX, y: event.clientY, angle: Number(rotation.value), size: Number(scale.value) };
    labArt.classList.add('is-dragging');
  });
  labObject.addEventListener('pointermove', (event) => {
    if (!dragState) return;
    event.preventDefault();
    rotation.value = String(Math.round(clamp(dragState.angle + (event.clientX - dragState.x) * .16, Number(rotation.min), Number(rotation.max))));
    scale.value = String(Math.round(clamp(dragState.size - (event.clientY - dragState.y) * .12, Number(scale.min), Number(scale.max))));
    updateLab();
  });
  labObject.addEventListener('pointerup', stopLabDrag);
  labObject.addEventListener('pointercancel', stopLabDrag);
  labObject.addEventListener('lostpointercapture', () => stopLabDrag());
}
};
