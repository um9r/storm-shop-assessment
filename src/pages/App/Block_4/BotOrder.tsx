// Styles
import styles from './styles.module.scss';
import resStyles from '../../../utils/resStyles.js';
import useResolutions from '../../../hooks/useResolusions.js';

// Project Components & Hooks
import { StormButton } from '../../../styles/mui.js';

// Images & Videos
import tgIcon_small from '../../../components/img/tgIcon_small.svg';
import discordIcon from '../../../components/img/discordIcon.svg';

function BotOrder() {
    // Get screen resolution object
    const resolutions = useResolutions()

    return (
        <div className={`${styles.botOrder} ${resStyles('botOrder_bots', resolutions)}`}>
            <div className={`${styles.botOrder_desc} ${resStyles('botOrder_desc', resolutions)}`}>
                <div className={`${styles.title} ${resStyles('title', resolutions)}`}>
                    ORDER <span className={styles.title_colorful}>BOT</span>
                </div>
                <div className={`${styles.subtitle} ${resStyles('subtitle', resolutions)}`}>
                    Want to order your own bot for Discord or Telegram, then you're in the right place!
                </div>
            </div>
            <StormButton className={`${styles.button} ${resStyles('botOrder_button', resolutions)} ${resStyles('buttonFontSize', resolutions)}`}>
                ORDER
            </StormButton>

            {/* Images */}
            <img src={tgIcon_small} className={`${styles.tgIcon} ${resStyles('botOrder_tgIcon', resolutions)}`} alt='Telegram Icon' />
            <img src={discordIcon} className={`${styles.dcIcon} ${resStyles('botOrder_dcIcon', resolutions)}`} alt='Discord Icon' />

        </div>
    );
}

export default BotOrder;