import {useState} from "react";
import Button from "./Button";

export default function FormSplitBill({friend, onSplitBill}) {
    const [bill, setBill] = useState('');
    const [paidByUser, setPayByUser] = useState('');
    const paidByFriend = bill ? bill - paidByUser : '';

    const [whoIsPaying, setWhoIsPaying] = useState("user");

    function handleSubmit(e) {
        e.preventDefault();

        if (!bill || !paidByUser) return;

        onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByUser)
    }

    return <form className="form-split-bill" onSubmit={(e) => handleSubmit(e)}>
        <h2>Split a bill with {friend.name}</h2>

        <label>💰Bill value</label>
        <input type="text" value={bill} onChange={(e) => setBill(Number(e.target.value))}/>

        <label>🕴️Your expense</label>
        <input type="text" value={paidByUser ?? ''}
               onChange={(e) => setPayByUser(Number(e.target.value) > bill ? paidByUser : Number(e.target.value))}/>

        <label>🧑‍🤝‍🧑{friend.name}'s expense</label>
        <input type="text" value={paidByFriend} disabled/>

        <label>🤑Who is paying the bill?</label>
        <select value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
            <option value='user'>You</option>
            <option value='friend'>{friend.name}</option>
        </select>

        <Button>Add</Button>
    </form>
}