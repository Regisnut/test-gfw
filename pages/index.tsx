import React, { useState } from "react";
import type { NextPage } from "next";
// Components
import Layout from "../Components/Nav/Layout";
import Registrar from "../Components/ContainerRegistrar/Registrar";
import Cookies from "js-cookie";

const Home: NextPage = () => {
    const username = Cookies.get("username");
    const [name, setName] = useState(username ? username : null);
    return (
        <Layout name={name} setName={setName}>
            <Registrar setName={setName} />
        </Layout>
    );
};

export default Home;
