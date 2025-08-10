// Basic Imports
import { useState } from 'react'
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';

// Styles
import styles from "./styles.module.scss"
import resStyles from "../../utils/resStyles";
import useResolutions from "../../hooks/useResolusions";

// Material-UI
import { Box } from "@mui/material"
import { StormButton } from "../../styles/mui";

// Components
import GoodList from "../../components/GoodList/GoodList";

// Icons
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

function ScriptLab() {

    // Search input value
    const [query, setQuery] = useState('')

    // Get screen resolution
    const resolutions = useResolutions()

    return (
        // Main container
        <main className={`${styles.container} ${resStyles('container', resolutions)}`}>

            <Helmet>
                <title>StormShop: Script Laboratory</title>
                <meta name="description" content="StormShop: Script laboratory for different tasks!" />
                <meta name="keywords" content='Nitro Discord NitroStorm Buy nitro' />
                <meta httpEquiv="Content-Language" content="en" />
                <meta name="author" content="FLEY" />
            </Helmet>

            {/* Page header */}
            <Box component='article' className={`${styles.textBox}`}>
                <h1 className={`${styles.title} ${resStyles('title', resolutions)}`}>Script Laboratory</h1>
                <p className={`${styles.subtitle} ${resStyles('subtitle', resolutions)}`}>Didn't find the right script? <Link to='/'>Order</Link></p>
            </Box>

            {/* Input for product search */}
            <label htmlFor="searchBox" style={{ cursor: 'text' }}>
                <Box component='section' className={`${styles.searchBox}`}>
                    <form method="GET" className={`${styles.searchForm}`} onSubmit={(e) => e.preventDefault()}>
                        <input value={query} onChange={(e) => setQuery(e.target.value)} id="searchBox" className={`${styles.searchInput} ${resStyles('smallSubtitle', resolutions)}`} placeholder="SEARCH" />
                        <StormButton startIcon={<SearchRoundedIcon className={`${styles.searchIcon}`} htmlColor="#000" />} className={`${styles.searchButton}`}></StormButton>
                    </form>
                </Box>
            </label>

            {/* Product list */}
            <GoodList type="script" q={query} />
        </main>
    );
}

export default ScriptLab;