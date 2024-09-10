import { usePage } from '@inertiajs/react';
import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const ChatLayout = ({children}) => {
    const page=usePage();
    const conversation=page.props.conversation;
    const selectedConversation=page.props.selectedConversation;
    console.log("conversation", conversation);
    console.log("selectedConversation", selectedConversation);
    
  return (
    <AuthenticatedLayout>
        ChatLayout
        {children}    
    </AuthenticatedLayout>
  )
}
export default ChatLayout;