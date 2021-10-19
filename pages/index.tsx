import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import {IndexBanner} from '../common/components/page/IndexBanner';

function Home() {
    return (
        <div>
            <Head>
                <title>百度智能云-智能时代基础设施</title>
                <link rel="shortcut icon" href="https://bce.bdstatic.com/img/favicon.ico" type="image/x-icon" />
                <meta httpEquiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
                <meta name="baidu-site-verification" content="caCyUCCGl5" />
                <meta name="keywords" content="百度智能云,云服务器,物联网,域名注册,百度云,云计算,云数据库,云主机,云存储,对象存储,百度云cdn,AI人工智能,云智一体" />
                <meta name="description" content="百度智能云专注云计算、智能大数据、人工智能服务，提供稳定的云服务器、云主机、云存储、CDN、域名注册、物联网等云服务,支持API对接,快速备案等专业解决方案。" />
                <meta name="renderer" content="webkit" />
            </Head>
            <IndexBanner />
            <div className={styles.banner}>12312</div>
        </div>
    );
}

export default Home
