import React, { useState } from 'react';
import {Balance}  from './views/balance';
import { SafeAreaView, StatusBar, } from 'react-native';
import { Router, Scene } from 'react-native-router-flux'
import { Account } from './views/accounts';
import {Home} from './views/home';

export default function App() {
  return (
    <Router hideNavBar="true">
      <Scene key="root" tabs={false} hideNavBar={true}>
        <Scene key="feed" component={Home} currency="USD" title="feed"/>
        <Scene key="balance" component={Balance} currency="USD" title="balance" initial={true} />
        <Scene key="accounts" component={Account}  title="accounts" />
      </Scene>
    </Router>
  );
}