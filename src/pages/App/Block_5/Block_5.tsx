// Styles
import styles from './styles.module.scss';
import resStyles from '../../../utils/resStyles.js';
import useResolutions from '../../../hooks/useResolusions.js';

// Images & Videos
import bubbles from '../../../components/img/bubbles3.png';
import { StormButton } from '../../../styles/mui.js';
import { Link } from 'react-router-dom';

function Block_5() {

    // Get screen resolution object
    const resolutions = useResolutions()

    return (
        // Main tag for block 5
        <div className={`${styles.job} ${resStyles('job', resolutions)}`}>

            {/* Main container for block content */}
            <div className={`${styles.container} ${resStyles('container', resolutions)}`}>

                {/* Tag for text content */}
                <div className={`${styles.text} ${resStyles('description', resolutions)}`}>

                    {/* Block header */}
                    <h2 className={`${resStyles('title', resolutions)}`}>EARN TOGETHER WITH <b>StormShop</b></h2>

                    {/* Block description */}
                    <div className={`${styles.text_description} ${resStyles('subtitle', resolutions)}`}>

                        {/* Description broken into paragraphs */}
                        <p>
                            We provide the opportunity for ALL users to earn together with us!
                        </p>
                        <p>
                            For each referred user <span style={{ color: '#ffffff' }}>we give 100% profit from the purchase!</span>
                        </p>
                        <p>
                            You heard right, exactly 100%! Interested? Then read the article and register on our website!
                        </p>
                    </div>

                    {/* Block with action buttons */}
                    <div>
                        <Link to="/article/job"><StormButton className={`${resStyles('buttonFontSize', resolutions)}`} sx={{
                            zIndex: '1',
                            color: '#60F6FF',
                            fontStyle: 'normal',
                            fontWeight: '600',
                            lineHeight: 'normal',
                            flexShrink: '0',
                            borderRadius: '10px',
                            border: '3px solid #60F6FF',
                            background: 'rgba(96, 246, 255, 0.10)',
                            backdropFilter: 'blur(4px)',
                            p: '12px 32px',
                            m: '0',
                            mr: '20px',
                            mt: '15px',

                            '&:hover': {
                                border: '3px solid #60F6FF',
                                background: 'rgba(96, 246, 255, 0.2)'
                            }
                        }}>
                            Read
                        </StormButton></Link>
                        <Link to="/signup">
                            <StormButton className={`${resStyles('buttonFontSize', resolutions)}`} sx={{
                                zIndex: '1',
                                color: '#F04EFF',
                                fontStyle: 'normal',
                                fontWeight: '600',
                                lineHeight: 'normal',
                                flexShrink: '0',
                                borderRadius: '10px',
                                border: '3px solid #F04EFF',
                                background: 'rgba(240, 78, 255, 0.2)',
                                backdropFilter: 'blur(4px)',
                                p: '12px 32px',
                                m: '0',
                                mr: '20px',
                                mt: '15px',

                                '&:hover': {
                                    border: '3px solid #F04EFF',
                                    background: 'rgba(240, 78, 255, 0.2)'
                                }
                            }}>
                                Registration
                            </StormButton>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Block decoration */}
            <img src={bubbles} className={`${styles.bubble} ${resStyles('job_bubble', resolutions)}`} />
        </div >
    );
}

export default Block_5;