import React from 'react';
import { Button } from 'react-native';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Post from '../../src/Post';

const post = { id: 1, title: 'Teste', description: 'Testando' };

describe('Testing Post', () => {
  it('can delete post', () => {
    // DeletePostSpy faz referência ao onDelete do componente List
    const deletePostSpy = sinon.spy();

    const wrapper = shallow(<Post post={post} onDelete={deletePostSpy} />);

    wrapper.find(Button).simulate('press');

    expect(deletePostSpy.withArgs(post.id).calledOnce).toBe(true);
  });
});
