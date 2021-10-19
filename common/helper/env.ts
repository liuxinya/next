import {getAllParamsFromUrl} from '@baidu/bce-helper';

export function isProd(): boolean {
    return process.env.NODE_ENV === 'production';
}

// 正式线上环境
export function isProdOnline(): boolean {
    // todo
    return false;
}

// 沙盒环境 + cms沙盒环境数据
export function isSandBoxOnlineAndGetSourceFromCmsSandbox(): boolean {
    // @ts-ignore
    return false;
}

/* eslint-disable max-len */
export function isMobile() {
    return Boolean(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i));
}
