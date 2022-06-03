import {useEffect, useState} from 'react';
import Items from '../items/Items'
import Modal from '../modal/Modal';
import api from '../../Api/Api';
import './ballot.css'
// This is structure of our props type data serving from our backend api
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
  // All states require to build this application 
  const [ballots, setBallots] = useState<fetchDataProp[]>([]);
  const [selectedItems, setSelectedItems] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  //function created outside useEffect hook, so to make the code readable and to observe best practices
  const fetchData = async () =>{
         const data = await api.getBallotData()
         setBallots(data.items)
  }
  useEffect(()=>{
    fetchData()
  }, [])
//handleSelectedItem need both item id and category to be selected
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
      {/* only map ballot only if the are available */}
        {ballots.length > 0 && ballots.map((ballot)=>{
    return <div key={ballot.id}>
      <h4>{ballot.title}</h4>
      {/* props needed by Item component are being passed */}
      <Items items = {ballot.items} handleSelectedItem ={handleSelectedItem} selectedItems={selectedItems} category={ballot.title}/>
    </div>
  })}
   
  <div className='buttonDiv'>
  <button className="btnSubmit"
  // This is where submit will be activated when click
        onClick={() => {
          setShowModal(true);
        }}>Submit</button>
  {/* modal props are being passed here*/}
  <Modal title='Vote Submitted Successfully' active={showModal}
        close={closeShowModal}/>
  </div>
  </div>
    </>
  )
}

export default Ballot;