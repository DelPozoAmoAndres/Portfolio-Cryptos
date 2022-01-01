import React, {useEffect, useState } from 'react';
import { Router, Scene } from 'react-native-router-flux'
import { Profile } from './views/Profile';
import { Actives } from './views/Actives';
import { Home } from './views/Home';
import { Preloading } from './views/Preloading';
import { NavBar1, NavBar2, NavBar3 } from './components/Navbar';
import { ThemeProvider } from './theme/theme-context';


import Manager from './Model/Manager';
import GestorCryptos from './Model/GestorCryptos';
import Configuration from './Model/Configuration';

export default function App() {
  const[manager,setManager]=useState(new Manager([],new GestorCryptos([])));
  var configuration = new Configuration();
  const[loading,setLoading]=useState(true);
  useEffect(async() => {
    setManager(await Manager.init());// listo para probar
    setLoading(false);
  }, [])

  return (
    <ThemeProvider>
      {loading
      ?
      <Preloading/>
      :
      <Router >
        <Scene key="root" hideNavBar={true} hideTabBar={false} tabs={true} tabBarPosition='bottom'>
          <Scene key="feed" component={Home} currency={configuration.getCurrency()} coins={manager.getGestorCrypto().getListCryptos()} title="feed" hideNavBar={true}
            tabBarComponent={NavBar1} />
          <Scene key="balance" component={Actives} currency={configuration.getCurrency()} manager={manager} title="balance" hideNavBar={true} initial={true}
            tabBarComponent={NavBar2} />
          <Scene key="accounts" component={Profile} title="accounts" hideNavBar={true} manager={manager}
            tabBarComponent={NavBar3} />
        </Scene>
      </Router>}
    </ThemeProvider>

  );
}