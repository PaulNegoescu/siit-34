fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => res.json())
  .then(doSomethingWithData);

function handleResponse(res) {
  return res.json();
}

function doSomethingWithData(data) {
  for (const post of data) {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = post.title;

    document.body.append(link);
  }
}

document
  .querySelector('[data-add-post]')
  .addEventListener('click', handleAddPost);

function handleAddPost(e) {
  e.preventDefault();

  fetch('https://jsonplaceholder.typicode.com/posts/1', {
    method: 'PATCH',
    body: 'title=Pauls test',
    headers: {
      'Content-type': 'application/x-www-form-urlencoded',
    },
  })
    .then((res) => res.json())
    .then(console.log);
}
