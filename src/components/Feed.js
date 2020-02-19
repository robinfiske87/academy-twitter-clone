import React from 'react';
import jwtDecode from 'jwt-decode';
import { getTweets, postTweet } from '../services/tweets';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';



class Feed extends React.Component {
  constructor(props) {
    super(props);
    
    const token = localStorage.getItem('twitter_clone_token');
    let payload = {};
    try {
      payload = jwtDecode(token);
    } catch(error) {

    }

    this.state = {
      tweets: [],
      isLoading: false,
      error: null,
      message: '', 
      session: payload,
    }
  }


  async populateTweets() {
    try {
      this.setState({ isLoading: true });
      const tweets = await getTweets();
      this.setState({
        tweets,
        isLoading: false,
      });
    } catch(error) {
      this.setState({ error });
    }
  }

  async componentDidMount() {   
    if(!this.state.session.id){
      return this.props.history.replace('/');
    }
    await this.populateTweets();
  }

  handleInputChange(field, event) {
    this.setState({
      [field]: event.target.value,
    })
  }

  async handleSubmitTweet() {
    const { message } = this.state;
    
    if(!message) {
      return;
    }

    await postTweet(message);
    await this.populateTweets();
    this.setState({
      message: ''
    })
  }

  handleEditBtn(tweetId) {
    const {history} = this.props;
    history.push(`/editTweet/${tweetId}`);
}

  render() {
    const { 
      session : {
        name,
        handle,
      } = {},
      tweets: {
        result = []
      } = {},
      isLoading,
      error,
      message,
    } = this.state;

    if (error) {
      return (
      <div>Unable to fetch tweets: {error.message}</div>
      );
    }

    if (isLoading) {
      return (
        <div>Loading tweets...</div>
      );
    }

    const tweetElements = result
    .map(({ id, message, name, handle, created_at}) => {
      const timeSince = formatDistance(new Date(created_at), new Date(), {addSuffix: true});
      return (
        <div 
          key={id}
          className="tweet"
        >
    <p>
      <span className="tweet-handle">{name} (@{handle})</span>
      <span className="tweet-timestamp">{timeSince}</span>
    </p>
          <p className="tweet-message">{message}</p>
          {(this.state.session.handle === handle) && <button onClick={this.handleEditBtn.bind(this, id)} className='edit-tweet-button'>Edit tweet</button>}
        </div>
      );
    })

    return (
      <div>
    
        <h1 className="login-header">Twitter-clone</h1>
        <div className="feed-input-container">
          <h2 className="feed-subheading">Feed for {name} (@{handle})</h2>
          <textarea 
            className="feed-input"
            placeholder="What's on your mind?"
            type="text" 
            value={message}
            onChange={this.handleInputChange.bind(this, 'message')}
          />
          <button 
            onClick={this.handleSubmitTweet.bind(this)}
            className="tweet-button"
          >Tweet</button>
          <div>
            <Link 
              to="/logout"
              className="logout-link"
            >Log out</Link>
          </div>
        </div>
        <div className="tweets-container">
          {tweetElements}
        </div>
      </div>
    );
  }
}

export default Feed;