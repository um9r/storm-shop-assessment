// Basic imports
import MediaQuery from 'react-responsive';

// Styles
import styles from './styles.module.scss';
import resStyles from '../../../utils/resStyles.js';
import useResolutions from '../../../hooks/useResolusions.js';

// Project Components & Hooks
import VideoBot from './VideoBot.js';
import BotOrder from './BotOrder.js'
import ScriptListExample from './ScriptListExample.js'
import ScriptShop from './ScriptShop.js';

// Images & Videos
import devider from '../../../components/img/devider.svg';

export default function Block_4() {

    // Get screen resolution object
    const resolutions = useResolutions()

    return (
        <>
            {/* Large monitors */}
            <MediaQuery minWidth={1171} >
                <section className={`${styles.big}`}>
                    <div style={{ width: '100%', height: '600px', zIndex: '-1', position: 'absolute' }} className={`${styles.backgound}`}>

                    </div>
                    {/* Main content */}
                    <div className={`${styles.container} ${resStyles('container', resolutions)}`}>

                        {/* Top part of block */}
                        <div className={`${styles.top}`}>

                            {/* Sub-block with description of bot ordering services */}
                            <BotOrder />

                            {/* Divider between sub-blocks */}
                            <div className={`${styles.devider}`}>
                                <img src={devider} alt='devider' />
                            </div>

                            {/* Sub-block with description of ready-made script services */}
                            <ScriptShop />

                        </div>

                        {/* Bottom part of block */}
                        <div className={`${styles.bottom}`}>

                            {/* Sub-block with video example of bot work */}
                            <VideoBot />

                            {/* Sub-block with 2 random scripts for example */}
                            <ScriptListExample />
                        </div>
                    </div>
                </section>
            </MediaQuery>


            {/* Medium monitors */}
            <MediaQuery maxWidth={1170} minWidth={921} >
                <section className={`${styles.middle}`}>
                    <div className={`${styles.middle_container} ${resStyles('container', resolutions)}`}>
                        <div className={`${styles.middle_top}`}>
                            <BotOrder />
                            <VideoBot />
                        </div>
                        <div className={`${styles.middle_bottom}`}>
                            <ScriptShop />
                            <ScriptListExample />
                        </div>
                    </div>
                </section>
            </MediaQuery>


            {/* Small monitors / Phone screens */}
            <MediaQuery maxWidth={920}>
                <section className={`${styles.small}`}>
                    <div className={`${styles.small_container} ${resStyles('container', resolutions)}`}>
                        <BotOrder />
                        <VideoBot />
                        <ScriptShop />
                        <ScriptListExample />
                    </div>
                </section>
            </MediaQuery>
        </>
    )
}