import React from 'react'
import { useAuthContext } from '../../contexts/AuthContext'
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

function Message({message}) {
  const {authUser} = useAuthContext();
  const {selectedConversation} = useConversation();
  const fromMe = message.senderId === authUser._id;
  const chatClassName =fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser.profilePic :selectedConversation?.profilePic;
  const bubbleBgColor= fromMe ?'bg-blue-300' : "bg-gray-600";
  const formattedTime=extractTime(message.createdAt)
 
  const shouldShake = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
        <div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='photo' src={profilePic} />
				</div>
        </div>
        <div className={`chat-bubble text-black ${shouldShake} ${bubbleBgColor} pb-2`}>{message.message}</div>
        <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message