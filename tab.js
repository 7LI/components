/***********************************************************************

  Tab component

  @author <702368372atqqcom> lyz
 
  @usage
    <div sg-tab>
      <div sg-tab-label=1>
      <div sg-tab-label=2>
      <div sg-tab-label=3>

      <div class="sg-tab-panel-on" sg-tab-panel>1</div>
      <div sg-tab-panel>2</div>
      <div sg-tab-panel>3</div>
    </div>

 ***********************************************************************/

define(function() {
  var tabs = document.querySelectorAll('*[sg-tab]');
  for (var i = 0, len = tabs.length; i < len; i++) {
    (function(){
      var tab = tabs[i];
      tab.addEventListener('click', function(e) {
        var target = e.target;
        if (target.classList.contains('sg-tab-disabled')) return;

        var indexToActive = target.getAttribute('sg-tab-label');

        if (indexToActive !== null) {
          var labels = tab.querySelectorAll('*[sg-tab-label]');
          var panels = tab.querySelectorAll('*[sg-tab-panel]');

          for (var i = 0, len = panels.length; i < len; i++) {
            if (indexToActive == i) {
              labels[i].classList.add('sg-tab-label-on');
              panels[i].classList.add('sg-tab-panel-on');
            } else {
              labels[i].classList.remove('sg-tab-label-on');
              panels[i].classList.remove('sg-tab-panel-on');
            }
          }
        }
      })
    }(i))
  }
})
