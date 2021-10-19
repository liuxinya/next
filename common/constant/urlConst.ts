import {Ioc} from '@baidu/ioc';
import {UHttpConfig} from '../config/http';


const httpConfig = Ioc(UHttpConfig);
const urlBos = httpConfig.getBosUrl();
const prefix = httpConfig.getBosUrlPrefix();

// 首页
const index = {
    // 获取banner信息
    GET_BANNER: `${urlBos}/index/${prefix}banner.js`,
    // 获取营销位数据
    GET_MARKETING_POSITION: `${urlBos}/index/${prefix}marketingBit.js`,
    // 获取产品数据
    GET_PORDUCT: `${urlBos}/index/${prefix}product.js`,
    // 获取企业服务中心数据
    GET_ENTERPRISE: `${urlBos}/index/${prefix}enterprise.js`,
    // 获取开发者中心数据
    GET_DEVELOPER: `${urlBos}/index/${prefix}developer.js`,
};

export const urlConst = {
    ...index,
    // 图片上传
    UPLOAD_IMAGE: '/upload/image',
};
