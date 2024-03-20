import {useState} from "react";

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

    function handleAddFriendClick() {
        setAddFriendMode((currentMode) => !currentMode);
    }

    function handleNewFriendAdded(newFriend){
        setFriends((crtFriends) => [...crtFriends, newFriend])

        setAddFriendMode(false)
    }

    return <div className="app">
        <div className="sidebar">
            <FriendsList friends={friends}>List</FriendsList>
            {addFriendMode && <FormAddFriend onNewFriendAdded={handleNewFriendAdded}/>}
            <Button onClick={() => handleAddFriendClick()}>{addFriendMode ? "Close" : "Add friend"}</Button>
        </div>

        <FormSplitBill />
    </div>
}

function FriendsList({friends}) {
    return <ul>
        {friends.map(friend => <Friend friend={friend} key={friend.id}/>)}
    </ul>;
}

function Friend({friend}) {
    return <li>
        <img src={friend.image} alt={friend.name}/>
        <h3>{friend.name}</h3>
        {friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)} </p>}
        {friend.balance > 0 && <p className="green">{friend.name} owes you ${friend.balance} </p>}
        {friend.balance === 0 && <p>You and {friend.name} are even </p>}
        <Button>Select</Button>
    </li>;
}

function Button({children, onClick}) {
    return <button className="button" onClick={onClick}>{children}</button>
}

function FormAddFriend({onNewFriendAdded}) {
    const [name, setName] = useState('');
    const [image, setImage] = useState('https://i.pravatar.cc/48');

    function handleSubmit(e) {
        e.preventDefault();

        if (!name || !image) {
            return;
        }

        const id = crypto.randomUUID();
        const newFriend = {
            name,
            image: `${image}?u=${id}`,
            balance: 0,
            id
        };

        onNewFriendAdded(newFriend)

        setName('')
        setImage('https://i.pravatar.cc/48')
    }

    return <form className="form-add-friend" onSubmit={handleSubmit}>
        <label>🧑‍🤝‍🧑Friend name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        <label>🖼️️Image URL</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)}/>
        <Button>Add</Button>
    </form>
}

function FormSplitBill() {
    return <form className="form-split-bill">
        <h2>Split a bill with X</h2>

        <label>💰Bill value</label>
        <input type="text"/>

        <label>🕴️Your expense</label>
        <input type="text"/>

        <label>🧑‍🤝‍🧑X's expense</label>
        <input type="text" disabled/>

        <label>🤑Who is paying the bill?</label>
        <select>
            <option value='user'>You</option>
            <option value='friend'>X</option>
        </select>

        <Button>Add</Button>
    </form>
}