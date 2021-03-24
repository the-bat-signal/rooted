import React from 'react';
import {db} from '../../server/firebase'


const cherokee = async () => {
  const data = await db.collection("languages").doc('cherokee').get();
  console.log('this is data!!!!', data.data().coordinates)
}

class SingleLanguage extends React.Component {

  render() {
    cherokee();
    return (
      <div>
        <h3>Language Name Here</h3>
        <p>information, history, etc xxxxxx xxxx xxxxxxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx  xxxxx xxxx xxxxxxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx  xxxxx xxxx xxxxxxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx xxxxxx xxxx xxxx  </p>

      </div>
    )
  }
}


export default SingleLanguage
