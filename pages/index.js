/* eslint-disable react/jsx-key */
import React from 'react';
import CardForm from './CardForm';
import RematriculaForm from './RematriculaForm'
import Layout from './Layout'
import Login from './Login'

export default function Home() {

  return (

    <Layout>
      <Login>
        <CardForm  >
          <RematriculaForm />
        </CardForm>
      </Login>
    </Layout>
  )

}

