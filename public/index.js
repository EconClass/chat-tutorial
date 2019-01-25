// index.js
$(document).ready(()=>{
    const socket = io.connect();
    $('#createUserBtn').click((e)=>{
        e.preventDefault();
        let username = $('#usernameInput').val();
        if(username.length > 0){
            //Emit to the server the new user
            socket.emit('new user', username);
            $('.usernameForm').remove();
        };
    });

    $('#sendChatBtn').click((e) => {
        e.preventDefault();
        // Get the message text value
        let message = $('#chatInput').val();
        // Make sure it's not empty
        if(message.length > 0){
            // Emit the message with the current user to the server
            socket.emit('new message', {
            sender : currentUser,
            message : message,
            });
            $('#chatInput').val("");
        };
    });

    //socket listeners
    socket.on('new user', (username) => {
        console.log(`✋ ${username} has joined the chat! ✋`);
        // Add the new user to the online users div
        $('.usersOnline').append(`<div class="userOnline">${username}</div>`);
    });

    //Output the new message
    socket.on('new message', (data) => {
        $('.messageContainer').append(`
        <div class="message">
            <p class="messageUser">${data.sender}: </p>
            <p class="messageText">${data.message}</p>
        </div>
        `);
    });
});