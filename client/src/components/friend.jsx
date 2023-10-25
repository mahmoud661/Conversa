import './friend.css'
export default function Friend(props){

return(

    <button className={`friend ${props.selected ? 'selected_friend' : ''}`}
      onClick={props.select}>
        <div className='avatar'><img height={48} width={48} src={props.avatar} alt=''/></div>
        <p>{props.name}</p>
      </button>

)


}