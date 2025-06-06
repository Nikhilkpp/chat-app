import React, { useEffect, useRef } from 'react'
import Message from './Message'
import useConversation from '../../../zustand/useConversation'
import { useGetMessages } from '../../../hooks/useGetMessages'
import messageSkeleton from '../skeletons/messageSkeleton'

function Messages() {
	const {messages, loading} =useGetMessages();
	// console.log(messages)
	const lastMessageRef= useRef();
	useEffect(() => {
		setTimeout(()=>{
			lastMessageRef.current?.scrollIntoView ({behavior :"smooth"});
		},100)
		

	}, [messages])
	

  return (
    <div className='px-4 flex-1 overflow-auto'>
 			{!loading && messages.length===0 && (<p className='text-center'>Send a message to start the conversation</p>)}
			{loading && [...Array(5)].map((_,idx) => <messageSkeleton key={idx}/>)}

			{!loading && messages.length >0 && messages.map((m) => (
				<div key={m._id}
					ref={lastMessageRef}
				>
					<Message  message={m}/>

				</div>
			))}

 		</div>
  )
}

export default Messages