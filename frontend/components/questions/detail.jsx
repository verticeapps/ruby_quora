var React = require('react');
var QuestionStore = require('../../stores/question_store.js');
var ApiUtil = require('../../util/api_util.js');
var QuestionEdit = require('./edit');

var QuestionDetail =  React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getStateFromStore: function () {
    return { question: QuestionStore.find(parseInt(this.props.params.questionId)) };
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  handleDelete: function(event) {
    event.preventDefault();

    console.log("hit the handle");
    ApiUtil.destroyQuestion(this.state.question.id, function () {
      this.context.router.push('/');
    }.bind(this));

  },

  handleEdit: function(event) {
    event.preventDefault();
    console.log("hit handleEdit");

    this.setState({ edit: true });
  },
  // fetchDetails: function (props) {
  //   // if you want to factor out the ApiUtil call
  // },

  componentWillReceiveProps: function (newProps) {
    ApiUtil.fetchSingleQuestion(parseInt(newProps.params.questionId));
  },

  componentDidMount: function () {
    this.questionListener = QuestionStore.addListener(this._onChange);
    ApiUtil.fetchSingleQuestion(parseInt(this.props.params.questionId));
  },

  componentWillUnmount: function () {
    this.questionListener.remove();
  },



  render: function () {
    if (!this.state.question) { return <div></div>; }
    if (this.state.edit) { return ( <QuestionEdit question={this.state.question}/> ); }

    else{
      return(
        <div className="question-show-page" onSubmit={this.handleDelete}>
          <div className="question">
            {this.state.question.title}
          </div>
          <input type="submit" value="Delete" onClick={this.handleDelete} />
          <input type="submit" value="Edit" onClick={this.handleEdit} />
        </div>
      );
    }
  }
});

module.exports = QuestionDetail;