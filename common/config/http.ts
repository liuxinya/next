import {Injectable} from '@baidu/ioc';
import {isProd, isProdOnline, isSandBoxOnlineAndGetSourceFromCmsSandbox} from '../helper/env';

@Injectable()
export class UHttpConfig {
    private urlMap = {
        default: '/api',
        yapi: '/api',
    };

    timeout = 10000;
    urlDev = this.urlMap.yapi;
    urlProdOnline = this.urlMap.default;
    urlBosProdSandbox = 'https://bce.bdstatic.com/portal-cms/sandbox';
    urlBosProdOnline = 'https://bce.bdstatic.com/portal-cms/online';

    // 请求的基本路径
    getBaseUrl() {
        return isProd() ? this.urlProdOnline : this.urlDev;
    }

    // 测试想要在cms沙盒环境测试，而用户侧这边一直从cms线上获取数据就行不通
    // 本意是 cms线上是给pm用的，cms沙盒环境是给测试用的
    // 这里给测试打开一个能从cms沙盒环境获取数据的机制
    // 开发环境只能拿沙盒预览数据,线上正式环境只能取线上数据
    // 默认情况都是从线上拿数据，沙盒环境url带上source=cms_sandbox，会从cms沙盒环境拿数据
    getBosUrl() {
        return (isSandBoxOnlineAndGetSourceFromCmsSandbox() || !isProd())
            ? this.urlBosProdSandbox : this.urlBosProdOnline;
    }
    // 线上环境不带前缀 _pre
    getBosUrlPrefix() {
        return isProdOnline() ? '' : 'pre_';
    }
}
