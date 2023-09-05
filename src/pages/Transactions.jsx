import { useState } from 'react'
import SubscriptionPage from '../components/Subscriptions';
import TransactionsPage from '../components/Transactions';

const Transactions = () => {
  const [tab, setTab] = useState(true);
  return (
    <>
    <div className='flex items-center justify-center'>
      <button onClick={()=> setTab(true)} className={`${tab ? 'bg-orange-400 text-white' : 'bg-gray-100'} cursor-pointer px-2 py-1 rounded-l-md`}>Appointment</button>
   
      <button onClick={()=> setTab(false)} className={`${!tab ? 'bg-orange-400 text-white' : 'bg-gray-100'} cursor-pointer px-2 py-1 rounded-r-md`}>Subscription</button>
    </div>
    {
      tab ?
      <TransactionsPage/>
      :
      <SubscriptionPage/>
    }
      
    </>
    
  )
}

export default Transactions