import {Navigate, Route, Routes} from 'react-router-dom';
import Garage from './pages/garage/Garage';
import Winners from './pages/winners/Winners';
import Error404 from './pages/404/Error404';
import Header from './components/header/Header';

export const PATH = {
    GARAGE: '/garage',
    WINNERS: '/winners',
}

function Pages() {
    return (
        <>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Navigate to={PATH.GARAGE}/>}/>
                <Route path={PATH.GARAGE} element={<Garage/>}/>

                <Route path={PATH.WINNERS} element={<Winners/>}/>

                <Route path={"/*"} element={<Error404/>}/>
            </Routes>
        </>
    )
}

export default Pages