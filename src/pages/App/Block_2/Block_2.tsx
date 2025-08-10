// Styles
import styles from './styles.module.scss';
import resStyles from '../../../utils/resStyles.ts';
import useResolutions from '../../../hooks/useResolusions.ts';

// Images
import tgIcon_small from '../../../components/img/tgIcon_small.svg';
import discordIcon from '../../../components/img/discordIcon.svg';
import plati from '../../../components/img/plati.png';
import funpay from '../../../components/img/funpay.png';


export default function Block_2() {

    // Get screen resolution object
    const resolution = useResolutions()

    return (
        <section className={`${styles.other_networks} ${resStyles('container', resolution)}`}>

            {/* Header */}
            <div className={`${styles.title} ${resStyles('title', resolution)}`}>Buy where it's <b style={{ fontWeight: '600' }}>more convenient</b> for you!</div>

            {/* Main content */}
            <article className={`${styles.items} ${resStyles('net_big_items', resolution)}`}>

                {/* List of links to other purchase options */}

                <div className={styles.item}>
                    <img src={tgIcon_small} style={{ width: '68px' }} alt='Telegram Icon' />
                    <a className={`${resStyles('subtitle', resolution)}`} href='https://t.me/storm_nitro_shop_bot' target='_blank' rel='noreferrer noopener'>Telegram Bot</a>
                </div>

                <div className={styles.item}>
                    <img src={discordIcon} style={{ width: '56px', padding: '6px' }} alt='Discord Icon' />
                    <a className={`${resStyles('subtitle', resolution)}`} href='https://discord.gg/BNsV86yGQA' target='_blank' rel='noreferrer noopener'>Discord Server</a>
                </div>

                <div className={styles.item}>
                    <img src={funpay} style={{ width: '56px', borderRadius: '100%', padding: '6px' }} alt='FunPay Icon' />
                    <a className={`${resStyles('subtitle', resolution)}`} href='https://funpay.com/users/2879263/' target='_blank' rel='noreferrer noopener'>FunPay</a>
                </div>

                <div className={styles.item}>
                    <img src={plati} style={{ width: '56px', borderRadius: '100%', padding: '6px' }} alt='Plati.market Icon' />
                    <a className={`${resStyles('subtitle', resolution)}`} href='https://plati.io/itm/3753787' target='_blank' rel='noreferrer noopener'>Plati.market</a>
                </div>

            </article>
        </section>
    )
}