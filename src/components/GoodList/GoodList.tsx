// Basic imports
import { useContext, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios';

// Styles
import styles from './styles.module.scss';
import resStyles from '../../utils/resStyles.js';
import useResolutions from '../../hooks/useResolusions';

// Project Components & Hooks
import Good from '../Good/Good'

// API imports
import { APIContext } from '../../context/APIContext'

// Interface for product
import { GoodType } from '../../typings/Good'

export default function GoodList({ type = 'sub', q = "" }: { type?: string, q?: string }) {

    // Product list
    const [goodList, setGoodlist] = useState<GoodType[]>([]);

    // Get screen resolution object
    const resolutions = useResolutions()

    // API class for work
    const api = useContext(APIContext)!.api

    // Get product list
    useEffect(() => {
        (async () => {

            // If subscription list
            if (type === 'sub') {
                const res = await api?.queryGoodList(type, q) as { data: AxiosResponse["data"] };
                setGoodlist(res!.data)
            } 
            
            // If script list
            else if (type === 'script') {
                const res = await api?.queryGoodList(type, q) as { data: AxiosResponse["data"] };
                setGoodlist(res!.data)
            }
        })()
    }, [q, type])

    return (
        // Tag for storing product list
        <section className={`${styles.container} ${resStyles('goodList', resolutions)} ${resStyles('container', resolutions)}`}>

            {/* Output product list */}
            {
                goodList.length > 0 ? goodList.map(good =>
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
        </section>
    )
}