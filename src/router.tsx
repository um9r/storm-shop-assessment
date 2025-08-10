// Basic imports
import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import App from './pages/App/App.tsx';
import SignUp from './pages/SignUp.tsx'
import LogIn from './pages/LogIn.tsx';
import ScriptLab from './pages/ScriptLab/ScriptLab.tsx';
import Article from './pages/Article/Article.tsx';

// API imports
import Api from './utils/Api.ts'
import { APIContext } from './context/APIContext.ts'
import { getUUID, checkUUID, findUUID } from './utils/UUID.ts';

// Project Components & Hooks
import Header from './components/Header/Header.tsx';
import Footer from './components/Footer/Footer.tsx';

function RouterComp() {

    // Get UUID for user and save it to browser's local storage    
    useEffect((): void => {
        const isUUID = checkUUID();
        if (!isUUID) getUUID()
    }, [])

    return (
        <main>
            <APIContext.Provider value={{ api: new Api(findUUID() === '' ? getUUID() : findUUID()) }}>

                {/* Routes */}
                <BrowserRouter>

                    {/* Site header */}
                    <Header />

                    <Routes>

                        {/* Main page, if route not found, also load main page */}
                        <Route path="/" element={<App />} />
                        <Route path="/*" element={<App />} />

                        {/* Login / Registration */}
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/login" element={<LogIn />} />

                        {/* Router options */}
                        <Route path="/scripts" element={<ScriptLab />} />
                        <Route path="/script" element={<ScriptLab />} />
                        <Route path="/script-lab" element={<ScriptLab />} />

                        {/* Articles */}
                        <Route path='/article/:name' element={<Article />} />

                    </Routes>

                    {/* Site footer */}
                    <Footer />

                </BrowserRouter>

            </APIContext.Provider>
        </main>
    )
}

export default RouterComp;