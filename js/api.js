
const errorMessage = document.getElementById('error-message');
errorMessage.style.display = 'none';

const showData = data => {

    if (data.numFound === 0) {
        errorMessage.style.display = 'block';
    }
    
    else {
        errorMessage.style.display = 'none';
        const totalResult = data.numFound;
        document.getElementById('results').innerText = `Showing ${data.docs.length} of Total ${totalResult} Results`;

        data.docs.forEach(element => {
            let bookName = element.title;
            if (bookName === undefined) {
                bookName = 'Unknown';
            }

            let authorName = element.author_name;
            let authorString = '';
            if (authorName === undefined) {
                authorName = 'Unknown';
                authorString = 'Unknown';
            }

            else {
                authorName.forEach((element, index) => {
                    if (index !== authorName.length - 1) {
                        authorString += element + ', ';
                    }
                    
                    else {
                        authorString += element;
                    }
                })
            }

            let firstPublished = element.first_publish_year;
            if (firstPublished === undefined) {
                firstPublished = 'Unknown';
            }
            
            let coverPicture = element.cover_i;
            if (coverPicture === undefined) {
                coverPicture = '';
            }

            const urlCover = `https://covers.openlibrary.org/b/id/${coverPicture}-M.jpg`;

            const bookContainer = document.getElementById('book-container');
            const createDiv = document.createElement('div');
            createDiv.classList.add('col-3');
            createDiv.innerHTML = `
            <div>
            <div class="d-flex justify-content-center image-size">
            <img src=${urlCover} class="w-100 bg-dark" alt="Book Cover">
            </div>
            <p><span>Book Name</span><span class="d-block">${bookName}</span></p>
            <p><span class="d-block">Author Name</span><span class="d-block">${authorString}</span></p>
            <p><span>First Published</span><span class="d-block">${firstPublished}</span></p>
            </div>
            `;
            bookContainer.appendChild(createDiv);
        });
    }
}


const apiCall = searchKey => {
    fetch(`https://openlibrary.org/search.json?q=${searchKey.value}`)
    .then(response => response.json())
    .then(data => showData(data));
}

document.getElementById('api-call').addEventListener('click', () => {
    const searchKey = document.getElementById('search-key');
    apiCall(searchKey);
});