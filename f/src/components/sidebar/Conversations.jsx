import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../hooks/useGetConversations'

function Conversations() {

	const {loading ,conversations} = useGetConversations();
	console.log("Conversations:=>" ,conversations)

  return (
        <div className='py-2 flex flex-col overflow-auto'>
			
			{conversations.map((c,idx) => {
				return(
				<Conversation 
				 	key={c._id}
					conversation={c}
					lastIdx={idx === conversations.length -1}
					/>)
			})}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}

		</div>
  )
}

export default Conversations