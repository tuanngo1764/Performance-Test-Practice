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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.3602150537634409, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.125, 500, 1500, "Launch PIM Page"], "isController": false}, {"data": [0.39473684210526316, 500, 1500, "Fill Job Details Info-1"], "isController": false}, {"data": [0.25, 500, 1500, "Login Admin Account  "], "isController": false}, {"data": [0.125, 500, 1500, "Launch Home Page"], "isController": false}, {"data": [0.125, 500, 1500, "Logout-1"], "isController": false}, {"data": [0.5, 500, 1500, "Login Admin Account  -0"], "isController": false}, {"data": [0.625, 500, 1500, "Logout-0"], "isController": false}, {"data": [0.375, 500, 1500, "Login Admin Account  -1"], "isController": false}, {"data": [1.0, 500, 1500, "Launch PIM Page-0"], "isController": false}, {"data": [0.125, 500, 1500, "Fill Employee Info"], "isController": false}, {"data": [0.125, 500, 1500, "Launch PIM Page-1"], "isController": false}, {"data": [0.275, 500, 1500, "View Job Details Page"], "isController": false}, {"data": [0.375, 500, 1500, "Get _csrf_token"], "isController": false}, {"data": [0.25, 500, 1500, "Launch Dashboard Page"], "isController": false}, {"data": [0.8421052631578947, 500, 1500, "Fill Job Details Info-0"], "isController": false}, {"data": [0.125, 500, 1500, "Logout"], "isController": false}, {"data": [0.35, 500, 1500, "Add Employee Page"], "isController": false}, {"data": [0.375, 500, 1500, "View Personal Details Page"], "isController": false}, {"data": [0.25, 500, 1500, "Fill Job Details Info"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 186, 0, 0.0, 1764.0322580645163, 261, 10590, 1049.5, 3506.500000000002, 5587.6, 9798.299999999996, 1.3566343797409266, 16.530006988308145, 1.3808732216966682], "isController": false}, "titles": ["Label", "#Samples", "KO", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions\/s", "Received", "Sent"], "items": [{"data": ["Launch PIM Page", 4, 0, 0.0, 2548.75, 1135, 3615, 2722.5, 3615.0, 3615.0, 3615.0, 0.05497223901929526, 0.8151620736215711, 0.07853943914573142], "isController": false}, {"data": ["Fill Job Details Info-1", 19, 0, 0.0, 1735.8421052631581, 553, 9571, 852.0, 5235.0, 9571.0, 9571.0, 0.17713800915523817, 2.634618331686261, 0.10492076570235222], "isController": false}, {"data": ["Login Admin Account  ", 4, 0, 0.0, 2475.5, 1209, 5589, 1552.0, 5589.0, 5589.0, 5589.0, 0.05065856129685917, 0.606938046162614, 0.0933275155141844], "isController": false}, {"data": ["Launch Home Page", 4, 0, 0.0, 1971.25, 913, 2634, 2169.0, 2634.0, 2634.0, 2634.0, 0.051719010615326924, 1.0198216138594018, 0.031516272093714846], "isController": false}, {"data": ["Logout-1", 4, 0, 0.0, 3417.5, 710, 8713, 2123.5, 8713.0, 8713.0, 8713.0, 0.06182762458266353, 1.216914371638123, 0.0467933682144182], "isController": false}, {"data": ["Login Admin Account  -0", 4, 0, 0.0, 630.25, 581, 665, 637.5, 665.0, 665.0, 665.0, 0.05108295872496935, 0.08116403695852063, 0.051756415700347363], "isController": false}, {"data": ["Logout-0", 4, 0, 0.0, 571.75, 261, 931, 547.5, 931.0, 931.0, 931.0, 0.07075763740248713, 0.11097340397304134, 0.05299912879658948], "isController": false}, {"data": ["Login Admin Account  -1", 4, 0, 0.0, 1844.25, 571, 5007, 899.5, 5007.0, 5007.0, 5007.0, 0.05103472913317513, 0.5303574903034015, 0.042312973666079765], "isController": false}, {"data": ["Launch PIM Page-0", 4, 0, 0.0, 283.5, 265, 296, 286.5, 296.0, 296.0, 296.0, 0.05561348627042057, 0.08358315954118874, 0.039646332985749044], "isController": false}, {"data": ["Fill Employee Info", 20, 0, 0.0, 2757.15, 989, 7935, 2118.5, 6397.800000000004, 7866.5999999999985, 7935.0, 0.18399602568584517, 2.581855950661466, 0.10671410122541354], "isController": false}, {"data": ["Launch PIM Page-1", 4, 0, 0.0, 2265.25, 839, 3350, 2436.0, 3350.0, 3350.0, 3350.0, 0.05517317480241107, 0.7352202702795901, 0.03949407922867902], "isController": false}, {"data": ["View Job Details Page", 20, 0, 0.0, 1875.75, 511, 8999, 1029.0, 4507.900000000003, 8783.449999999997, 8999.0, 0.18688794198998282, 2.6965155911265604, 0.1411879999252448], "isController": false}, {"data": ["Get _csrf_token", 4, 0, 0.0, 1435.25, 689, 3460, 796.0, 3460.0, 3460.0, 3460.0, 0.05103863624763946, 1.0045614784297963, 0.022802906331342826], "isController": false}, {"data": ["Launch Dashboard Page", 4, 0, 0.0, 3248.0, 530, 9680, 1391.0, 9680.0, 9680.0, 9680.0, 0.052016957528154176, 0.5405648960311061, 0.038758729095685195], "isController": false}, {"data": ["Fill Job Details Info-0", 19, 0, 0.0, 507.78947368421046, 296, 1029, 350.0, 1025.0, 1029.0, 1029.0, 0.17752695606675015, 0.2707340827228898, 0.3153074369779306], "isController": false}, {"data": ["Logout", 4, 0, 0.0, 3989.75, 971, 9260, 2864.0, 9260.0, 9260.0, 9260.0, 0.06130737987585255, 1.3028267252279868, 0.0923202927427389], "isController": false}, {"data": ["Add Employee Page", 20, 0, 0.0, 1176.75, 296, 3210, 795.5, 2102.6000000000004, 3155.249999999999, 3210.0, 0.18478652536657028, 1.871288389400645, 0.0931150850479983], "isController": false}, {"data": ["View Personal Details Page", 20, 0, 0.0, 1295.1, 515, 5210, 913.0, 2371.5, 5068.149999999998, 5210.0, 0.1864662775737008, 2.6021969952124784, 0.14245368061123648], "isController": false}, {"data": ["Fill Job Details Info", 20, 0, 0.0, 2233.1, 879, 10590, 1460.5, 5450.500000000003, 10339.749999999996, 10590.0, 0.18584251705105093, 2.9758396016465647, 0.4352145000139382], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 186, 0, null, null, null, null, null, null, null, null, null, null], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
