// Стили
import styles from './styles.module.scss';
import resStyles from '../../../utils/resStyles.js';
import useResolutions from '../../../hooks/useResolusions.js';

// Иконки
import money from '../../../components/icons/money.svg'
import person from '../../../components/icons/person.svg'
import piggy from '../../../components/icons/piggy.svg'
import speed from '../../../components/icons/speed.svg'

function Block_6() {
    // Получить объект с разрешением экрана
    const resolutions = useResolutions()

    return ( 
        <section className={`${styles.benefits}`}>
            <div className={`${styles.container} ${resStyles('container', resolutions)}`}>
                {/* Заголовок блока */}
                <h2 className={`${resStyles('title', resolutions)}`}>WHY<b style={{color: '#F04EFF'}}>WE</b>?</h2>

                <div className={`${styles.item} ${resStyles('description', resolutions)}`}>
                    <img src={speed} alt='speed icon'/>
                    <p style={{color: '#F04EFF'}} className={`${resStyles('subtitle', resolutions)}`}>
                        Speed - WE issue SUBSCRIPTIONS and SCRIPTS in the shortest possible time, WE will try to respond within a few minutes!
                    </p>
                </div>
                <div className={`${styles.item} ${resStyles('description', resolutions)}`}>
                    <img src={piggy} alt='piggy icon'/>
                    <p style={{color: '#F2B61A'}} className={`${resStyles('subtitle', resolutions)}`}>
                        Our store has some of the cheapest prices thanks to automation, we also have discounts, coupons and referral programs!
                    </p>
                </div>
                <div className={`${styles.item} ${resStyles('description', resolutions)}`}>
                    <img src={money} alt='money icon'/>
                    <p style={{color: '#5BC834'}} className={`${resStyles('subtitle', resolutions)}`}>
                        Our store gives everyone the opportunity to earn with us, 100% profit from the referral program!
                    </p>
                </div>
                <div className={`${styles.item} ${resStyles('description', resolutions)}`}>
                    <img src={person} alt='person icon'/>
                    <p style={{color: '#44A3D8'}} className={`${resStyles('subtitle', resolutions)}`}>
                        We have an understanding and responsive tech SUPPORT, you can always contact us with any questions you may have, including about cooperation!
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Block_6;