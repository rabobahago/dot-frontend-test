import {useEffect, useState} from 'react';
import Items from '../items/Items'
import Modal from '../modal/Modal';
import api from '../../Api/Api';
import './ballot.css'

type fetchDataProp = {
  title: string,
  id: number,
    items: {
      id: number,
      photoUrL: string,
      title: string
    }[],
}

const Ballot = () => {
  const [ballots, setBallots] = useState<fetchDataProp[]>([]);
  const [selectedItems, setSelectedItems] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const fetchData = async () =>{
         const data = await api.getBallotData()
         setBallots(data.items)
  }
  useEffect(()=>{
    fetchData()
  }, [])

  const handleSelectedItem = (itemId:number, category: string) => {
    setSelectedItems((prev: () => void)=>({ 
      ...prev,
      [category]: itemId,
    }))
  }
  const closeShowModal = () => setShowModal(false);
  return (
    <>
    <div className="container">
      <div className="headerStyle">
      <h1>Golden Global Awards</h1>  
      </div> 
        {ballots.length > 0 && ballots.map((ballot)=>{
    return <div key={ballot.id}>
      <h4>{ballot.title}</h4>
      <Items items = {ballot.items} handleSelectedItem ={handleSelectedItem} selectedItems={selectedItems} category={ballot.title}/>
    </div>
  })}
   
  <div className='buttonDiv'>
  <button className="btnSubmit"
        onClick={() => {
          setShowModal(true);
        }}>Submit</button>
  <Modal title='Vote Submitted Successfully' active={showModal}
        close={closeShowModal}/>
  </div>
  </div>
    </>
  )
}

export default Ballot;