import i18n from './i18n';

export const translate = (key: i18n.Scope, options?: i18n.TranslateOptions) => {
  return key ? i18n.t(key, options) : null;
};
