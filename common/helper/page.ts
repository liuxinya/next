import {LOGIN_URL, REGISTER_URL, LOGOUT_URL} from './../constant/variableConst';
import {isProdOnline} from './env';

/**
 * @file 页面公用方法
 */

export function getElementLeft(element: HTMLElement) {
    let actualLeft = element.offsetLeft;
    let current = element.offsetParent as HTMLElement;
    while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent as HTMLElement;
    }
    return actualLeft;
}

export function getElementTop(element: HTMLElement) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent as HTMLElement;
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent as HTMLElement;
    }
    return actualTop;
}


export function getLoginUrl() {
    const url = isProdOnline() ? LOGIN_URL.online : LOGIN_URL.sandbox;
    return `${url}?&redirect=${encodeURIComponent(location.href.replace(location.hash, '')) + location.hash}`;
}

export function getLogoutUrl() {
    const url = isProdOnline() ? LOGOUT_URL.online : LOGOUT_URL.sandbox;
    return `${url}?redirect=${encodeURIComponent(location.href.replace(location.hash, '')) + location.hash}`;
}

export function getRegisterUrl() {
    return `${REGISTER_URL}?reg&u=${encodeURIComponent(location.href)}`;
}
