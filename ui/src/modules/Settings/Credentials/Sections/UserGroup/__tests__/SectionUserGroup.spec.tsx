import React from 'react';
import { render, screen, getByText, fireEvent } from 'unit-test/testUtils';
import SectionUserGroup from '..';

test('render UserGroup default component', () => {
  render(<SectionUserGroup 
          form={null}
          setForm={jest.fn}
          data={[]} 
        />);

  expect(screen.getByText('User group')).toBeInTheDocument();
  expect(screen.getByText('Add User group')).toBeInTheDocument();
});

test.only('should return 20 user groups', () => {
  render(<SectionUserGroup 
            form={null}
            setForm={jest.fn}
            data={[]} 
          />);
  //clica no btn 'add group'
  const buttonAddUserGroup = screen.getByText('Add User group');
  expect(buttonAddUserGroup).toBeInTheDocument();
  fireEvent.click(buttonAddUserGroup);
  //request é feito, aparece 20 user groups
});

test('should use parameter to filter search by name', () => {
  //clica no btn 'add group'
  //request é feito, aparece 20 user groups
  //usuario digita group q nao esta nesses 20
  //uma requisicao é feita para esse group
  //usuario seleciona esse grupo
});


