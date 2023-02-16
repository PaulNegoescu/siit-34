const urlParams = new URLSearchParams(location.search);
const postId = urlParams.get('postId');

const titleContainer = document.querySelector('[data-title]');
const bodyContainer = document.querySelector('[data-body]');
titleContainer.classList.add('loading');
bodyContainer.classList.add('loading');

fetch(`http://jsonplaceholder.typicode.com/posts/${postId}`)
  .then((res) => res.json())
  .then((post) => {
    titleContainer.classList.remove('loading');
    bodyContainer.classList.remove('loading');
    titleContainer.innerText = post.title;
    bodyContainer.innerText = post.body;
  });

fetch(`http://jsonplaceholder.typicode.com/comments?postId=${postId}`)
  .then((res) => res.json())
  .then(handleComments);

const list = document.querySelector('[data-comments]');
function handleComments(comments) {
  for (const comment of comments) {
    renderComment(comment);
  }
}

document
  .querySelector('[data-comment-form]')
  .addEventListener('submit', handleAddComment);

function renderComment(comment) {
  const dt = document.createElement('dt');
  const dd = document.createElement('dd');
  list.append(dt, dd);

  dt.innerText = comment.email;
  dd.innerText = comment.body;
}

async function handleAddComment(e) {
  e.preventDefault();
  const inputs = e.target.elements;

  const comment = await fetch(`http://jsonplaceholder.typicode.com/comments`, {
    method: 'POST',
    body: JSON.stringify({
      postId: postId,
      name: inputs.name.value,
      body: inputs.body.value,
      email: inputs.email.value,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => res.json());

  // console.log(comment);
  renderComment(comment);
}
