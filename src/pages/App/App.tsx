// Basic imports
import { Helmet } from 'react-helmet';

// Styles
import styles from '../../styles/App.module.scss';
import '../../staticApp.css';
import resStyles from '../../utils/resStyles.ts';
import useResolutions from '../../hooks/useResolusions.ts';

// Import site blocks
import Block_1 from './Block_1/Block_1.tsx';
import Block_2 from './Block_2/Block_2.tsx';
import Block_3 from './Block_3/Block_3.tsx';
import Block_4 from './Block_4/Block_4.tsx';
import Block_5 from './Block_5/Block_5.tsx';
import Block_6 from './Block_6/Block_6.tsx';

export default function App(): JSX.Element {
    /* Determine screen size, returns true/false */
    const resolutions = useResolutions()

    return (
        <div className={`${styles.app}`}>

            {/* Setting tags for page description and SEO */}

            <Helmet>
                <title>StormShop: Subscriptions & Scripts</title>
                <meta name="description" content="StormShop: Subscription and Script Store, as well as a project for creating personal scripts!" />
                <meta name="keywords" content='Nitro Discord NitroStorm Buy nitro' />
                <meta httpEquiv="Content-Language" content="en" />
                <meta name="author" content="FLEY" />
            </Helmet>

            {/* Various separate page elements */}

            <div className={`${styles.purple_light} ${resStyles('purple_light', resolutions)}`}></div> {/* Purple glow */}
            <div className={`${styles.blue_light} ${resStyles('blue_light', resolutions)}`}></div> {/* Blue glow */}
            <div className={`${styles.yellow_light} ${resStyles('yellow_light', resolutions)}`}></div> {/* Yellow glow */}

            {/* Different site blocks */}

            <Block_1 />
            <Block_2 />
            {/* <Block_3 /> */}
            <Block_4 />
            <Block_5 />
            <Block_6 />
        </div>
    );
}
