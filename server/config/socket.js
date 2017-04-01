var Bids = require('../controllers/bids');

		let x;
		let y;
		let distance = 0;
		let minutes = 0;
		let seconds = 0;

module.exports = function(server) {
	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket){
		console.log('new socket connection...');
		console.log('socket id: ', socket.id);

		console.log('distance: ', distance);

		// if(distance > 0){
		// 	y = setInterval(function(){
		// 		console.log(distance)
		// 		io.emit('updateClock', {minutes: minutes, seconds: seconds});
		// 	}, 1000);
		// }

		// if(distance < 0){
		// 	console.log('distance')
		// 	clearInterval(y);	
		// }

		socket.on('newBid', function(){
			io.emit('updateBids', {});
		})

		socket.on('startTimer', function(){
			let timer = new Date();
			console.log('timer before 20 mins: ', timer);


			timer.setMinutes(timer.getMinutes() + 1);
			console.log('timer after 20 mins: ', timer);

			let x = setInterval(function(){
				distance = timer.getTime() - new Date().getTime();
				console.log('distance:', distance);
				if(distance <= 0){
					console.log('times up')
					io.emit('endBid');
					clearInterval(x);
					clearInterval(y);
				}
				minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			  seconds = Math.floor((distance % (1000 * 60)) / 1000);
			  console.log(`${minutes}:${seconds}`);
			  io.emit('updateClock', {minutes: minutes, seconds: seconds});
			}, 1000);
		})
	})

}
