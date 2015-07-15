/***********************************************************************

  Toggle component

  @author <702368372atqqcom> lyz
 
  @usage
    <div sg-toggle="off" class="sg-toggle-off">
      <div sg-toggle-trigger></div>
    </div>

 ***********************************************************************/

define(function() {
  var containers = document.querySelectorAll('*[sg-toggle]');
  for (var i = 0, len = containers.length; i < len; i++) {
    (function(){
      var container = containers[i];
      container.addEventListener('click', function(e) {
        var target = e.target;
        var isTrigger = target.getAttribute('sg-toggle-trigger') !== null;

        if (isTrigger) {
          var trigger = container.querySelector('*[sg-toggle-trigger]');
          var responder = container.querySelector('*[sg-toggle-responder]');

          var status = container.getAttribute('sg-toggle');
          var afterStatus;
          if (status == 'on') {
            afterStatus = 'off';
            container.classList.remove('sg-toggle-on');
            container.classList.add('sg-toggle-off');
          } else {
            afterStatus = 'on';
            container.classList.remove('sg-toggle-off');
            container.classList.add('sg-toggle-on');
          }

          container.setAttribute('sg-toggle', afterStatus);
        }
      })
    }(i))
  }
})