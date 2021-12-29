import React, { useEffect, useState } from 'react';
import { Balance } from './views/Balance';
import { Router, Scene } from 'react-native-router-flux'
import { Account } from './views/Accounts';
import { Home } from './views/Home';
import { getActives,addHistory } from './services/BalanceService';
import { loadDataHome } from "./services/HomeService.js";
import { NavBar1, NavBar2, NavBar3 } from './components/Navbar';
import {ThemeProvider} from './theme/theme-context';


export default function App() {
  const [actives, setActives] = useState([]);
  const [balanceHistory, setBalanceHistory] = useState([[], []])
  const [coins, setCoins] = useState([]);
  const currency = "USD"

  useEffect(async () => {
    //balance
    const actives = await getActives()
    const balanceHistory = await addHistory(actives)
    setActives(actives);
    setBalanceHistory(balanceHistory);
    //home
    let data = await loadDataHome(currency)
    setCoins(data)
    console.log("load")
  }, [])

  return (
    <ThemeProvider>
      <Router >
        <Scene key="root" hideNavBar={true} hideTabBar={false} tabs={true} tabBarPosition='bottom'>
          <Scene key="feed" component={Home} currency={currency} coins={coins} title="feed"  hideNavBar={true}
            tabBarComponent={NavBar1}/>
          <Scene key="balance" component={Balance} actives={actives} balanceHistory={balanceHistory} initial={true} currency={currency} title="balance" hideNavBar={true}
            tabBarComponent={NavBar2}/>
          <Scene key="accounts" component={Account} title="accounts" hideNavBar={true}
            tabBarComponent={NavBar3}/>
        </Scene>
      </Router>
    </ThemeProvider>

  );
}