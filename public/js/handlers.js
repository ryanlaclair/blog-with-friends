function handleAddFriend(user) {
  $.ajax({
    type: 'POST',
    url: '/feed',
    data: JSON.stringify({ user: user }),
    contentType: 'application/json'
  });
}

function handleRemoveFriend(user) {
  $.ajax({
    type: 'DELETE',
    url: '/feed/' + user
  });
}

function handleDeleteBlog(user, blog) {
  $.ajax({
    type: 'DELETE',
    url: '/' + user + '/blogs/' + blog,
    success: (data, status, xhr) => {
      window.location = data.redirect;
    }
  });
}