const mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/users-api', { useNewUrlParser: true });
mongoose.connection
.once('open', () => console.log('Connection Established.'))
.on('error', (error) => {
	console.log('warningn: ' + error);
});
