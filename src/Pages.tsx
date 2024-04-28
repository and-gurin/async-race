import {Navigate, Route, Routes} from 'react-router-dom';
import Garage from './pages/garage/Garage';
import Winners from './pages/winners/Winners';
import Error404 from './pages/404/Error404';

export const PATH = {
    GARAGE: '/garage',
    WINNERS: '/winners',
}

function Pages() {
    return (
        <>
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