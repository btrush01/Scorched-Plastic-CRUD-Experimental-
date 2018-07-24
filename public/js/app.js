function getUnit() {
  return $.ajax('/api/shirt')
    .then(res => {
      console.log("Results from getUnit()", res);
      return res;
    })
    .fail(err => {
      console.log("Error in getUnit()", err);
      throw err;
    });
}

function refreshArmy() {
  getUnit()
    .then(shirts => {
      const data = {shirts: shirts};
      $('#list-container').html(listItemTemplate(data.shirts));
    })
}
