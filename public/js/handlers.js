function handleAddFriend(user) {
  $.ajax({
    type: 'POST',
    url: '/feed',
    data: JSON.stringify({ user: user }),
    contentType: 'application/json',
    success: (data, status, xhr) => {
      window.location = data.redirect;
    }
  });
}

function handleRemoveFriend(user) {
  $.ajax({
    type: 'DELETE',
    url: '/feed/' + user,
    success: (data, status, xhr) => {
      window.location = data.redirect;
    }
  });
}

function handleCreateBlog(user) {
  $.ajax({
    type: 'POST',
    url: '/' + user + '/blogs',
    data: JSON.stringify({ 
      title: $('#title').val(),
      body: $('#body').val(),
      keywords: $('#keywords').val()
    }),
    contentType: 'application/json',
    success: (data, status, xhr) => {
      window.location = data.redirect;
    }
  });
}

function handleEditBlog(user, blog) {
  $.ajax({
    type: 'PUT',
    url: '/' + user + '/blogs/' + blog,
    data: JSON.stringify({ 
      title: $('#title').val(),
      body: $('#body').val(),
      keywords: $('#keywords').val()
    }),
    contentType: 'application/json',
    success: (data, status, xhr) => {
      window.location = data.redirect;
    }
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