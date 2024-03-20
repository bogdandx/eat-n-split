import Friend from "./Friend";

export default function FriendsList({friends, onFriendSelected, selectedFriend}) {
    return <ul>
        {friends.map(friend => <Friend friend={friend} key={friend.id} onFriendSelected={onFriendSelected}
                                       selectedFriend={selectedFriend}/>)}
    </ul>;
}