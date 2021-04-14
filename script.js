const app = {};

let trainsEastbound;
let eastboundTimes;
let trainsWestbound;
let westboundTimes;

app.displayTrainTimes = function() {
    $('.eastboundTimes').append(`
        <li>${eastboundTimes[0]}</li>
        <li>${eastboundTimes[1]}</li>
        <li>${eastboundTimes[2]}</li>
    `);
    $('.westboundTimes').append(`
        <li>${westboundTimes[0]}</li>
        <li>${westboundTimes[1]}</li>
        <li>${westboundTimes[2]}</li>
    `);
};

app.getTrainTimes = function(query) {
    $.ajax({
        url: 'http://proxy.hackeryou.com',
        method: "GET",
        dataType: "json",
        data: {
            reqUrl: `https://myttc.ca/${query}_station.json`,
            params: {
                method: 'GET',
                dataType: 'json'
            }
        }
    }).then(function (res) {
        
        if (query === 'ossington') {
            trainsEastbound = res.stops[4].routes[0].stop_times;
            trainsWestbound = res.stops[6].routes[0].stop_times;
        } else {
            // (query === 'christie')
            trainsEastbound = res.stops[2].routes[0].stop_times;
            trainsWestbound = res.stops[5].routes[0].stop_times;
        };
        
        eastboundTimes = [
            trainsEastbound[0].departure_time, 
            trainsEastbound[1].departure_time, 
            trainsEastbound[2].departure_time
        ];

        westboundTimes = [
            trainsWestbound[0].departure_time, 
            trainsWestbound[1].departure_time, 
            trainsWestbound[2].departure_time
        ];

        console.log(`eastbound times: ${eastboundTimes.join(', ')}`);
        console.log(`westbound times: ${westboundTimes.join(', ')}`);

        app.displayTrainTimes();
    }); 
};

app.getStationSelection = function() {
    $('.stationSelect').on('change', function() {
        const selection = $('option:selected').val();
        $('.eastboundTimes').empty();
        $('.westboundTimes').empty();
        app.getTrainTimes(selection);
    });
};

app.init = function(){
    app.getStationSelection();
};

$(document).ready(function() {
	app.init();
});