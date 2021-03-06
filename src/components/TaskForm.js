import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
// import './App.css';

class TaskForm extends Component {
    onExitForm = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === "status") {
            value = target.value === "true" ? true : false;
        }
        this.setState({
            [name]: value
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            status: false
        }
    }

    componentWillMount() {
        if (this.props.itemEditing != null) {
            this.setState({
                id: this.props.itemEditing.id,
                name: this.props.itemEditing.name,
                status: this.props.itemEditing.status,
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps);
        if (nextProps && nextProps.task !== null) {
            this.setState({
                id: nextProps.itemEditing.id,
                name: nextProps.itemEditing.name,
                status: nextProps.itemEditing.status,
            });
        } else if (nextProps && nextProps.itemEditing === null) {
            this.setState({
                id: "",
                name: "",
                status: false
            })
        }
    }


    onSave = (event) => {
        event.preventDefault();
        this.props.onSaveTask(this.state);
        this.onClear();
        this.onExitForm();
    }
    onClear = () => {
        // console.log("onClear");
        this.setState({
            name: "",
            status: false
        })
    }
    render() {
        var { id } = this.state;
        if (!this.props.isDisplayForm) return null;
        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                    <h3 className="panel-title">
                        {id === "" ? "Th??m c??ng vi???c" : "C???p nh???t c??ng vi???c"}
                        <span className="fa fa-times-circle text-right sp" onClick={this.onExitForm}></span>
                    </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={this.onSave}>
                        <div className="form-group">
                            <label>T??n :</label>
                            <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onChange} />
                        </div>
                        <label>Tr???ng Th??i :</label>
                        <select className="form-control" name="status" value={this.state.status} onChange={this.onChange} >
                            <option value={true}>K??ch Ho???t</option>
                            <option value={false}>???n</option>
                        </select>
                        <br />
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">L??u</button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>H???y B???</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm: state.isDisplayForm,
        itemEditing: state.itemEditing,
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask: (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm());
        },

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
