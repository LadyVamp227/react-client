import React from 'react';
import ReactDOM from 'react-dom';


class Articles extends React.Component {
    render() {
        return (
            <table className="responsiveTable table table-striped bordered hover size='sm'" style={{wordBreak: 'break-all' }}>
                <thead>
                <tr>
                    <th>Article title</th>
                    <th>Article body</th>
                </tr>
                </thead>
                <tbody>
                {this.props.articles && this.props.articles.map(article => {
                    return <tr>
                        <td>{article.article_title}</td>
                        <td>{article.article_body}</td>
                    </tr>
                })}
                </tbody>
            </table>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles : [],
            article_title: '',
            article_body: '',
        };
        this.create = this.create.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        // get all data from api - GET
        fetch("http://127.0.0.1:8000/api/articles", {
            "method": "GET",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            }
        })
            .then(response => response.json())
            .then(response => {
                // console.log(response)
                this.setState({
                    articles: response
                })
            })
            .catch(err => { console.log(err);
            });
    }

    create(e) {
        // add data - POST
        e.preventDefault();

        // creates entity
        fetch("http://127.0.0.1:8000/api/articles/create", {
            "method": "POST",
            "headers": {
                "content-type": "application/json",
                "accept": "application/json"
            },
            "body": JSON.stringify({
                article_title: this.state.article_title,
                article_body: this.state.article_body
            })
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err);
            });
        window.location.reload()
    }

    handleChange(changeObject) {
        this.setState(changeObject)
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <h1 className="display-4 text-center">Create and show articles page</h1>
                        <form className="d-flex flex-column">
                            <legend className="text-center">Add Article</legend>
                            <label htmlFor="article_title">
                                Article title:
                                <input
                                    name="article_title"
                                    id="article_title"
                                    type="textarea"
                                    className="form-control"
                                    value={this.state.article_title}
                                    onChange={(e) => this.handleChange({ article_title: e.target.value })}
                                    required
                                />
                            </label>
                            <label htmlFor="article_body">
                                Friend notes:
                                <textarea
                                    name="article_body"
                                    id="article_body"
                                    className="form-control"
                                    value={this.state.article_body}
                                    onChange={(e) => this.handleChange({ article_body: e.target.value })}
                                    required
                                />
                            </label>
                            <button className="btn btn-success" type='button' onClick={(e) => this.create(e)}>
                                Add
                            </button>
                        </form>
                        <Articles articles={this.state.articles} />
                    </div>
                </div>
            </div>
        );
    }
}

let domContainer = document.querySelector('#App');
ReactDOM.render(<App />, domContainer);
export default App;
