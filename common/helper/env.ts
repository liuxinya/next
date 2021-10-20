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
