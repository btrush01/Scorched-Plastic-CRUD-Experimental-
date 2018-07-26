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
        ${item.name} - ${item.description} - ${item.image}
        <span class="pull-right">
          <button type="button" class="btn btn-xs btn-default">Edit</button>
        </span>
        <button type="button" class="btn btn-xs btn-danger" onclick="handleDeleteArmyClick(this)" data-army-id="${item._id}">Del</button>
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

----

function submitArmyForm() {
  console.log("You clicked 'submit'. Congratulations.");

  const armyData = {
    name: $('#army-name').val(),
    description: $('#army-description').val(),
    image: $('#army-image').val(),
    _id: $('#army-id').val()
  };

  let method, url; //what?
  if (armyData.id) {
    method = 'PUT';
    url = '/api/army';
  } else {
    method = 'POST';
    url = '/api/army';
  }

  fetch('/api/army', {
    method: 'post',
    body: JSON.stringify(armyData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(army => {
    console.log("we have posted the data", army);
    setForm();
    refreshArmyList();
  })
  .catch(err => {
    console.error("A terrible thing has happened", err);
  })
}

function cancelArmyForm() {
  setForm()
  hideAddArmyForm();
}

function showAddArmyForm(){
  $('#add-army-form').show();
}

function hideAddArmyForm(){
  $('#add-army-form').hide();
}

function handleEditArmyClick (element) {
  const armyId = element.getAttribute('data-army-id')

  const army = window.shirtList.find(army => army._id === armyId)
  if (army) {
    setForm(army)
  }
  showAddArmyForm()
}

function handleDeleteArmyClick(element) {
  const armyId = element.getAttribute('data-army-id');

  i (confirm("This will delete the entry. Is that ok?")){
    console.log("Army", armyId, "is DOOMED!!!!!!");
  }
}

function deleteArmy(armyId) {
  const url = '/api/army/' + armyId;

  fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  })
    .then(response => response.json())
    .then(response => {
      console.log("DOOOOOOOOOM!!!!!");
      refreshArmyList();
    })
    .catch(err => {
      console.error("I'm not dead yet!", err);
    });
}

function setForm (data) {
  data = data || {}

  const army = {
    name: data.name || '',
    description: data.description || '',
    price: data.image || '',
    _id: data._id || ''
  }

  $('#army-name').val(army.name)
  $('#army-description').val(army.description)
  $('#army-image').val(army.image)
  $('#army-id').val(army._id)

  if (army._id) {
    $('#form-label').text('Edit army')
  } else {
    $('#form-label').text('Add army')
  }
}
