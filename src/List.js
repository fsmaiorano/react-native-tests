import React from 'react';
import { View, Text, ScrollView, Button, AsyncStorage } from 'react-native';
import Post from './Post';

class List extends React.Component {
  state = {
    posts: [],
  }

  async componentDidMount() {
    const posts = JSON.parse(await AsyncStorage.getItem('@TestRN:posts'));
    this.setState({ posts });
  }

  addPost = () => {
    this.setState({
      posts: [
        ...this.state.posts,
        { id: Math.random(), title: 'Post Aleatório', description: 'Teste' },
      ],
    });
  }

  deletePost = (id) => {
    this.setState({
      posts: this.state.posts.filter(posts => posts.id !== id),
    });
  }

  savePosts = async () => {
    await AsyncStorage.setItem('@TestRN:posts', JSON.stringify(this.state.posts));
  }

  renderPosts = () => (
    <ScrollView>
      {
        this.state.posts.map(post => <Post key={post.id} post={post} onDelete={this.deletePost} />)
      }
    </ScrollView>
  )

  render() {
    return (
      <View>
        {
          this.state.posts.length > 0
            ? this.renderPosts()
            : <Text>Nenhum Post</Text>
        }
        <Button id="new" title="Add Post" onPress={this.addPost} />
        <Button id="save" title="Save" onPress={this.savePosts} />
      </View>
    );
  }
}

export default List;
