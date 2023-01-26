/* eslint-disable react/jsx-key */
import React from 'react';

import { useSession } from 'next-auth/react';
import CardForm from './CardForm';
import AtividadesForm from './AtividadesForm'
import Layout from '../components/layout/Layout'

import Dashboard from '../components/dashboard/Dashboard'
import Login from '../components/auth/login.js'

export default function Home() {
  
  return (
    /* 
    <Layout>
      <Login>
        <CardForm  >
          <AtividadesForm />
        </CardForm>
      </Login>
    </Layout>
    */

    <Login>
      <Dashboard/>
    </Login>

  )

}

