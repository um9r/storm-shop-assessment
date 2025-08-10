// Styles
import styles from './styles.module.scss';
import resStyles from '../../../utils/resStyles.js';
import useResolutions from '../../../hooks/useResolusions.js';

// Project Components & Hooks
import GoodList from '../../../components/GoodList/GoodList.js';

export default function Block_3() {
    // Get screen resolution object
    const resolutions = useResolutions()

    return (
        <>
            {/* Division between blocks */}
            <hr style={{ margin: '0 auto' }} className={`${resStyles('container', resolutions)}`}></hr>

            {/* Main content */}
            <section>

                {/* Header */}
                <div className={`${styles.title} ${resStyles('container', resolutions)} ${resStyles('title', resolutions)}`}>
                    PRODUCTS:
                </div>

                {/* Tag for storing product list */}
                <GoodList type='sub'/>
            </section>
        </>
    )
}