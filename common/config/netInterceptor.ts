import {AxiosResponse, AxiosRequestConfig} from 'axios';
import {Injectable} from '@baidu/ioc';
import {message} from 'antd';
import {isNill, isObject} from '@baidu/bce-helper';
import {ResponseObj} from '@baidu/bce-services';
import {getLoginUrl} from '../helper/page';
@Injectable()
export class UNetInterceptor implements UInterceptor {
    async response(config: AxiosResponse<ResponseObj<never>>) {
        if (
            (config.data.status === 302 && config.data.message && config.data.message.redirect)
            || config.status === 302
        ) {
            message.warning('您需要登录，即将跳转到登录页');
            setTimeout(() => {
                try {
                    window.location.href = `${config.data.message.redirect}${encodeURIComponent(location.href)}`;
                } catch {
                    window.location.href = getLoginUrl();
                }
            }, 800);
        }
        // gobal报错
        if (!config.data.success && config.data.message && config.data.message.global) {
            message.error(config.data.message.global || '网络出错了');
        }
        return config;
    }
    async request(config: AxiosRequestConfig) {
        const params = config.data || config.params;
        if (isObject(params)) {
            Object.keys(params).forEach(item => {
                if (isNill(params[item])) {
                    delete params[item];
                }
            });
        }
        return config;
    }
}
export interface UInterceptor {
    response: (response: AxiosResponse) => Promise<AxiosResponse>;
    request: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig>;
}
