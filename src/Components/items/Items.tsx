import './items.css'
// props types coming Ballot component
type itemProp= {
    
    id: number,
    photoUrL: string,
    title: string
  
}[]

type IProps= {
    handleSelectedItem: (itemId: number, category: string) => void,
    items:itemProp,
    category: string,
    selectedItems: any
}
// es6 way of distructuring of props
const Items = ({items, category, selectedItems, handleSelectedItem}: IProps)=>{
    return(
        <div className="grid">
        {/* map items being sent from ballot component */}
            {items.map((item)=>{   
                return<div key={item.id} >
                    <h5>{item.title}</h5>
                    <img
                    src={item.photoUrL}
                     alt=""
                     />
                    <button className='itemButton' disabled={selectedItems[category]===item.id} onClick={()=>handleSelectedItem(item.id, category)}>Select Button</button>
                </div>
            })}
            
        </div>
    )
}
export default Items;