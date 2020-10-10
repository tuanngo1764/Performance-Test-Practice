/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
    var dataset = [
        {
            "label" : "KO",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "OK",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.5, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.375, 500, 1500, "Launch PIM Page"], "isController": false}, {"data": [0.46875, 500, 1500, "Reset Search Employee Info "], "isController": false}, {"data": [0.5, 500, 1500, "Login Admin Account  "], "isController": false}, {"data": [0.375, 500, 1500, "Launch Home Page"], "isController": false}, {"data": [0.5, 500, 1500, "Logout-1"], "isController": false}, {"data": [0.5, 500, 1500, "Login Admin Account  -0"], "isController": false}, {"data": [0.34375, 500, 1500, "Get empsearch__csrf_token"], "isController": false}, {"data": [1.0, 500, 1500, "Logout-0"], "isController": false}, {"data": [0.625, 500, 1500, "Login Admin Account  -1"], "isController": false}, {"data": [0.53125, 500, 1500, "Search Employee"], "isController": false}, {"data": [0.90625, 500, 1500, "Launch PIM Page-0"], "isController": false}, {"data": [0.375, 500, 1500, "Launch PIM Page-1"], "isController": false}, {"data": [0.5, 500, 1500, "Get _csrf_token"], "isController": false}, {"data": [0.625, 500, 1500, "Launch Dashboard Page"], "isController": false}, {"data": [0.25, 500, 1500, "Logout"], "isController": false}, {"data": [0.40625, 500, 1500, "View Employee Info"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 148, 0, 0.0, 969.966216216216, 241, 4761, 651.5, 1962.7999999999997, 2523.6999999999975, 4484.149999999995, 2.2796937816731107, 27.608870901749818, 1.9764706816746505], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["Launch PIM Page", 16, 0, 0.0, 1483.3125000000005, 829, 4761, 946.5, 3251.8000000000015, 4761.0, 4761.0, 0.2992164269818413, 4.492410305200756, 0.4274937819086268], "isController": false}, {"data": ["Reset Search Employee Info ", 16, 0, 0.0, 1044.7499999999998, 416, 3472, 629.5, 3032.4000000000005, 3472.0, 3472.0, 0.2841312686461145, 3.8396740759074444, 0.1528870400625089], "isController": false}, {"data": ["Login Admin Account  ", 4, 0, 0.0, 1178.5, 1022, 1320, 1186.0, 1320.0, 1320.0, 1320.0, 0.11973538479959289, 1.4346614294908255, 0.2205867220941719], "isController": false}, {"data": ["Launch Home Page", 4, 0, 0.0, 1398.75, 1145, 1649, 1400.5, 1649.0, 1649.0, 1649.0, 0.1179140995784571, 2.3250898634407333, 0.07185390443062228], "isController": false}, {"data": ["Logout-1", 4, 0, 0.0, 1166.5, 476, 1813, 1188.5, 1813.0, 1813.0, 1813.0, 0.09811376290809194, 1.9310877290343154, 0.07420811462140352], "isController": false}, {"data": ["Login Admin Account  -0", 4, 0, 0.0, 621.75, 576, 679, 616.0, 679.0, 679.0, 679.0, 0.12183978068839475, 0.1935872296679866, 0.12344606685957966], "isController": false}, {"data": ["Get empsearch__csrf_token", 16, 0, 0.0, 1228.3125000000002, 569, 2968, 869.0, 2597.7000000000003, 2968.0, 2968.0, 0.29330351414272887, 3.9628197695734264, 0.15467177503620463], "isController": false}, {"data": ["Logout-0", 4, 0, 0.0, 251.5, 241, 258, 253.5, 258.0, 258.0, 258.0, 0.1008140736446808, 0.15811269753257554, 0.07546287836782015], "isController": false}, {"data": ["Login Admin Account  -1", 4, 0, 0.0, 556.25, 398, 640, 593.5, 640.0, 640.0, 640.0, 0.12201445871335753, 1.2681043719305738, 0.10116237836683646], "isController": false}, {"data": ["Search Employee", 16, 0, 0.0, 740.875, 368, 2305, 595.5, 1414.6000000000008, 2305.0, 2305.0, 0.2940257640075712, 3.433124069684106, 0.36372767241854564], "isController": false}, {"data": ["Launch PIM Page-0", 16, 0, 0.0, 328.56249999999994, 258, 565, 283.0, 565.0, 565.0, 565.0, 0.3246950910160927, 0.48799389167360024, 0.23147208636889421], "isController": false}, {"data": ["Launch PIM Page-1", 16, 0, 0.0, 1154.5625000000002, 570, 4196, 661.0, 2900.300000000001, 4196.0, 4196.0, 0.3007744943228814, 4.063760080645161, 0.21530049251823447], "isController": false}, {"data": ["Get _csrf_token", 4, 0, 0.0, 951.75, 709, 1227, 935.5, 1227.0, 1227.0, 1227.0, 0.11960291831120679, 2.3540692556960887, 0.0534358741478292], "isController": false}, {"data": ["Launch Dashboard Page", 4, 0, 0.0, 507.25, 323, 597, 554.5, 597.0, 597.0, 597.0, 0.12103973129179653, 1.2579739651102975, 0.09018878415589918], "isController": false}, {"data": ["Logout", 4, 0, 0.0, 1418.5, 717, 2064, 1446.5, 2064.0, 2064.0, 2064.0, 0.09749677041947985, 2.071853977258878, 0.14672121407853364], "isController": false}, {"data": ["View Employee Info", 16, 0, 0.0, 979.1249999999999, 575, 2584, 643.5, 2079.3000000000006, 2584.0, 2584.0, 0.2877025155988708, 4.094352377142036, 0.211702974124755], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 148, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
