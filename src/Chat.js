import React, { useEffect, useState } from "react";

function Chat({ socket, username, room }) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMassage = async () => {
        if (currentMessage !== "") {
            const MessageData = {
                room: room,
                username: username,
                message: currentMessage,
                time: new Date(),
            };

            await socket.emit("newMessage", MessageData);
            setMessageList((list) => [...list, MessageData]);
        }
    };

    useEffect(() => {
        socket.on("onMessage", (data) => {
            console.log(data);
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

    useEffect(() => {
        socket.on("roomCreated", (data) => {
            console.log(data);
        });
    }, [socket]);

    return (
        <div className="chat">
            <div className="chat-footer">
                <p>Schizo chat</p>
                <input
                    type="text"
                    placeholder="start toxicity"
                    onChange={(e) => setCurrentMessage(e.target.value)}
                />
                <button onClick={sendMassage}>&#9658;</button>
            </div>
            <div className="chat-window">
                {messageList.map((MessageData) => {
                    return (
                        <div className="message-body">
                            <div className="msg-header">
                                <p className="nik">
                                    Name: {MessageData.username}
                                </p>
                                <p className="datetime">
                                    At: {JSON.stringify(MessageData.time)}
                                </p>
                            </div>
                            <p className="message-text">
                                Says: {MessageData.message}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default Chat;
