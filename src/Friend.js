import Button from "./Button";

export default function Friend({friend, onFriendSelected, selectedFriend}) {
    const isSelected = selectedFriend === friend

    return <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt={friend.name}/>
        <h3>{friend.name}</h3>
        {friend.balance < 0 && <p className="red">You owe {friend.name} ${Math.abs(friend.balance)} </p>}
        {friend.balance > 0 && <p className="green">{friend.name} owes you ${friend.balance} </p>}
        {friend.balance === 0 && <p>You and {friend.name} are even </p>}
        <Button onClick={() => onFriendSelected(isSelected ? null : friend)}>{isSelected ? "Close" : "Select"}</Button>
    </li>;
}