$(document).ready(function () {



  var $UidSearchText = $("#searchUid");
  var $submitUIDSearchButton = $("#submitSearchUID");
  var $logParagraph = $("#log").hide();
  
  var searchUIDAPI = {
    searchByUID: function (requestUid) {
      return $.ajax({
        url: "/search-requestUid/" + requestUid,
        type: "GET"
      });
    }
  };

  var handleSubmitUIDSearch = function (event) {
    event.preventDefault();

    var searchTerm = $UidSearchText.val().trim();

    searchUIDAPI.searchByUID(searchTerm).then(function (resp) {

      var data = [];
      data[0] = ["Index", "Type", "ID", "RequestUid", "Source"];
      var hitsArray = resp.hits.hits;
      hitsArray.forEach(function (eachData) {
        data.push([
          eachData._source['Index'],
          eachData._source['Type'],
          eachData._source['ID'],
          eachData._source['RequestUid'],
          eachData._source['Source']
        ]);
      });

      var articlesTable = makeTable($("#tableDiv"), data);
    });

    $searchIDsButton.val("");
  };
  function makeTable(container, data) {
    var table = $("<table/>").addClass('table table-bordered');
    $.each(data, function (rowIndex, r) {

      var row = $("<tr/>");
      $.each(r, function (colIndex, c) {
        row.append($("<t" + (rowIndex == 0 ? "h" : "d") + "/>").text(c));
      });
      table.append(row);
    });
    return container.html(table);
  }
  $submitUIDSearchButton.on("click", handleSubmitUIDSearch);
});