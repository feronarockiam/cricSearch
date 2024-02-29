const auto_suggest = () => {
  console.log("in js");
  const input = document.getElementById('searchInp').value;
  console.log(input);
  if (input !== undefined) {
      // Show loading message
      document.getElementById('searchResults').style.display = 'block';
      document.getElementById('searchResultsContent').innerHTML = 'Loading...';

      axios.post('/search', { query: input })
          .then(response => {
              console.log(response);
              // Handle the response data
              console.log(response.data);
              console.log(response.data.template.graph_answer.payload.center_panel.data[0].snippet_content[0].answer_fragment);
              // Update the HTML page with the response data
              displaySearchResults(response.data);
          })
          .catch(error => {
              console.error('Axios error:', error);
              // Hide search results in case of error
              document.getElementById('searchResults').style.display = 'none';
          });
  }
}

// Function to display search results on the HTML page
const displaySearchResults = (data) => {
  const searchResultsContent = document.getElementById('searchResultsContent');
  // Construct the HTML content to display all the information
  let htmlContent = '';
  htmlContent += `<p>${data.template.graph_answer.payload.center_panel.data[0].snippet_content[0].answer_fragment}</p>\n<strong>REFERENCE</strong>`;
  htmlContent += `<p>${data.template.graph_answer.payload.center_panel.data[0].snippet_content[0].sources[0].title}</p>`;
  htmlContent += `<a href="${data.template.graph_answer.payload.center_panel.data[0].snippet_content[0].sources[0].url}">Link</a>`;
  // Update the content with the constructed HTML
  searchResultsContent.innerHTML = htmlContent;
}
