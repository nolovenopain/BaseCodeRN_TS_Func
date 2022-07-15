import vi  from './vi-VN'
import en  from './en-US'
import I18n from 'react-native-i18n';

I18n.translations = {
    vi,
    en
};

export default I18n;

export const translate = (str: string, language: string) => {
    I18n.locale = language
    return I18n.t(str)
}