// tabular front-end display
(function(){
  function onTabClick(event){
    var actives = document.querySelectorAll('.active');
    // deactivate existing active tab and panel
    for (var i=0; i < actives.length; i++){
      actives[i].className = actives[i].className.replace('active', '');
    }
    // activate new tab and panel
    event.target.parentElement.className += ' active';
    document.getElementById(event.target.href.split('#')[1]).className += ' active';
  }
  var el = document.getElementById('nav-tab');
  el.addEventListener('click', onTabClick, false);
})();

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
    this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
    return this;
}

//img lightbox fade-in when img clicked
$(document).ready(function() {
    $("#thumbnail img").click(function(e){

        $("#background").css({"opacity" : "0.7"})
                        .fadeIn("slow");

        $("#large").html("<img src='"+$(this).parent().attr("href")+"' alt='"+$(this).attr("alt")+"' /><br/>"+$(this).attr("rel")+"")
                   .center()
                   .fadeIn("slow");

        return false;
    });
    //and fade-out when deselcted
    $(document).keypress(function(e){
        if(e.keyCode==27){
            $("#background").fadeOut("slow");
            $("#large").fadeOut("slow");
        }
    });

    $("#background").click(function(){
        $("#background").fadeOut("slow");
        $("#large").fadeOut("slow");
    });

    $("#large").click(function(){
        $("#background").fadeOut("slow");
        $("#large").fadeOut("slow");
    });

});


//render data from the server
function listItemTemplate(data) {
  var compiled = '';
  data.forEach(item => {
    compiled += `
      <li class="list-group-item">
        ${item.name} - ${item.description}
      </li>
    `;
  });
  return compiled;
}

function getArmy() {
  return $.ajax('/api/ARMY')
    .then(res => {
      console.log("Results from getArmy()", res);
      return res;
    })
    .fail(err => {
      console.log("Error in getArmy()", err);
      throw err;
    });
}

function refreshArmyList() {
  getArmy()
    .then(ARMY => {
      const data = {ARMY: ARMY};
      $('#list-container').html(listItemTemplate(data.ARMY));
    })
}
