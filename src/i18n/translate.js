import i18n from './i18n';

export const translate = (key, options) => {
  return key ? i18n.t(key, options) : null;
};
