/**
 * @file banner
 * @author luhuan
 */
import {Ioc} from '@baidu/ioc';
import {UNetService} from '@baidu/bce-services';
import {useOnMount, useStateRef} from '@baidu/bce-hooks';
import {isRetina} from '@baidu/bce-helper';
import {defaultBanner} from './defaultModel';
import styles from  './indexBanner.module.less';
import {urlConst} from '../../constant/urlConst';
 
 export function IndexBanner() {
     const [currentIndex, setCurrentIndex, currentIndexRef] = useStateRef<number>(0);
     const [bannerData, setBannerData, bannerDataRef] = useStateRef([]);
     const [, , timerRef] = useStateRef({timer: null});
 
     const switchBanner = (directory: any) => {
         const currIndexVal = currentIndexRef.current;
         switch (directory) {
             case 'left':
                 setCurrentIndex(currIndexVal <= 0 ? bannerDataRef.current.length - 1 : currIndexVal - 1);
                 break;
             case 'right':
                 setCurrentIndex(currIndexVal >= bannerDataRef.current.length - 1 ? 0 : currIndexVal + 1);
                 break;
         }
     };
 
     const clearBannerInterval = () => {
         if (timerRef.current.timer) {
             clearInterval(timerRef.current.timer);
             timerRef.current.timer = null;
         }
     };
 
     const initBannerInterval = () => {
         clearBannerInterval();
         timerRef.current.timer = setInterval(() => {
             switchBanner('right');
         }, 3000);
     };
 
     useOnMount(async () => {
         Ioc(UNetService).get(urlConst.GET_BANNER)
             .then(data => {
                 return (data as unknown as {banners: any[]})?.banners.length ? (data as unknown as {banners: any[]}).banners : defaultBanner;
             })
             .catch(() => defaultBanner)
             .then(newData => {
                 setBannerData(newData);
                 initBannerInterval();
             });
         return () => {
             clearBannerInterval();
         };
     });
 
     return (
         <section
             className={styles.banner}
             onMouseOver={clearBannerInterval}
             onMouseOut={initBannerInterval}
         >
             <div className={styles.slider}>
                 {
                     bannerData.map((item, index) => (
                         <a
                             className={currentIndex === index ? styles.current : ''}
                             // eslint-disable-next-line react/no-array-index-key
                             key={index}
                             target="_blank"
                             rel="noopener noreferrer"
                             href={item.link}
                             style={{
                                 backgroundImage: `url(${isRetina() ? item.bgSrcRetina : item.bgSrc})`,
                                 backgroundColor: item.bgColor,
                             }}
                         >
                             {
                                 <div
                                     className={styles[item.txtColor]}
                                     data-track-category="新版-banner"
                                     data-track-name={`第${index + 1}帧`}
                                     data-track-value={item.bannerDesc}
                                 >
                                     <div className="width1180-center" style={{display: item.type === 'session' ? 'none' : 'block'}}>
                                         <h2 className={styles.title}>{item.name}</h2>
                                         <p className={styles.desc}>{item.desc}</p>
                                         <span
                                             className={styles.btn}
                                             style={{backgroundColor: item.buttonBgColor || '#2468F2', color: item.buttonTextColor || '#fff'}}
                                         >
                                             {item.button}
                                         </span>
                                     </div>
                                     {
                                         item.type === 'session' && (
                                             <div className={styles['sesstion-bg']} style={{backgroundImage: `url('${item.img}')`}}></div>
                                         )
                                     }
                                 </div>
                             }
                         </a>
                     ))
                 }
             </div>
             {
                 bannerData && bannerData.length > 1 ? (
                     <ul className={`width1180-center ${styles['tab-bar']} ${styles[bannerData[currentIndex].tabColor]}`}>
                         {
                             bannerData.map((item, index) => (
                                 <li
                                     // eslint-disable-next-line react/no-array-index-key
                                     key={index}
                                     className={`${currentIndex === index ? styles.current : ''}`}
                                     onClick={() => {
                                         index !== currentIndex && setCurrentIndex(index);
                                     }}
                                 >
                                     <span></span>
                                 </li>
                             ))
                         }
                     </ul>
                 ) : null
             }
             {
                 bannerData && bannerData.length > 1 ? (
                     <div className={`width1180-center ${styles['switch-btn-group']}`}>
                         <div className={`${styles['switch-btn']} ${styles['btn-left']}`} onClick={() => {switchBanner('left');}}></div>
                         <div className={`${styles['switch-btn']} ${styles['btn-right']}`} onClick={() => {switchBanner('right');}}></div>
                     </div>
                 ) : null
             }
         </section>
     );
 }
 