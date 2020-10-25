let delay = 2500;

let start;
let end;
let ping;

var ctx = document.getElementById('myChart').getContext('2d');

var chart = new Chart(ctx, {
	type: 'line',

	data: {
		labels: [ 'Ping', 'Ping', 'Ping', 'Ping', 'Ping', 'Ping' ], //ignore that lmao
		datasets: [
			{
				backgroundColor: 'rgb(25, 25, 25)',
				borderColor: 'rgb(241, 241, 241)',
				data: [ 0, 0, 0, 0, 0, 0 ]
			}
		]
	},

	options: {
		layout: {
			padding: {
				top: 15
			}
		},
		legend: { display: false },
		scales: {
			xAxes: [
				{
					display: false
				}
			],
			yAxes: [
				{
					ticks: {
						fontFamily: 'gamefont',
						fontSize: 10,
						beginAtZero: true
					}
				}
			]
		}
	}
});

function pong() {
    start = Date.now();
	fetch("https://social.krunker.io", { mode: "no-cors" })
        .then(() => {
            end = Date.now();
            ping = end - start;
            displayPing(ping);
            setTimeout(pong, delay)
        })  
}

function displayPing(value) {
	document.getElementById('ping').textContent = `${value}ms`;
	add(value);
}

function add(data) {
	chart.data.datasets.forEach((dataset) => {
		dataset.data.shift();
		dataset.data.push(data);
	});
	chart.update();
}

pong();