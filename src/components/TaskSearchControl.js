import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
// import './App.css';

class TaskSearchtControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword: "",
        }
    }
    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword);
    }

    render() {
        var { keyword } = this.state;
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <div className="input-group mt-10">
                    <input type="text" className="form-control" placeholder="Nhập từ khóa..." name="keyword" value={keyword} onChange={this.onChange} />
                    <span className="input-group-btn">
                        <button className="btn btn-primary" type="button" onClick={this.onSearch}>
                            <span className="fa fa-search mr-5"></span>Tìm
                        </button>
                    </span>
                </div>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch, props) => { // dispatch thực thi 1 hành động
    return {
        onSearch: (keyword) => {
            dispatch(actions.searchTask(keyword));
        }
    }
}

export default connect(null, mapDispatchToProps)(TaskSearchtControl);


