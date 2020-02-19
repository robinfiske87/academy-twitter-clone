import React from 'react';

import { getTweetById, deleteTweet, editTweet } from '../services/tweets';




class EditTweet extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          tweet: {},
          isLoading: false,
          error: null
      }
  }

  async componentDidMount() {
      try {
          const { id } = this.props.match.params;
          console.log({ match: this.props.match })
          this.setState({ isLoading: true });
          const tweet = await getTweetById(id);
          this.setState({
              tweet,
              isLoading: false
          });
      } catch (error) {
          this.setState({ error });
      }
  }

  handleInputChange(field, event) {
      const { tweet } = this.state;
      tweet[field] = event.target.value;
      this.setState({
          tweet
      })
  }



  handleEditSubmit(event) {
      event.preventDefault();
      const { history } = this.props;
      editTweet(this.state.tweet).then(() => {
          history.replace(`/home`)
      });

  }



  handleDeleteBtn(event) {
    event.preventDefault();
    const { history } = this.props;
    deleteTweet(this.state.tweet.id).then(() => {
        history.replace(`/home`)
    });
}



  render() {
      const { tweet } = this.state;

      return (
          <div>
    
    
              <h3>Edit tweet</h3>
              <form className="form tweet-form">
                
                  <label htmlFor="message">
                      Description
                  <input type="text" name="message" value={tweet.message || ''}
                          onChange={this.handleInputChange.bind(this, 'message')} />
                  </label>
                  
              </form>



          
              <button onClick={this.handleEditSubmit.bind(this)} className="actionBtn">Edit tweet</button>
            
              <button onClick={this.handleDeleteBtn.bind(this)} className="actionBtn">Delete</button>


          </div>
      )

  }

}

export default EditTweet;


