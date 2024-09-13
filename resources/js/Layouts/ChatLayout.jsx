import { usePage } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const ChatLayout = ({ children }) => {
    const page = usePage();
    const conversation = page.props.conversation;
    const selectedConversation = page.props.selectedConversation;
    const [onlineUsers, setOnlineUsers] = useState({});
    const [localConversations, setLocalConversations] = useState(conversation);
    const [sortedConversations, setSortedConversations] =
        useState(conversation);

    const isUserOnline = () => onlineUsers[userId];

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                if (a.blocked && b.blocked) {
                    return a.blocked > b.blocked ? 1 : -1;
                } else if (a.blocked) {
                    return 1;
                } else if (b.blocked) {
                    return -1;
                }
                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localCompare(
                        b.last_message_date
                    );
                } else if (a.last_message_date) {
                    return -1;
                } else if (b.last_message_date) {
                    return 1;
                } else {
                    return 0;
                }
            })
        );
    }, [localConversations]);

    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                const onlineUserObj = Object.fromEntries(
                    users.map((user) => [user.id, user])
                );
                setOnlineUsers((prevOnlineUsers) => {
                    return { ...prevOnlineUsers, ...onlineUserObj };
                });
            })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updateUsers = { ...prevOnlineUsers };
                    updateUsers[user.id] = user;
                    return updateUsers;
                });
                console.log("joining", user);
            })
            .leaving((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updateUsers = { ...prevOnlineUsers };
                    delete updateUsers[user.id];
                    return updateUsers;
                });
            })
            .error((error) => {
                console.log("error", error);
            });

        return () => {
            Echo.leave("online");
        };
    }, []);

    return (
        <>
            ChatLayout
            {children}
        </>
    );
};
export default ChatLayout;
