// Styles
import styles from './styles.module.scss';
import resStyles from '../../../utils/resStyles.js';
import useResolutions from '../../../hooks/useResolusions.js';

// Images & Videos
import chatGPT from '../../../components/img/chatgpt-icon.svg';

function ScriptShop() {
    // Get screen resolution object
    const resolutions = useResolutions()
    const { isMidScreen, isPhone, isSmallScreen } = useResolutions()

    return (
        <div className={`${styles.scripts} ${resStyles('botOrder_scripts', resolutions)}`}>
            <div className={`${styles.scripts_desc} ${resStyles('botOrder_desc', resolutions)}`} style={
                isMidScreen && !isSmallScreen && !isPhone ? { width: '100%', marginBottom: '140px' } : {}
            }>
                <div className={`${styles.title} ${resStyles('title', resolutions)}`}>
                    READY <span className={styles.title_colorful_yellow}>SCRIPTS</span>
                </div>
                <div className={`${styles.subtitle} ${resStyles('subtitle', resolutions)}`}>
                    We also offer a store of ready-made
                    scripts and bots, such as a script for
                    auto-buying nitro on nodejs or a ready-made
                    chat script with chatGPT on C++
                </div>
                <a href='/scripts' className={`${styles.linkToShop} ${resStyles('subtitle', resolutions)}`}>Go to store</a>
            </div>

            {/* Images */}
            <img src={chatGPT} className={`${styles.GPTIcon} ${resStyles('botOrder_GPTIcon', resolutions)}`} alt='ChatGPT Icon' />
        </div>
    );
}

export default ScriptShop;