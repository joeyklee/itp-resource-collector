var Component = require('choo/component')
var html = require('choo/html')
  // your store comes from index :)

class ImageSelection extends Component {
  constructor(name, state, emit) {
    super(name);

    this.state = state;
    this.emit = emit;

    this.test = this.test.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.local = this.state.components[name] = {}

    this.style = `
    *{
      box-sizing:border-box;
      margin:0;
    }
    img{
      width:300px;
      height:auto;
    }
    `

    this.getImages();
  }

  getImages(){
    browser.tabs.query({
      active: true,
      windowId: browser.windows.WINDOW_ID_CURRENT
    }, (tab) => {
      browser.tabs.sendMessage(tab[0].id, {
          method: "getDOM"
        },
        (response) => {
          console.log(response);
          // console.log("hello!!")
          this.emit("pageStore:getDOM", response)
        });
    });
  }

  update() {
    return true
  }

  test() {
    // this.emit('countStore:increment', 1);
    console.log("hello")
  }


  selectImage(e){
    // e.preventDefault();

    // let sel = e.target.dataset['src'];
    let sel = e.target.src;
    console.log("select image",sel)
    this.emit("newResource:addImage", sel)
  }

  createElement() {
    return html `
    <div class="w-100 flex flex-column items-center">
      <div class="w-100 tc">
        <h2>Select a cover image</h2>
      </div>
      <div class="w-100 flex flex-wrap flex-column">
      ${this.state.page.imageLinks.map( (imgLink) => html`
        <a class="h4 flex flex-column items-center pa1 grow glow" href="/tag">
          <img class="h-100" alt="..." src=${imgLink} onclick=${this.selectImage}>
        </a>
          `) }
      </div>
    </div>
    `
  }
}
//
// width:100px; height:100px;
// <div class="cover bg-center w-100 h-100" style="background-image:url('${imgLink}')" onclick=${this.selectImage} data-src="${imgLink}"></div>

module.exports = ImageSelection;
