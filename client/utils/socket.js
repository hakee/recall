import socket from 'socket.io-client';
const io = socket.connect('http://localhost:8000');

function strongHandshake(_id) {
    const id = _id;
    io.on('connect', () => {
        io.emit('strongHandshake',{userRoom: id});
    })
}

function sendUpdates(noteID, updates) {
    io.emit('sendEditorUpdates', {noteID, updates})
}

function subscribeToUpdates(next) {
    io.on('editorUpdates', ({noteID, updates}) => next(null, noteID, updates));
}

export {
    strongHandshake,
    sendUpdates,
    subscribeToUpdates
}