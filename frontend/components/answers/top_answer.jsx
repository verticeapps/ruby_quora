var React = require('react');
var PropTypes = React.PropTypes;
var ApiUtil = require('../../util/api_util.js');
var AnswerForm = require('../questions/question_index_answer_form');
var UserStore = require('../../stores/user_store');


var TopAnswer = React.createClass({
	getInitialState: function() {
		return {
			submitter: {}
		};
	},

	_onChange: function() {
		if (this.props.question.answers[0]){
			
		var user = UserStore.find(this.props.question.answers[0].user_id);
		this.setState({ submitter: user});}
	},

	componentDidMount: function() {
		this.userListener = UserStore.addListener(this._onChange);
		if (this.props.question.answers[0]) ApiUtil.fetchSingleUser(this.props.question.answers[0].user_id);
	},

	componentWillUnmount: function() {
		this.userListener.remove();
	},

	render: function() {
		if (!this.props.question.answers || (this.props.question.answers.length === 0) || !this.state.submitter) {
			return(<div className="top-answer-body">This question hasn't been answered!</div>)
		}
		else {
			var displayed = this.props.question.answers[0].body;
			var userInfo;
			if (typeof this.state.submitter !== "undefined"){
				userInfo = this.state.submitter.username;
			}

			return (
				<div className="top-answer group">
					<div className="top-answer-submitter group">
						<img className="index-user-pic"  />
						<a href={"/#/main/users/" + this.state.submitter.id} className="top-answer-user-info"> {userInfo}</a>
					</div>
					<div className="top-answer-body">{displayed}</div>
				</div>
			);}
	}

});

module.exports = TopAnswer;
