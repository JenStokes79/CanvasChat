 $(function() {
     //connects socket.io to wherever we need given the context
     let client = io.connect(window.location.host);
     //erase drawing recieved from the server
     client.on('message', function(data) {
         console.log(data.message);
         client.emit('message', { message: 'Client to server: user connected' })
     });
     client.on('disconnect', function() {
         console.log('user disconnected');
     });
     $('form').submit(function(e) {

         client.emit('chat message', $('#m').val());
         $('#m').val('');
         return false;
     });

     client.on('chat message', function(msg) {
         $('#messages').append($('<li>').text(msg));
     });
 });