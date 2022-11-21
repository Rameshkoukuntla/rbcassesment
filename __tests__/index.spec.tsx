


import renderer from 'react-test-renderer';

import IndexPage from '../pages/index'
it('changes the class when hovered', () => {
    const component = renderer.create(
        <IndexPage />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});