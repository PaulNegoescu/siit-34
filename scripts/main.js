fetch('https://jsonplaceholder.typicode.com/posts')
  .then((res) => res.json())
  .then(doSomethingWithData);

function handleResponse(res) {
  return res.json();
}

function doSomethingWithData(data) {
  for (const post of data) {
    const link = document.createElement('a');
    link.href = `postDetails.html?postId=${post.id}`;
    link.textContent = post.title;

    document.body.append(link);
  }
}
