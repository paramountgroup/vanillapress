var wysiwyg = require('wysiwyg');
var editor = {
  //posts: get_posts(),
  loadMenu: function(){
    editor.clearMenus();
    editor.showCurrentMenu();
  },
  showCurrentMenu: function() {

    var urlSegments = getAfterHash();
    var currentMenu;

    //if url #edit/
    if( urlSegments[0] == "edit" && urlSegments.length == 1  ) {
      currentMenu = "primary";
      this.showPrimaryMenu();
    }
    //if url #edit/secondary
    if( urlSegments[0] == "edit" && urlSegments.length == 2 ) {
      currentMenu = "secondary";
      this.showSecondaryMenu();
    }
    //if editing content
    if( urlSegments[0] == "edit" && urlSegments.length == 3 ) {
      currentMenu = "edit";
      this.showEditPanel(urlSegments[2], urlSegments[1]);
    }

    var queryCurrentNav = "#editor nav." + currentMenu;
    var currentNav = document.querySelector(queryCurrentNav);
    currentNav.classList.add("active");

    // var currentUl = document.querySelector(queryStr + " ul");
    // var currentLinks = currentUl.getElementsByTagName("a");
    // for (var i = 0; i < currentLinks.length; i++) {
    //   currentLinks[i].addEventListener("click", refreshMenu(), false);
    // }

  },
  showPrimaryMenu: function(){

  },
  showSecondaryMenu: function(){
    this.updateMenuTitle();
    //figure out what secondary navigation we're loading
    var currentSecondaryMenu = getAfterHash()[1];
    var menuItems = getContent(currentSecondaryMenu);
    addMenuItems(menuItems, currentSecondaryMenu);
  },
  showEditPanel: function(slug, contentType){
    this.updateMenuTitle();
    var itt;
    var post = getContentBySlug(slug, contentType);
    if( contentType == "posts" || contentType == "pages" ) {
        this.fillEditForm(post);
    }
  },
  fillEditForm: function(post) {
    var editTitle = document.getElementById("editTitle");
    var editContent = document.getElementById("editContent");
    editTitle.value = post.title;
    editContent.value = post.content;
    var contentEditor = wysiwyg(editContent);
    contentEditor.selectAll();
    contentEditor.onUpdate(function () {
      //console.log(contentEditor.read());
    });
  },
  clearMenus: function(){
    var editorEl = document.getElementById("editor");
    //remove active class from all navs
    var navs = editorEl.getElementsByTagName("nav");
    for (var j = 0; j < navs.length; j++) {
      var nav = navs[j];
      nav.classList.remove("active");
    }
    //remove all children from #editor nav.secondary ul
    var navUl = document.querySelector("#editor nav.secondary ul");
    while(navUl.firstChild) navUl.removeChild(navUl.firstChild);

    var navlinks = navUl.getElementsByTagName("a");
    for (var i = 0; i < navlinks.length; i++) {
      editorLinks[i].removeEventListener("click", refreshMenu, false);
    }
  },
  updateMenuTitle: function() {
    var title = null,
        titleEl,
        urlSegments = getAfterHash();
    if(urlSegments.length == 2 && urlSegments[0] == "edit") {
      title = urlSegments[urlSegments.length-1];
      titleEl = document.querySelector("#editor nav.secondary h3 span");
    }
    if(urlSegments.length == 3 && urlSegments[0] == "edit") {
      title = urlSegments[urlSegments.length-2];
      titleEl = document.querySelector("#editor nav.edit h3 span a");
      titleEl.href = "#edit/" + title;
      titleEl.addEventListener("click", refreshMenu, false);
    }

    var homeLink = document.querySelector("#editor nav.edit h3 .go-home");
    if( homeLink ) addEventListener("click", refreshMenu, false);

    titleEl.textContent = title;
  }
};
