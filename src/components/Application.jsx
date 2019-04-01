import React, { Component } from 'react';
import Posts from './Posts';
import { fireStore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';

class Application extends Component {
  state = {
    posts: []
  };

  unsubscribe;

  // handleCreate = async post => {
  //   const { posts } = this.state;
  //   const docRef = await fireStore.collection('posts').add(post);
    
  //   // NOT NEEDED - We register to onSnapshot in componentDidMount!
  //   // const doc = await docRef.get();
  //   // const newPost = collectIdsAndDocs(doc);
  //   // this.setState({ posts: [newPost, ...posts] });
  // };

  // handleRemove = async id => {
  //   // const doc = await fireStore.collection('posts').doc(id);
  //   // await doc.delete();

  //   await fireStore.doc(`posts/${id}`).delete();
    
  //   // NOT NEEDED - We register to onSnapshot in componentDidMount!
  //   // this.setState({
  //   //   posts: this.state.posts.filter(p => p.id !== id)
  //   // });
  // };

  componentDidMount = async () => {
    // const snapshot = await fireStore.collection('posts').get();

    // const posts = snapshot.docs.map(collectIdsAndDocs);
    // this.setState({ posts });

    this.unsubscribe = fireStore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  render() {
    const { posts } = this.state;

    return (
      <main className='Application'>
        <h1>Think Piece</h1>
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
