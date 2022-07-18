import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    Link,
    Outlet
} from "react-router-dom";
import Header from "../layout/header";
import Analysis from "../view/analysis";
import Home from "../view/home";

const Navigation = () => {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="analysis" element={<Analysis />} />
            </Routes>
        </BrowserRouter>
    );
}
export default Navigation




