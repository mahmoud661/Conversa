'use client'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import man from './media/man.png'
import Friend from './components/friend'
export default function Home() {

let friends = ["mahmoud" , "ahmad" , "abd" ]
const [selected, setSelected] = React.useState(null);
const [selected_friend, setSelected_friend] = React.useState({
  name:'',
  avatar:''
});
const [emojiVisibale, setemojiVisibale] = React.useState(false);


function select(index) {
  setSelected(index)
  setSelected_friend({
    name:friends[index],
    avatar:"man.src"
  })
}


  return (
<div>

<div className='main-structure'>

  <div className='main-divs friend_list'>

    <div className='friend_list_div'>

      {friends.map((friend, index) => (
  <Friend
    name={friend}
    avatar={man.src}
    selected= {selected === index }
    select={() => select(index)}  
    key={index}
  ></Friend>
))}
  
      
    </div>

    <div className='friend_list_profile' >
      <div className='avatar'><img height={64} width={64} src={man.src}/></div>
        <p>Mahmoud Hassan</p>
    </div>

  </div>

  <div className='main-divs chat'>

    <div className='chat_details'>
        <img height={48} width={48} src={man.src}/>
        <p>{selected_friend.name}</p>
    </div>

    <div className='chat_space'>
      <p className='friend_message'>friend</p>
      <p className='user_message'>user</p>
      <p className='user_message'>user</p>
      <p className='friend_message'>friend</p>
      <p className='user_message'>usdsfkndflsdner</p>
      <p className='friend_message'>frkdsnfsiend</p>
      <p className='user_message'>user</p>
      <p className='friend_message'>friend</p>
      <p className='friend_message'>frieksfnkdsfnd</p>
      <p className='friend_message'>friend</p>
    </div>
    <div className='chat_typing'>
        <button className='emoji'>E</button>
        <input className="text_input balck" type='text'/>
        <button className='go_btn'>{"->"}</button>
    </div>
  </div>


</div>
</div>
  )
}
