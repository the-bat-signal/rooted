import React from 'react';
import {db} from '../../server/firebase'


const cherokee = db.collection("languages").doc('cherokee').get().then(console.log('hiii'));

class SingleLanguage extends React.Component {

  render() {
    console.log('this is cherokee----', cherokee)
    return (
      <div>
        <h3>Language Name Here</h3>
        <p>information, history, etc xxxxxx xxxx xxxxxxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx  xxxxx xxxx xxxxxxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx  xxxxx xxxx xxxxxxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx  </p>

      </div>
    )
  }
}


export default SingleLanguage
