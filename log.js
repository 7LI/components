define(function() {
  return function(str, clear) {
    var container = document.querySelector('#sg_test');
    if (container) {
      if (clear) {
        container.innerHTML =  str;
      } else {
        container.innerHTML += '<br>' + str;
      }
    } else {
      container = '<div id="sg_test" style="position:fixed;width:100%;word-wrap:break-word;left:0;bottom:0;background:#000;opacity:0.7;color:#fff;padding:10px;z-index:999999;">'+ str +'</div>';
      var tmp = document.createElement('div');
      tmp.innerHTML = container;
      document.body.appendChild(tmp.lastChild);
    }
    
  }
})