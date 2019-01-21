const SocketIO = require('socket.io');

class IOService {
    constructor(http) {
        if (typeof http === 'undefined') {
            throw 'NO HTTP DEFINED FOR SOCKET';
        }
        this.io = null;
        this.connections = [];
        this.initialize(http);
    }

    initialize(http) {
        this.io = SocketIO(http);
        this.io.set('origins', '*:*');
        this._initEvents();
    }

    _initEvents() {
        this.io.on('connection', (socket) => {
            socket.on('disconnect', () => {
                console.log('disconnected', socket.id);
            });

            socket.on('strongHandshake', (userRoom) => {
                // open bug : https://github.com/socketio/socket.io/issues/3331
                // socket.join(userRoom);
            });

            socket.on('sendEditorUpdates', ({noteID, updates}) => {
                socket.broadcast.emit('editorUpdates', {noteID, updates});
            });
        });
    }
}
module.exports.IOService = IOService;