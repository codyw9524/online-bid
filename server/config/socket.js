var Bids = require('../controllers/bids');



module.exports = function(server) {
	var io = require('socket.io').listen(server);

	io.sockets.on('connection', function(socket){

		console.log('new socket connection...');
		console.log('socket id: ', socket.id);

		socket.on('newBid', function(){
			io.emit('updateBids', {});
		})

		socket.on('startTimer', function(){
			let timer = new Date();
			console.log('timer before 20 mins: ', timer);


			timer.setMinutes(timer.getMinutes() + 1);
			console.log('timer after 20 mins: ', timer);

			let x = setInterval(function(){
				let distance = timer.getTime() - new Date().getTime();
				console.log('distance:', distance);
				if(distance <= 0){
					console.log('times up')
					clearInterval(x);
				}
				let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			  let seconds = Math.floor((distance % (1000 * 60)) / 1000);
			  console.log(`${minutes}:${seconds}`);
			  io.emit('updateClock', {minutes: minutes, seconds: seconds});
			}, 1000);
		})
	})

}