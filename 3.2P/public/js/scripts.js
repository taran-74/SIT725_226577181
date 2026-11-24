// Build a Materialize card for each book and add it to the page
const addCards = (items) => {
  items.forEach((item) => {
    const card =
      '<div class="col s12 m6 l4 center-align">' +
        '<div class="card hoverable">' +
          '<div class="card-image waves-effect waves-block waves-light">' +
            '<img class="activator" src="' + item.image + '" alt="' + item.title + ' cover">' +
          '</div>' +
          '<div class="card-content">' +
            '<span class="card-title activator grey-text text-darken-4">' + item.title +
              '<i class="material-icons right">more_vert</i></span>' +
            '<p class="author grey-text">by ' + item.author + '</p>' +
            '<p><a href="#">' + item.link + '</a></p>' +
          '</div>' +
          '<div class="card-reveal">' +
            '<span class="card-title grey-text text-darken-4">' + item.title +
              '<i class="material-icons right">close</i></span>' +
            '<p class="author grey-text">by ' + item.author + '</p>' +
            '<p class="card-text">' + item.description + '</p>' +
          '</div>' +
        '</div>' +
      '</div>';
    $('#card-section').append(card);
  });
};

// Call the GET REST endpoint on our Express server
const getBooks = () => {
  $.get('/api/books', (response) => {
    if (response.statusCode === 200) {
      addCards(response.data);
    }
  });
};

// Handle the "Suggest a Book" form in the modal
const submitForm = () => {
  const formData = {
    title: $('#bookTitle').val(),
    author: $('#bookAuthor').val(),
    reason: $('#bookReason').val()
  };
  console.log('Form data submitted:', formData);
  M.toast({ html: 'Thanks! "' + (formData.title || 'Your book') + '" was suggested.' });
  $('#suggestForm')[0].reset();
  M.Modal.getInstance($('#suggestModal')).close();
};

$(document).ready(function () {
  $('.modal').modal();
  $('#formSubmit').click(() => submitForm());
  getBooks();
});
