"use client";
import React from 'react';
import { Result } from 'antd';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@nextui-org/react';
const App = () => (
  <Result
    status="success"
    title="Votre mot de passe est bien reinitialisé, veuillez vous reconnecter"
    subTitle=""
    extra={[
      <Link href={"/home"}><Button type="primary" startContent={ <ArrowLeft />} color="primary" key="console">
        Accueil
      </Button>
      </Link>
    //   <Button key="buy">Buy Again</Button>,
    ]}
  />
);
export default App;