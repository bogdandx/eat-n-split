import {useState} from "react";
import Button from "./Button";
import FriendsList from "./FriendsList";
import FormSplitBill from "./FormSplitBill";
import FormAddFriend from "./FormAddFriend";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

export default function App() {
    const [addFriendMode, setAddFriendMode] = useState(false)
    const [friends, setFriends] = useState(initialFriends)
    const [selectedFriend, setSelectedFriend] = useState(null);

    function handleAddFriendClick() {
        setAddFriendMode((currentMode) => !currentMode);
    }

    function handleNewFriendAdded(newFriend) {
        setFriends((crtFriends) => [...crtFriends, newFriend])

        setAddFriendMode(false);
    }

    function handleFriendSelected(friend) {
        setSelectedFriend(friend);

        setAddFriendMode(false);
    }

    function handleSplitBill(value) {
        setFriends(crtFriends => crtFriends.map(f => f.id !== selectedFriend.id ? f :
            {
                ...f,
                balance: f.balance + value
            }))

        setSelectedFriend(null);
    }

    return <div className="app">
        <div className="sidebar">
            <FriendsList
                friends={friends}
                onFriendSelected={handleFriendSelected}
                selectedFriend={selectedFriend}>
            </FriendsList>
            {addFriendMode && <FormAddFriend onNewFriendAdded={handleNewFriendAdded}/>}
            <Button onClick={() => handleAddFriendClick()}>{addFriendMode ? "Close" : "Add friend"}</Button>
        </div>

        {selectedFriend && <FormSplitBill friend={selectedFriend} onSplitBill={handleSplitBill}/>}
    </div>
}

