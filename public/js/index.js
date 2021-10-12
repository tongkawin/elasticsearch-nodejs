$(document).ready(function () {

    var $SearchText = $("#searchText");
    var $submitSearchButton = $("#submitSearch");
    var $logParagraph = $("#log").hide();

    var searchTitleAPI = {
        searchByTitle: function (title) {
            return $.ajax({
                url: "/search-title/" + title,
                type: "GET"
            });
        }
    };

    var searchIDAPI = {
        searchByID: function (id) {
            return $.ajax({
                url: "/search-id/" + id,
                type: "GET"
            });
        }
    };

    var d = document.getElementById("searchwith");
    var selected = d.options[d.selectedIndex].text;
    var x = selected;
    console.log(x);
    if (x == "Title") {

        var handleSubmitTitleSearch = function (event) {
            event.preventDefault();

            var searchTerm = $SearchText.val().trim();

            searchTitleAPI.searchByTitle(searchTerm).then(function (resp) {

                var data = [];
                data[0] = ["ID", "Title", "Meta Description", "Meta Keywords", "Categories", "Tags", "Status"];
                var hitsArray = resp.hits.hits;
                hitsArray.forEach(function (eachArticle) {
                    data.push([eachArticle._id, eachArticle._source['Title'], eachArticle._source['Meta Description'], eachArticle._source['Meta Keywords'], eachArticle._source['Categories'], eachArticle._source['Tags'], eachArticle._source['Status']]);
                });

                var articlesTable = makeTable($("#tableDiv"), data);
            });

            $searchTitlesButton.val("");
        };

    }
    if (x == "ID") {

        var handleSubmitIDSearch = function (event) {
            event.preventDefault();

            var searchTerm = $SearchText.val().trim();

            searchIDAPI.searchByID(searchTerm).then(function (resp) {

                var data = [];
                data[0] = ["ID", "Title", "Meta Description", "Meta Keywords", "Categories", "Tags", "Status"];
                var hitsArray = resp.hits.hits;
                hitsArray.forEach(function (eachArticle) {
                    data.push([eachArticle._id, eachArticle._source['Title'], eachArticle._source['Meta Description'], eachArticle._source['Meta Keywords'], eachArticle._source['Categories'], eachArticle._source['Tags'], eachArticle._source['Status']]);
                });

                var articlesTable = makeTable($("#tableDiv"), data);
            });

            $searchIDsButton.val("");
        };
    }

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

    var x = document.getElementById("searchwith").value;
    if (x == "Title") {
        $submitSearchButton.on("click", handleSubmitTitleSearch);
    }
    if (x == "ID") {
        $submitSearchButton.on("click", handleSubmitIDSearch);
    }
});