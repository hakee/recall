import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Column, Row } from 'simple-flexbox';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { subscribeToUpdates, sendUpdates } from '../../utils/socket';

import {Editor, EditorState} from 'draft-js';

import { fetchNotes, fetchNoteDetail, updateNote, createNote } from '../../actions';

const INITIAL_STATE = {
    title: '',
    content: '',
    isNewNote: true
}

class NotesPage extends Component {
    constructor(props) {
        super(props);

        this.state = INITIAL_STATE;

        this.onTitleChanged = this.onTitleChanged.bind(this);
        this.onContentChanged = this.onContentChanged.bind(this);

        subscribeToUpdates((err, noteID, updates) => {
            if(!noteID || noteID === this.props.note._id)
                this.setState(updates);
        })
    }

    onTitleChanged(ev) {
        this.setState({title: ev.target.value});
        sendUpdates(this.props.note._id || null, this.state);
    }

    onContentChanged(ev) {
        this.setState({content: ev.target.value});
        sendUpdates(this.props.note._id || null, this.state);
    }

    onSavePress() {
        if (!this.state.isNewNote) {
            this.props.updateNote({id: this.props.note._id, title: this.state.title, content: this.state.content})
                .then(() => {
                    this.props.afterUpdate();
                });
        } else {
            this.props.createNote({title: this.state.title, content: this.state.content})
                .then(() => {
                    this.setState(INITIAL_STATE);
                    this.props.afterUpdate();
                });
        }
    }

    fetchNoteDetail(id) {
        if(id !== 'create') {
            this.props.fetchNoteDetail(id);
            this.setState({isNewNote: false});
        } else {
            this.setState(INITIAL_STATE);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.note !== nextProps.note) {
            this.setState({title: nextProps.note.title, content: nextProps.note.content});
        }
    }

    componentWillMount() {
        const { noteId } = this.props.match.params;
        this.fetchNoteDetail(noteId);
    }

    componentDidUpdate(prevProps) {
        if(this.props.match.params.noteId !== prevProps.match.params.noteId) {
            const { noteId } = this.props.match.params;
            this.fetchNoteDetail(noteId);
        }
    }

    renderButtons() {
        return (
            <Button
                block
                color='success'
                onClick={this.onSavePress.bind(this)}>
                Save
            </Button>
        )
    }

    render() {
        return (
            <Row>
                <Form>
                    <FormGroup>
                        <Input
                            type="text"
                            name="title"
                            id="title"
                            value={this.state.title}
                            onChange={this.onTitleChanged}
                            />
                    </FormGroup>
                    <FormGroup>
                        <Input
                            type="textarea"
                            name="content"
                            id="content"
                            value={this.state.content}
                            onChange={this.onContentChanged}
                            />
                    </FormGroup>
                    <FormGroup>
                        {this.renderButtons()}
                    </FormGroup>
                </Form>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    let note = {
        title: '',
        content: ''
    };
    note = state.notes.openedNote;
    let userID = state.auth.user.id;
    return { note, userID };
};

export default connect(mapStateToProps, {fetchNotes, fetchNoteDetail, updateNote, createNote})(NotesPage);