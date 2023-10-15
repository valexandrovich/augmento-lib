import "https://ajax.googleapis.com/ajax/libs/model-viewer/3.3.0/model-viewer.min.js";


function tst(params) {
  console.log('test')
}


class AugmentoViewer extends HTMLElement {
  constructor() {
    super();
  }

  fetchData(modelId) {
    return new Promise((resolve, reject) => {

      var requestOptions = {
        method: 'GET',
        headers: {
          'Origin': 'localhost:8080'
        },
        redirect: 'follow'
    };

      fetch("https://prod.augmento.com/v2/products/" + modelId, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Can't fetch model from augmento!");
          }
          return response.json();
        })
        .then((data) => {
          const metadata = data.data;
          resolve(metadata); 
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          reject(error); 
        });
    });
  }

  async connectedCallback() {
    const modelId = this.getAttribute("model-id");
    let metadata = await this.fetchData(modelId);



    const shadow = this.attachShadow({ mode: "open" });


    const modelViewer = document.createElement("model-viewer");

    modelViewer.setAttribute("src", metadata.model.url);
    modelViewer.setAttribute("poster", metadata.image.url);

    modelViewer.setAttribute('camera-controls', '')

    // modelViewer.setAttribute("reveal", "interaction");
    modelViewer.setAttribute("ar", "");


    shadow.appendChild(modelViewer)

    // Create the button element
    const arButton = document.createElement("button");
    arButton.setAttribute('slot', 'ar-button');
    arButton.style.display = 'flex';
    arButton.style.flexDirection = 'row';
    arButton.style.alignItems = 'center';
    arButton.style.justifyContent = 'center';
    arButton.style.backgroundColor = 'rgb(26, 84, 192)';
    arButton.style.color = 'white';
    arButton.style.padding = '10px';
    arButton.style.borderRadius = '7px';
    arButton.style.border = 'none';

    // // Create the SVG element

    
    // const icon = document.createElement('img')
    // icon.setAttribute('src', '/img/ar-icon.png')
    // icon.setAttribute('width', '20px')
    // icon.setAttribute('height', '20px')

    // // Create the span element
    const span = document.createElement('span');
    span.textContent = 'Show in AR';
    span.style.paddingLeft = '7px';

    

    // // Append the SVG and span to the button
    arButton.appendChild(icon);
    arButton.appendChild(span);

    // Append the button to the desired parent element
    modelViewer.appendChild(arButton);
    // shadow.appendChild(modelViewer);

    // console.log('modelID: ' + modelId)

    // fetch("https://prod.augmento.com/v2/products/" + modelId)
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Can't fetch model from augmento!");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     // Handle the data from the response
    //     metadata = data.data
    //   })
    //   .catch((error) => {
    //     // Handle any errors that occurred during the fetch
    //     console.error("Fetch error:", error);
    //   });

    //   console.log(metadata)

    // if (metadata.id) {
    // console.log("building");
    // const shadow = this.attachShadow({ mode: "open" });
    // const div = document.createElement("div");
    // div.textContent = "asdad";
    // shadow.appendChild(div);
    // }

    // const shadow = this.attachShadow({ mode: "open" });

    // const modelViewerElement = document.createElement('model-viewer')
    // rootDiv.setAttribute('class', 'wrapper')
    // rootDiv.textContent = 'model id  : ' + modelId

    // const style = document.createElement("style");
    // style.textContent = '.wrapper {background-color: red}';
    // shadow.appendChild(style)
  }

  disconnectedCallback() {
    // console.log("Custom element removed from page.");
  }

  adoptedCallback() {
    // console.log("Custom element moved to new page.");
  }

  // Element functionality written in here



}

customElements.define("augmento-viewer", AugmentoViewer);
