import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from './paginas/Login';
import Cadastro from './paginas/Cadastro';
import Principal from './paginas/Principal';
import NaoEncontrado from './paginas/NaoEncontrado';

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<Cadastro />} />
                <Route path="/principal" element={<Principal />} />
                <Route path="/naoencontrado" element={<NaoEncontrado />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;