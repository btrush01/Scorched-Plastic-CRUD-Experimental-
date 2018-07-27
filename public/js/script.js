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
    compiled +=`
      <div class="child">
        <img class="card-img-top" src="${item.image}">
        <div class="card-body">
          <div class="card-title">${item.name} - ${item.description}</div>
          <p class="card-text">${item.image}</p>
          <span class="pull-right">
            <button type="button" class="btn btn-xs btn-default" onclick="handleEditArmyClick(this)" data-army-id="${item._id}">Edit</button>
            <button type="button" class="btn btn-xs btn-default" onclick="handleDeleteArmyClick(this)" data-army-id="${item._id}">Delete</button>
          </span>
        </div>
      </div>
    `
  })
  compiled = `<div class="parent" id="container">${compiled}</div>`
  return compiled;
}

function getArmy() {
  return $.ajax('/api/army')
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
      window.armyList = ARMY;
      const data = {ARMY: ARMY};
      $('#list-container').html(listItemTemplate(data.ARMY));
    })
}

function submitArmyForm() {
  console.log("You clicked 'submit'. Congratulations.");

  const armyData = {
    name: $('#army-name').val(),
    description: $('#army-description').val(),
    image: $('#army-image').val(),
    _id: $('#army-id').val(),
    console.log("The id is " + _id)
  };

  console.log(armyData);

  let method, url;
  if (armyData._id) {
    method = 'PUT';
    url = '/api/army';
  } else {
    method = 'POST';
    url = '/api/army';
  }

  fetch(url, {
    method: method,
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
}

function showAddArmyForm(){
  $('#add-army-form').show();
}

function handleEditArmyClick (element) {
  const armyId = element.getAttribute('data-army-id')

  const army = window.armyList.find(army => army._id === armyId)
  if (army) {
    $('#army-name').val(army.name)
    $('#army-description').val(army.description)
    $('#army-price').val(army.image)
    $('#army-id').val(army._id)
  }

  showAddArmyForm()
}


function handleDeleteArmyClick(element) {
  const armyId = element.getAttribute('data-army-id');

  if (confirm("This will delete the entry. Is that ok?")){
    deleteArmy(armyId)
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
      console.log("The content has been deleted");
      refreshArmyList();
    })
    .catch(err => {
      console.error("Nothing was deleted, and error occurred", err);
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
