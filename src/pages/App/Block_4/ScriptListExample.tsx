// Base imports
import { useContext, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios';

// Material-UI
import { IconButton } from '@mui/material'

// API imports
import { APIContext } from '../../../context/APIContext.js'

// Styles
import styles from './styles.module.scss';
import resStyles from '../../../utils/resStyles.js';
import useResolutions from '../../../hooks/useResolusions.js';

// Types
import { GoodType } from '../../../typings/Good.js'

// Project imports
import shortenText from '../../../utils/shortenText.js';
import Good from '../../../components/Good/Good.js';

// Product interface, but with a word for its acquisition inside the product
interface GoodTypeWithWord extends GoodType {
    review_word: string;
}

export default function ScriptListExample() {
    // Get screen resolution object
    const resolutions = useResolutions()
    const { isBigScreen, isMidScreen, isSmallScreen, isPhone } = useResolutions()

    // Script list
    const [script, setScript] = useState<GoodTypeWithWord>({
        type: 'subscribtion',
        id: 1,
        name: 'name',
        displayName: 'displayName',
        desc: 'description',
        imageUrl: '/',
        themeColor: '#fff',
        cost: 5,
        old_cost: 20,
        reviews: 100,
        rating: 100,
        review_word: 'reviews'
    })
    const [scriptList, setScriptList] = useState<GoodType[]>([])

    // Class for working with API 
    const api = useContext(APIContext)!.api

    function defineReviewWord(good: GoodType) {
        let review_word: string;

        // Word declensions depending on the number of reviews
        if (String(good.reviews).endsWith('1'))
            review_word = 'review'

        else if (
            String(good.reviews).endsWith('2') ||
            String(good.reviews).endsWith('3') ||
            String(good.reviews).endsWith('4')
        )
            review_word = 'reviews'
        else
            review_word = 'reviews'

        return review_word
    }

    // Get a list of 2 random scripts
    useEffect(() => {
        (async () => {

            // Get script list from backend
            const res = await api?.getScriptList() as { data: AxiosResponse["data"] }

            if (isBigScreen && !isPhone && !isSmallScreen && !isMidScreen) {

                // Generate a unique random index
                const index1 = Math.floor(Math.random() * res!.data.length);
                const good: GoodType = res!.data[index1];

                // Decline the word "reviews"
                const review_word = defineReviewWord(good)

                // Load a random script
                setScript({
                    ...good,
                    review_word
                })
            } else if (isMidScreen || isPhone || isSmallScreen) {
                const good: GoodType[] = [];

                const amount = isPhone || isSmallScreen ? 1 : 2;
                for (let i = 0; i < amount; i++) {
                    // Generate a unique random index
                    const index = Math.floor(Math.random() * res!.data.length);
                    good.push(res!.data[index]);
                }
                console.log('GOOD: ', good)

                setScriptList([...good])
            }
        })()
    }, []);

    function handleBuy() {
        console.log('Buy script')
        // Future functionality for buying a script
    }

    function handleReviews() {
        console.log('Reviews from script')
        // Future functionality for viewing reviews
    }

    return (
        // Main container
        <div
            className={`
                ${styles.scriptsBlock} 
                ${resStyles('botOrder_scriptsBlock', resolutions)}
            `}

            style={
                isMidScreen && !isPhone && !isSmallScreen ? { marginBottom: '60px' } : {}
            }
        >
            {
                isBigScreen && !isMidScreen && !isPhone && !isSmallScreen ?
                    <>
                        <span className={`${styles.scriptsBlock_subtitle} ${resStyles('botOrder_scriptsBlock_subtitle', resolutions)}`}>P.S. This script was randomly selected from the store</span>


                        {/* Get banner from backend and display on product, if not found, just a gray background */}
                        <div onClick={handleBuy} style={{ backgroundImage: `url('${import.meta.env.VITE_BACKEND_IP}:${import.meta.env.VITE_BACKEND_PORT}${script.imageUrl}')`, backgroundColor: '#7e7e7e' }} className={styles.scriptsBlock_banner}></div>

                        {/* Main block with main product content */}
                        <div className={styles.scriptsBlock_rightBlock}>

                            {/* Top part with price and buy button */}
                            <div className={styles.scriptsBlock_top} onClick={handleBuy}>

                                {/* Price */}
                                <div className={styles.scriptsBlock_cost_container}>
                                    <div className={styles.scriptsBlock_cost} style={{ color: script.themeColor }}>{script.cost}$</div>
                                    <div className={styles.scriptsBlock_old_cost}>{script.old_cost !== undefined ? `${script.old_cost}$` : <></>}</div>
                                </div>

                                {/* Cart button container */}
                                <div>

                                    {/* The button itself */}
                                    <IconButton>

                                        {/* Vector icon */}
                                        <svg fill={script.themeColor} xmlns="http://www.w3.org/2000/svg" height="30" viewBox="0 -960 960 960" width="30">
                                            <path
                                                d="M286.788-81Q257-81 236-102.212q-21-21.213-21-51Q215-183 236.212-204q21.213-21 51-21Q317-225 338-203.788q21 21.213 21 51Q359-123 337.788-102q-21.213 21-51 21Zm400 0Q657-81 636-102.212q-21-21.213-21-51Q615-183 636.212-204q21.213-21 51-21Q717-225 738-203.788q21 21.213 21 51Q759-123 737.788-102q-21.213 21-51 21ZM235-741l110 228h288l125-228H235Zm-30-60h589.074q22.964 0 34.945 21Q841-759 829-738L694-495q-11 19-28.559 30.5Q647.881-453 627-453H324l-56 104h491v60H277q-42 0-60.5-28t.5-63l64-118-152-322H51v-60h117l37 79Zm140 288h288-288Z" />
                                        </svg>
                                    </IconButton>
                                </div>
                            </div>

                            {/* Middle of product block, name and description */}
                            <div className={styles.scriptsBlock_middle} onClick={handleBuy}>

                                <div className={styles.scriptsBlock_title}>
                                    {/* Name size limit: 20 */}
                                    {shortenText(script.displayName, 20)}
                                </div>

                                <div className={styles.scriptsBlock_desc}>
                                    {/* Description size limit: 100 */}
                                    {shortenText(script.desc, 100)}
                                </div>

                            </div>

                            {/* Bottom part with reviews and product rating */}
                            <div className={styles.scriptsBlock_bottom}>

                                {/* Star */}
                                <div className={styles.star}>
                                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.0489 0.927049C11.3483 0.0057385 12.6517 0.00573993 12.9511 0.927051L14.9187 6.98278C15.0526 7.3948 15.4365 7.67376 15.8697 7.67376H22.2371C23.2058 7.67376 23.6086 8.91338 22.8249 9.48278L17.6736 13.2254C17.3231 13.4801 17.1764 13.9314 17.3103 14.3435L19.2779 20.3992C19.5773 21.3205 18.5228 22.0866 17.7391 21.5172L12.5878 17.7746C12.2373 17.5199 11.7627 17.5199 11.4122 17.7746L6.2609 21.5172C5.47719 22.0866 4.42271 21.3205 4.72206 20.3992L6.68969 14.3435C6.82356 13.9314 6.6769 13.4801 6.32642 13.2254L1.17511 9.48278C0.391392 8.91338 0.794168 7.67376 1.76289 7.67376H8.13026C8.56349 7.67376 8.94744 7.3948 9.08132 6.98278L11.0489 0.927049Z" fill="#FFE600" />
                                    </svg>
                                </div>

                                {/* Display rating and reviews */}
                                <div className={styles.reviews} onClick={handleReviews}>
                                    {script.rating} · {script.reviews} {script.review_word}
                                </div>

                            </div>
                        </div>
                    </> : <></>
            }

            {/* Header */}
            {
                isMidScreen || isPhone || isSmallScreen ?
                    <div className={`${styles.title} ${resStyles('title', resolutions)}`}>
                        SCRIPT <span className={styles.title_colorful_yellow}>EXAMPLES</span>
                    </div>
                    : <></>
            }

            {
                isMidScreen || isPhone || isSmallScreen ?
                    <>
                        {/* Tag for storing product list */}
                        <div className={`${styles.scriptsBlock_isMid_container} ${resStyles('goodList', resolutions)}`}>

                            {/* Output product list */}
                            {
                                scriptList.length > 0 ? scriptList.map(good =>
                                    <Good
                                        key={good.id}
                                        desc={{
                                            title: good.displayName,
                                            subtitle: good.desc,
                                            cost: good.cost,
                                            image: good.imageUrl,
                                            theme: good.themeColor,
                                            rating: good.rating,
                                            reviews: good.reviews,
                                            old_cost: good.old_cost
                                        }}
                                    />
                                ) : null
                            }
                        </div>
                    </> : <></>
            }
        </div>
    );
}
