// Escape text before putting it into HTML (book data now comes from users via the database)
const escapeHtml = (value) => $('<div>').text(value == null ? '' : String(value)).html();

const stars = (rating) => {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    html += '<i class="material-icons">' + (i <= rating ? 'star' : 'star_border') + '</i>';
  }
  return html;
};

// Build a Materialize card for each book and add it to the page
const addCards = (items) => {
  $('#card-section').empty();
  $('#bookCount').text(items.length + (items.length === 1 ? ' book' : ' books') + ' in the database');
  if (items.length === 0) {
    $('#card-section').append('<p class="center-align grey-text empty-state col s12">No books found for this genre.</p>');
    return;
  }
  items.forEach((item) => {
    const title = escapeHtml(item.title);
    const card =
      '<div class="col s12 m6 l4 center-align">' +
        '<div class="card hoverable">' +
          '<div class="card-image waves-effect waves-block waves-light">' +
            '<img class="activator" src="' + escapeHtml(item.coverImage) + '" alt="' + title + ' cover">' +
          '</div>' +
          '<div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + title +
              '<i class="material-icons right">more_vert</i></span>' +
            '<p class="author grey-text">by ' + escapeHtml(item.author) + '</p>' +
            '<div class="stars">' + stars(item.rating) + '</div>' +
            '<div class="meta"><span class="chip">' + escapeHtml(item.genre) + '</span>' +
              '<span class="chip">' + escapeHtml(item.publishedYear) + '</span></div>' +
          '</div>' +
          '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + title +
              '<i class="material-icons right">close</i></span>' +
            '<p class="author grey-text">by ' + escapeHtml(item.author) + ' &middot; ' + escapeHtml(item.publishedYear) + '</p>' +
            '<p class="card-text">' + escapeHtml(item.summary) + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';
    $('#card-section').append(card);
  });
};

// GET books from the server (which reads them from MongoDB)
const getBooks = () => {
  const genre = $('#genreFilter').val();
  $.get('/api/books', genre ? { genre: genre } : {}, (response) => {
    if (response.statusCode === 200) addCards(response.data);
  }).fail(() => M.toast({ html: 'Could not load books. Are the server and MongoDB running?' }));
};

// Fill both genre dropdowns from the server's list
const getGenres = () => {
  $.get('/api/genres', (response) => {
    response.data.forEach((g) => {
      $('#genreFilter, #genre').append($('<option>').val(g).text(g));
    });
  });
};

// POST the form to the server, which validates it and saves it in MongoDB
const submitForm = () => {
  const formData = {
    title: $('#title').val(),
    author: $('#author').val(),
    genre: $('#genre').val(),
    publishedYear: $('#publishedYear').val(),
    rating: $('#rating').val(),
    summary: $('#summary').val()
  };
  $('#formError').text('');
  $.ajax({
    url: '/api/books',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(formData),
    success: (response) => {
      M.toast({ html: escapeHtml(response.data.title) + ' saved to the database!' });
      $('#addForm')[0].reset();
      M.updateTextFields();
      M.Modal.getInstance($('#addModal')).close();
      getBooks();
    },
    error: (xhr) => {
      const msg = (xhr.responseJSON && xhr.responseJSON.message) || 'Could not save the book.';
      $('#formError').text(msg);
    }
  });
};

$(document).ready(function () {
  $('.modal').modal();
  $('#formSubmit').click(() => submitForm());
  $('#genreFilter').change(() => getBooks());
  getGenres();
  getBooks();
});
