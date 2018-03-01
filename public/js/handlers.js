// Ryan LaClair
// MET CS602 - Server Side Web Development
// Final Project

// Handle adding a friend to a user feed.
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

// Handle removing a friend from the user feed.
function handleRemoveFriend(user) {
  $.ajax({
    type: 'DELETE',
    url: '/feed/' + user,
    success: (data, status, xhr) => {
      window.location = data.redirect;
    }
  });
}

// Handle creating a new blog post.
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

// Handle editing a blog post.
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

// Handle deleting a blog post.
function handleDeleteBlog(user, blog) {
  $.ajax({
    type: 'DELETE',
    url: '/' + user + '/blogs/' + blog,
    success: (data, status, xhr) => {
      window.location = data.redirect;
    }
  });
}