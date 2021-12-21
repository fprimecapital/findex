
// <!-- The MIT License (MIT)

// Copyright (c) 2018 Derek Eder

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE. -->

// <!-- https://github.com/derekeder/csv-to-html-table -->

var CsvToHtmlTable = CsvToHtmlTable || {};

CsvToHtmlTable = {
    init: function (options) {
        options = options || {};
        var csv_path = options.csv_path || "";
        var el = options.element || "table-container";
        var allow_download = options.allow_download || false;
        var csv_options = options.csv_options || {};
        var datatables_options = options.datatables_options || {};
        var custom_formatting = options.custom_formatting || [];
        var customTemplates = {};
        $.each(custom_formatting, function (i, v) {
            var colIdx = v[0];
            var func = v[1];
            customTemplates[colIdx] = func;
        });
        console.log(datatables_options)

        var $table = $("<table class='table table-responsive table-hover' id='" + el + "-table'></table>");
        var $containerElement = $("#" + el);
        $containerElement.append($table);

        $.when($.get(csv_path)).then(
            function (data) {
                var csvData = $.csv.toArrays(data, csv_options);
                var $tableHead = $("<thead></thead>");
                var csvHeaderRow = csvData[0];
                var $tableHeadRow = $("<tr></tr>");
                for (var headerIdx = 0; headerIdx < csvHeaderRow.length; headerIdx++) {
                    $tableHeadRow.append($("<th style = 'text-align:center; color: black; font-weight: bold;vertical-align: middle; width: 100px;'></th>").text(csvHeaderRow[headerIdx]));
                }
                $tableHead.append($tableHeadRow);

                $table.append($tableHead);
                var $tableBody = $("<tbody></tbody>");

                for (var rowIdx = 1; rowIdx < csvData.length; rowIdx++) {
                    var $tableBodyRow = $("<tr></tr>");
                    for (var colIdx = 0; colIdx < csvData[rowIdx].length; colIdx++) {
                        var $tableBodyRowTd = $("<td style = 'text-align:center;'></td>");
                        var cellTemplateFunc = customTemplates[colIdx];
                        if (cellTemplateFunc) {
                            // $tableBodyRowTd.html(cellTemplateFunc(csvData[rowIdx][colIdx]));
                            if ((colIdx>=3)&(colIdx<5)){
                                $tableBodyRowTd.text('$' + csvData[rowIdx][colIdx]);
                            }
                            else if (((colIdx>=5)&(colIdx<7))|(colIdx==8)){
                                $tableBodyRowTd.text(csvData[rowIdx][colIdx]+'%');
                            }
                            else{
                                $tableBodyRowTd.text(csvData[rowIdx][colIdx]);
                            }
                        } else {
                            if ((colIdx>=3)&(colIdx<5)){
                                $tableBodyRowTd.text('$' + csvData[rowIdx][colIdx]);
                            }
                            else if (((colIdx>=5)&(colIdx<7))|(colIdx==8)){
                                $tableBodyRowTd.text(csvData[rowIdx][colIdx]+'%');
                            }
                            else{
                                $tableBodyRowTd.text(csvData[rowIdx][colIdx]);
                            }
                        }
                        $tableBodyRow.append($tableBodyRowTd);
                        $tableBody.append($tableBodyRow);
                    }
                }
                $table.append($tableBody);
                if (allow_download) {
                    $containerElement.append("<p class = 'csv_button'><a style = 'color: #1F1F1F;' href='" + csv_path + "'><i class='glyphicon glyphicon-download'></i>CSV</a></p>");
                }
                $table.DataTable(datatables_options);
            });
    }
};