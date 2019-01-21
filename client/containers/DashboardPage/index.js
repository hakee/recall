import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Column, Row } from 'simple-flexbox';
import { Link, Route } from 'react-router-dom';

import { ListGroup, ListGroupItem, FormText } from 'reactstrap';

import NotesPage from '../NotesPage/';

import { fetchNotes } from '../../actions/';

class DashboardPage extends Component {
    constructor(props) {
        super(props);
        // this.state = { editorState: Editor.createEmpty() };
        // this.onChange = (editorState) => this.setState({editorState});
    }
    componentWillMount() {
        this.refreshList();
    }

    refreshList() {
        this.props.fetchNotes();
    }

    renderNotes () {
        return this.props.notes.map(note => {
            return (
                <ListGroupItem key={note._id}>
                    <Link to={`/notes/${note._id}`}>{note.title}</Link>
                </ListGroupItem>
            );
        })
    }

    render() {
        return (
            <Row vertical="center">
                <Column flexGrow={1} horizontal="center">
                    <ListGroup>
                        <ListGroupItem>
                            <Link to={'/notes/create'}>Add note</Link>
                        </ListGroupItem>
                        {this.renderNotes()}
                    </ListGroup>
                </Column>
                <Column flexGrow={2} horizontal="center">
                    <Route path={`${this.props.match.url}/:noteId`} render={({match}) => <NotesPage match={match} afterUpdate={this.refreshList.bind(this)}/>}/>
                </Column>
            </Row>
        )
    }
}

const mapStateToProps = state => {
    let notes = [];
    notes = state.notes.items;
    return { notes };
};

export default connect(mapStateToProps, {fetchNotes})(DashboardPage);