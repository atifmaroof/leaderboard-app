
import React from "react";
import { connect } from "react-redux"
import { getAllUsers, deleteAndUpdate } from "../redux/actions/leaderboard";
import { Toast } from "../redux/helpers/Services/Toast";
import { Leaderboard } from '../redux/helpers/Services/Leaderboard';
import { toast } from "react-toastify";

class LeaderboardPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.leaderboard ?? [],
        };
    }
    async componentDidMount() {
        let data = await this.props.getAllUsers();
        this.setState({ data: data })
    }
    counterUpdate = (type, id) => {
        debugger
        let { data } = this.state;
        let index = data.findIndex(f => f.id === id);
        if (type === 'decrease') {
            data[index].points--;
        }
        else if (type === 'increase') {
            data[index].points++;
        }
        this.setState({ data: data });
        this.updateRecordtoDB(id, data[index].points);
    }
    pointChange = (value, id) => {
        debugger
        let { data } = this.state;
        let index = data.findIndex(f => f.id === id);
        data[index].points = value;
        this.setState({ data: data });
        this.updateRecordtoDB(id, value);
    }
    deleteRecord = async (id) => {
        let { data } = this.state;
        let index = data.findIndex(f => f.id === id);
        data[index].isDeleting = true;
        this.setState({ data: data });
        this.props.deleteAndUpdate(id).then(async res => {
            if (res) {
                let data = await this.props.getAllUsers();
                this.setState({ data: data });
                toast.success("Delete Successfully!")
            }
        });
    }
    updateRecordtoDB = async (id, points) => {
        let payload = {
            id: id,
            points: points
        }
        Leaderboard.UpdateById(payload).then(res => {
            debugger
            if (res.data.success === 200) {
                toast.success(res.data.message);
            }
            else {
                toast.error(res.data.message);
            }
        })
    }
    render() {
        let { data } = this.state;
        return (<div className="container">
            <table className="table" >
                <thead className="thead-dark">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Participent Name</th>
                        <th scope="col">Location</th>
                        <th scope="col">Date</th>
                        <th scope="col">Units</th>
                        <th scope="col">Type</th>
                        <th scope="col">Points</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.participantName}</td>
                                <td>{item.location}</td>
                                <td>{item.selectedDate.substring(0, 10)}</td>
                                <td>{item.units}</td>
                                <td>{item.type}</td>
                                <td>
                                    <div className="container">
                                        <button className="btn btn-danger" onClick={() => this.counterUpdate('decrease', item.id)}>-</button>
                                        <input type="text" value={item.points} onChange={($event) => this.pointChange(+$event.target.value, item.id)} />
                                        <button className="btn btn-success" onClick={() => this.counterUpdate('increase', item.id)}>+</button>
                                    </div>
                                </td>
                                <td>
                                    {item.isDeleting ? <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div> :
                                        <button type="button" className="btn btn-danger" onClick={() => this.deleteRecord(item.id)}>
                                            Delete
                                        </button>
                                    }
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>);

    }
}


const mapStateToProps = state => {
    return {
        leaderboard: state.leaderboard.users,
    }
}

export default connect(mapStateToProps, { getAllUsers, deleteAndUpdate })(LeaderboardPage);
