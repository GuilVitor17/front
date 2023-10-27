import React from "react";
import LoginForm from "../Authenticate/login/sistemaLogin";
import CreateForm from "../Authenticate/create/sistemaCreate";
import { Navigate, Route, Routes } from 'react-router-dom';
import NewPasswordForm from "../Authenticate/updatePassword/newPassword";
import EnvioEmailForm from "../Authenticate/emailToken/tokenEmail";
import HomePages from "../homePage/homePages";
import Aulas from '../homePage/aulas/aulas'
import MyAcc from '../homePage/myacc/myacc'
import MyAccApp from "../homePage/myacc/createdados/dados";
import UserProfilePanel from "../homePage/myacc/myacc";
import MyAccAppUpdate from '../homePage/myacc/updatedados/update'
import TaskForm from "../homePage/tarefas/tasks";
import TaskList from "../homePage/tarefas/listartarefas/listtask";
import EmailForm from "../homePage/email/envio";
import Sucesso from "../homePage/gateway/sucess";
import Cancel from "../homePage/gateway/canacel";
import Chat from "../homePage/chat/chat";


function PagesRoutes() {
    const token = localStorage.getItem('token');

    // Função de verificação de autenticação
    const isUserAuthenticated = () => {
        return token ? true : false;

    };


    return (
        <Routes>

            <Route path="/login" element={<LoginForm />} />
            <Route path="/create" element={<CreateForm />} />
            <Route path="/tokenemail" element={<EnvioEmailForm />} />
            <Route path="/newpassword" element={<NewPasswordForm />} />

            {/* homepages */}
            <Route
                path={`/homepages`}
                element={isUserAuthenticated() ? <HomePages /> : <LoginForm /> }
            />
            <Route
                path={`/homepages/:id/aulas`}
                element={isUserAuthenticated() ? <Aulas /> : <Navigate to="/" replace />}
            />
            <Route
                path={`/homepages/:id/myacc`}
                element={isUserAuthenticated() ? <MyAcc /> : <Navigate to="/" replace />}
            />
            <Route
                path={`/homepages/:id/createmyacc`}
                element={isUserAuthenticated() ? <MyAccApp /> : <Navigate to="/" replace />}
            />
            <Route
                path={`/homepages/:id/updatemyacc`}
                element={isUserAuthenticated() ? <MyAccAppUpdate /> : <Navigate to="/" replace />}
            />
            <Route
                path={`/homepages/:id/task`}
                element={isUserAuthenticated() ? <TaskForm /> : <Navigate to="/" replace />}
            />

            <Route
                path={`/homepages/:id/listtask`}
                element={isUserAuthenticated() ? <TaskList /> : <Navigate to="/" replace />}
            />

            <Route
                path={`/homepages/:id/email`}
                element={isUserAuthenticated() ? <EmailForm /> : <Navigate to="/" replace />}
            />

            <Route
                path={`/sucesso`}
                element={isUserAuthenticated() ? <Sucesso /> : <Navigate to="/" replace />}
            />
            <Route
                path={`/cancelado`}
                element={isUserAuthenticated() ? <Cancel /> : <Navigate to="/" replace />}
            />

            <Route
                path={`/homepages/:id/chat`}
                element={isUserAuthenticated() ? <Chat /> : <Navigate to="/" replace />}
            />




        </Routes>
    );
}

export default PagesRoutes;
