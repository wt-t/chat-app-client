import { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://192.168.1.2:3001/");

function App() {
    const [username, setUsername] = useState("");
    const [room, setRoom] = useState("");
    const [showChat, setShowChat] = useState(false);

    // const handleNewMessage = (message) => {
    //     socket.emit("onNewMessage", { data: message.value });
    // };

    const joinRoom = () => {
        if (username && room) {
            socket.emit("createRoom", room);
            setShowChat(true);
        }
    };
    return (
        <div className="App">
            {!showChat ? (
                <div>
                    <h3>Join a Room</h3>
                    <input
                        type="text"
                        placeholder="Room id"
                        onChange={(e) => {
                            setRoom(e.target.value);
                        }}
                    />
                    <input
                        type="text"
                        placeholder="Username"
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <button onClick={joinRoom}>Join</button>
                </div>
            ) : (
                <Chat socket={socket} username={username} room={room} />
            )}
        </div>
    );
}

export default App;
