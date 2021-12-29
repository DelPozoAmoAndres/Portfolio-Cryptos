import React, { useEffect, useState } from 'react';
import { Balance } from './views/balance';
import { SafeAreaView, StatusBar, } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'
import { Account } from './views/accounts';
import { Home } from './views/home';
import { getActives, getBalanceHistory } from './services/balanceService';
import { loadDataHome } from "./services/homeService.js";
import { addBalanceHistory } from './services/storageService';
import { NavBar1, NavBar2, NavBar3 } from './components/navbar';
import { set } from 'react-native-reanimated';

export default function App(p) {
  const [actives, setActives] = useState([]);
  const [balanceHistory, setBalanceHistory] = useState([[], []])
  const [coins, setCoins] = useState([]);
  const currency = "USD"

  useEffect(async () => {
    //balance
    const actives = await getActives()
    const balanceHistory = await addBalanceHistory(actives)
    setActives(actives);
    setBalanceHistory(balanceHistory);
    //home
    let data = await loadDataHome(currency)
    setCoins(data)
    console.log("load")
  }, [])

  return (
    <Router >
      <Scene key="root" hideNavBar={true} hideTabBar={false} tabs={true} tabBarPosition='bottom'>
        <Scene key="feed" component={Home} currency={currency} coins={coins} title="feed" initial={true} hideNavBar={true}
          tabBarComponent={NavBar1}
        />
        <Scene key="balance" component={Balance} actives={actives} balanceHistory={balanceHistory} currency={currency} title="balance" hideNavBar={true}
          tabBarComponent={NavBar2}
        />
        <Scene key="accounts" component={Account} title="accounts" hideNavBar={true}
          tabBarComponent={NavBar3}
        />
      </Scene>

    </Router>
  );
}