import React, {useEffect, useState, useContext, useMemo} from 'react'
import { UserContext } from '../../App'
import { MainLayout } from '../../styles/Layouts'
import Orb from '../../components/Orb/Orb'
import Navigation from '../../components/Navigation/Navigation'
import Dashboard from '../../components/Dashboard/Dashboard';
import Income from '../../components/Income/Income'
import Expenses from '../../components/Expenses/Expenses';
import { useGlobalContext } from '../../context/globalContext';

export default function Profile() {
  const [mypics, setPics] = useState([])
  const {state, dispatch} = useContext(UserContext)
  useEffect(()=>{
    fetch('http://localhost:5000/mypost', {
      headers:{
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
    }).then(res=>res.json())
    .then(result=>{
      setPics(result.mypost)
    })
  },[])

  

  const global = useGlobalContext()
  console.log(global);

 

  const [active, setActive] = useState(1)
  
  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4:
        return <Expenses />
      default:
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  }, [])


  return (
    <div>
    <div className='expense'>
    {orbMemo}
      <MainLayout>
        <Navigation active={active} setActive={setActive} />
        <main>
          {displayData()}
        </main>
      </MainLayout>
    </div>
    </div>

     
      
    
  )
}
