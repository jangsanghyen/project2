import './App.css';
import { useState } from 'react'
import TabItem from './TabItem';
import TabBar from './TabBar';
import InDelivery from './tab/InDelivery';
import DeliveryRequest from './tab/DeliveryRequest';

console.log(process.env.REACT_APP_ENDPOINT)
console.log(process.env.NODE_ENV)

function App() {
  const [currentTab, setCurrentTab] = useState("배달중")

  return (
    <div className="app">
      <TabItem title="배달중" visible={currentTab === '배달중'}>
        <InDelivery />
      </TabItem>
      <TabItem title="배달 요청" visible={currentTab === '배달 요청'}>
        <DeliveryRequest />
      </TabItem>
      <TabBar onChange={setCurrentTab} currentTab={currentTab}>
        <TabBar.Item label="배달중" icon="compass-point"></TabBar.Item>
        <TabBar.Item label="배달 요청" icon="text-list"></TabBar.Item>
      </TabBar>
    </div>
  );
}

export default App;
