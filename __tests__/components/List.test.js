import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { Text, ScrollView, AsyncStorage } from 'react-native';
import List from '../../src/List';

const posts = [
  { id: 1, title: 'teste', description: 'descrição' },
  { id: 2, title: 'teste', description: 'descrição' },
  { id: 3, title: 'teste', description: 'descrição' },
];

describe('Testing List', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<List />); // Carrega o componente para dentro do teste
    expect(wrapper.find(ScrollView).exists()).toBe(false);

    wrapper.setState({ posts });
    expect(wrapper.find(ScrollView).children()).toHaveLength(3);
  });

  it('shows empty message', () => {
    const wrapper = shallow(<List />);
    expect(wrapper.contains(<Text>Nenhum Post</Text>)).toBe(true);

    // adiciona os posts
    wrapper.setState({ posts });
    expect(wrapper.contains(<Text>Nenhum Post</Text>)).toBe(false);
  });

  it('can add new post', () => {
    const wrapper = shallow(<List />);
    // Procura o button através do ID
    wrapper.find({ id: 'new' }).simulate('press');

    expect(wrapper.state('posts')).toHaveLength(1);
  });

  it('can delete post', () => {
    const wrapper = shallow(<List />);
    wrapper.setState({ posts });

    wrapper.instance().deletePost(1); // pegar o primeiro

    expect(wrapper.state('posts'))
      .toEqual(posts.filter(post => post.id !== 1));
  });

  it('can save posts', () => {
    sinon.spy(AsyncStorage, 'setItem');
    const wrapper = shallow(<List />);
    wrapper.setState({ posts });

    // Procura o button através do ID
    wrapper.find({ id: 'save' }).simulate('press');

    expect(AsyncStorage.setItem.calledOnce).toBe(true);
    // AsyncStorage.setItem.args[numeroDaChama, QualParametro ]
    expect(AsyncStorage.setItem.args[0][1]).toBe(JSON.stringify(posts));
  });

  it('load posts on init', () => {
    // Faz o spy e indica um valor para retornar
    // Não é possível testar o asyncStorage corretamente, por isso,
    // precisamos simular o seu retorno.
    sinon.stub(AsyncStorage, 'getItem').returns(JSON.stringify(posts));
    const wrapper = shallow(<List />);
    expect(AsyncStorage.getItem.calledOnce).toBe(true);
    expect(AsyncStorage.getItem.returnValues[0]).toBe(JSON.stringify(posts));
  });
});
