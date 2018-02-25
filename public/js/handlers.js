function handleAddFriend(username) {
  $.ajax({
    type: 'POST',
    url: '/feed',
    data: JSON.stringify({ friendUsername: username }),
    contentType: 'application/json'
  });
}

function handleRemoveFriend(username) {
  $.ajax({
    type: 'DELETE',
    url: '/feed/' + username
  });
}