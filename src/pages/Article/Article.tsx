// Base scripts
import { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// API imports
import { APIContext } from '../../context/APIContext';

// Types
import type { Article } from '../../typings/Article';

// Styles
import resStyles from '../../utils/resStyles';
import useResolutions from '../../hooks/useResolusions';
import styles from './styles.module.scss';

// Article components
import Title from './Title';
import Text from './Text';
import SmallTitle from './SmallTitle';
import SmallText from './SmallText';
import Video from './Video';
import Picture from './Picture';

function Article() {

    // Hooks
    const [article, setArticle] = useState<Article | null>(null)
    const [adBlockPosition, setAdBlockPosition] = useState<'static' | 'relative' | 'fixed' | 'absolute' | 'sticky' | undefined>('fixed');
    const boxRef = useRef<HTMLDivElement>(null);
    const adRef = useRef<HTMLDivElement>(null);
    const [positionFormula, setPositionFormula] = useState<string>(`${(window.innerWidth - 1170) / 2}px`)

    // Get screen resolution
    const resolutions = useResolutions()

    // Get link parameter
    const { name } = useParams();

    // Get class for API work
    const api = useContext(APIContext)!.api

    useEffect(() => {
        if (
            resolutions.isBigScreen // If the screen is big
            && !resolutions.isMidScreen
            && !resolutions.isSmallScreen
            && !resolutions.isPhone) {
            setPositionFormula(`${(window.innerWidth - 1170) / 2}px`)
        }

        else if (
            !resolutions.isBigScreen
            && resolutions.isMidScreen // If the screen is middle
            && !resolutions.isSmallScreen
            && !resolutions.isPhone) {

            const percent = window.innerHeight / 100
            setPositionFormula(`${(window.innerHeight - (percent * 90)) / 2}px`)
        }

        else if (
            resolutions.isSmallScreen // If the screen is small
            && !resolutions.isPhone) {

            const percent = window.innerHeight / 100
            setPositionFormula(`${(window.innerHeight - (percent * 95)) / 2}px`)
        }
    }, [resolutions])

    useEffect(() => {
        (async () => {
            // Get article
            const res = await api!.getArticle(name!)
            setArticle(res.data)
        })()
    }, [])

    useEffect(() => {

        // Function triggered on scroll
        const handleScroll = () => {

            // If all needed components have loaded
            if (boxRef.current && adRef.current) {

                // Get all needed variables
                const articleHeight = boxRef!.current!.offsetHeight;
                const adBlock = adRef!.current!;
                const adBlockHeight = adBlock!.offsetHeight;
                const scrollY = window.scrollY;

                // If the ad block goes beyond bounds, it won't move anymore
                // Otherwise it will be fixed on screen
                if ((articleHeight + 125) - (adBlockHeight + 125) < scrollY) {
                    setAdBlockPosition('absolute');
                } else {
                    setAdBlockPosition('fixed');
                }
            }
        }

        // Add scroll event tracking
        window.addEventListener('scroll', handleScroll);

        return () => {
            // Cleanup
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <main className={`${styles.article}`}>
            {/* All meta tags in header */}
            <Helmet>
                <title>StormShop: {article?.display_name || "article"}</title>
                <meta name='description' content={`StormShop: ${article?.seo_description || "Article without description"}`} />
                <meta name="keywords" content='Nitro Discord NitroStorm Buy nitro' />
            </Helmet>

            {/* The section with articles and advertising */}
            <section ref={boxRef} className={`${styles.container} ${resStyles('container', resolutions)}`}>

                {/* The article itself */}
                <article className={`${styles.content} ${resStyles('article_content', resolutions)}`}>

                    {
                        // Article generation
                        article?.content.map((i, index) => {
                            if (i.type === 'title') return (<Title key={index}>{i.content}</Title>)

                            else if (i.type === 'p') return (<Text key={index}>{i.content}</Text>)

                            else if (i.type === 'small_title') return (<SmallTitle key={index}>{i.content}</SmallTitle>)

                            else if (i.type === 'small_p') return (<SmallText key={index}>{i.content}</SmallText>)

                            else if (i.type === 'image') return (<Picture key={index} route={i.url} alt={i.alt} />)

                            else if (i.type === 'video') return (<Video key={index} route={i.url} />)
                        })
                    }

                </article>

                {/* Advertising section */}
                <section style={{
                    // Determine block positioning, absolute or fixed
                    position: adBlockPosition,

                    // Determine distance from right side to fit inside main container
                    right: positionFormula,

                    // Determine distance based on positioning value
                    top: adBlockPosition === 'absolute' && boxRef.current && adRef.current ?
                        `${Number((boxRef!.current!.offsetHeight + 125) - (adRef!.current!.offsetHeight + 125)) + 125}px` : ''
                }}
                ref={adRef}
                className={`${styles.ad} ${resStyles('article_ad', resolutions)}`}>

                </section>
            </section>
        </main>
    );
}

export default Article;