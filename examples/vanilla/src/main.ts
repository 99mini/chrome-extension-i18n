import i18n from '@99mini/i18n-vanilla';

console.log('main ts');

/**
 * use `t()`
 */
const helloEl = document.querySelector('p[data-i18n="hello"]');

if (helloEl) {
  helloEl.textContent = i18n.t('hello');
}

/**
 * use `updateElements`
 */
i18n.i18n.updateElements();
