/*
 * Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import { getByTestId, render, wait, waitForElement, screen } from 'unit-test/testUtils';
import { accessTokenKey, clearSession, refreshTokenKey, setAccessToken } from 'core/utils/auth';
import { getProfileByKey } from 'core/utils/profile';
import { FetchMock } from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import { setIsMicrofrontend } from 'App';
import Routes from '../Routes';

const originalWindow = { ...window };
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXJsZXNjZEB6dXAuY29tLmJyIn0.-FFlThOUdBvFBV36CaUxkzjGujyrF7mViuPhgdURe_k';
const user = {
  id: '1',
  name: 'charlescd',
  email: 'charlescd@zup.com.br',
  workspaces: [{ id: '1', name: 'workspace' }]
}

// jest.mock('core/constants/routes', () => {
//   return {
//     routes: {
//       baseName: '/',
//       workspaces: '/workspaces',
//       error403: '/error/403',
//       error404: '/error/404'
//     }
//   };
// });

jest.mock('react-cookies', () => {
  return {
    __esModule: true,
    load: () => {
      return '';
    },
    remove:  (key: string, options: object) => {
      return `mock remove ${key}`;
    }
  };
});

beforeEach(() => {
  clearSession();
})

afterEach(() => {
  window = originalWindow;
});

test('render default route', async () => {
  render(<MemoryRouter><Routes /></MemoryRouter>);
  await wait(() => expect(screen.queryByTestId('sidebar')).toBeInTheDocument());
});

// test('render with a valid session', async () => {
//   delete window.location;

//   Object.assign(window, { CHARLESCD_ENVIRONMENT: { REACT_APP_IDM: '1' } });

//   // await wait(() => setAccessToken(token));
//   setAccessToken(token);

//   window.location = {
//     ...window.location,
//     href: '',
//     pathname: '',
//   };

//   (fetch as FetchMock).mockResponse(JSON.stringify({
//     id: '1',
//     name: 'charlescd',
//     email: 'charlescd@zup.com.br',
//     workspaces: [{ id: '1', name: 'workspace' }]
//   }));

//   // await waitForElement(() => render(<Routes />));
//   render(<MemoryRouter><Routes /></MemoryRouter>);
//   await wait(() => expect(screen.queryByTestId('sidebar')).toBeInTheDocument());
  
//   const accessToken = localStorage.getItem(accessTokenKey);
//   expect(accessToken).toContain(token);
  
//   const email = getProfileByKey('email');
//   expect(email).toMatch(user.email);
// });

// test('render with an invalid session', async () => {
//   delete window.location;

//   Object.assign(window, { CHARLESCD_ENVIRONMENT: { REACT_APP_IDM: '1' } });

//   await wait(() => setAccessToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiY2hhcmxlc2NkIn0.YmbNSxCZZldr6pH1l3q_4SImIYeDaIgJazVEhy134T0'));

//   window.location = {
//     ...window.location,
//     href: '',
//     pathname: '',
//   };

//   await waitForElement(() => render(<Routes />));

//   const name = getProfileByKey('name');
//   expect(name).toBeUndefined();
// });

// test('render and valid login saving the session', async () => {
//   delete window.location;

//   Object.assign(window, { CHARLESCD_ENVIRONMENT: { REACT_APP_IDM: '1' } });

//   window.location = {
//     ...window.location,
//     href: '?code=321',
//     pathname: '',
//   };

//   (fetch as FetchMock).mockResponseOnce(JSON.stringify({
//     'access_token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYXJsZXNjZEB6dXAuY29tLmJyIn0.-FFlThOUdBvFBV36CaUxkzjGujyrF7mViuPhgdURe_k',
//     'refresh_token': 'opqrstuvwxyz'
//   }));

//   (fetch as FetchMock).mockResponseOnce(JSON.stringify({
//     id: '1',
//     name: 'charlescd',
//     email: 'charlescd@zup.com.br',
//     workspaces: [{ id: '1', name: 'workspace' }]
//   }));

//   await waitForElement(() => render(<Routes />));
  
//   const accessToken = localStorage.getItem(accessTokenKey);
//   expect(accessToken).toContain(token);
  
//   const refreshToken = localStorage.getItem(refreshTokenKey);
//   expect(refreshToken).toContain('opqrstuvwxyz');

//   const email = getProfileByKey('email');
//   expect(email).toMatch(user.email);
// });

// test('render main in microfrontend mode', async () => {
//   setIsMicrofrontend(true);
//   setAccessToken(
//     'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJUWVhieWtWSDNQLXhDMU5iTTZsQ2NJQ1BDbE54S0FMREZ4ZWNUcWZsNlFzIn0.eyJleHAiOjE1ODkzMjg2NDEsImlhdCI6MTU4OTMyNTA0MSwianRpIjoiZWMwYzZmODMtNzJlOC00YjAxLWE1NjctZTk2Mjg3Y2FlYzdkIiwiaXNzIjoiaHR0cHM6Ly9jaGFybGVzLWtleWNsb2FrLmNvbnRpbnVvdXNwbGF0Zm9ybS5jb20vYXV0aC9yZWFsbXMvZGFyd2luIiwiYXVkIjpbImRhcndpbi1jbGllbnQiLCJhY2NvdW50Il0sInN1YiI6IjJlNjIzYzE2LTNlMDctNDA4Yi04ODcwLTQ4YjkxZDZmZDY5OSIsInR5cCI6IkJlYXJlciIsImF6cCI6ImRhcndpbi1jbGllbnQiLCJzZXNzaW9uX3N0YXRlIjoiZjU4ZGEwNzQtOGY1ZC00OGNiLTliYzktODM0MmNlMDBmZDcwIiwiYWNyIjoiMSIsImFsbG93ZWQtb3JpZ2lucyI6WyIqIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJtb292ZV9yZWFkIiwiY29uZmlnX3dyaXRlIiwiYWRtaW4iLCJjaXJjbGVfcmVhZCIsImNpcmNsZV93cml0ZSIsIm1vZHVsZV9yZWFkIiwiYnVpbGRfcmVhZCIsImRlcGxveV9yZWFkIiwiZGVwbG95X3dyaXRlIiwiYnVpbGRfd3JpdGUiLCJvZmZsaW5lX2FjY2VzcyIsImNvbmZpZ19yZWFkIiwibW9kdWxlX3dyaXRlIiwidW1hX2F1dGhvcml6YXRpb24iLCJtb292ZV93cml0ZSJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc1Jvb3QiOnRydWUsIm5hbWUiOiJkYXJ3aW5hZG1pbiIsIndvcmtzcGFjZXMiOlt7ImlkIjoiOTI1MDdlYWYtOThjMS00OGViLTkzMGYtZWI2Y2YzZjA0MTMwIiwicGVybWlzc2lvbnMiOlsibWFpbnRlbmFuY2Vfd3JpdGUiLCJkZXBsb3lfd3JpdGUiLCJjaXJjbGVzX3JlYWQiLCJjaXJjbGVzX3dyaXRlIiwibW9kdWxlc19yZWFkIiwibW9kdWxlc193cml0ZSJdfSx7ImlkIjoiZTZmZWEzZDAtYjVjYi00OTIwLThjNjctZDNjNjc4MDEyZjRiIiwicGVybWlzc2lvbnMiOlsibWFpbnRlbmFuY2Vfd3JpdGUiLCJjaXJjbGVzX3dyaXRlIiwibW9kdWxlc193cml0ZSIsImh5cG90aGVzaXNfcmVhZCJdfSx7ImlkIjoiMGJjOTg2NTMtOTRkYy00OTRhLWJkZmYtOWQxN2Q0MTI3Yzg2IiwicGVybWlzc2lvbnMiOlsiaHlwb3RoZXNpc193cml0ZSIsIm1vZHVsZXNfcmVhZCIsIm1vZHVsZXNfd3JpdGUiLCJjaXJjbGVzX3JlYWQiLCJoeXBvdGhlc2lzX3JlYWQiLCJjaXJjbGVzX3dyaXRlIiwiZGVwbG95X3dyaXRlIl19XSwicHJlZmVycmVkX3VzZXJuYW1lIjoiZGFyd2luYWRtaW5AenVwLmNvbS5iciIsImdpdmVuX25hbWUiOiJkYXJ3aW5hZG1pbiIsImVtYWlsIjoiZGFyd2luYWRtaW5AenVwLmNvbS5iciJ9.FAAdXjA7T2zIcpxEIMe_Xk24DO415zmKqSWDLh4trJpj_b6ZtL1BBYId1d6fggylPUYhEqVWTrfEfMlc7p1KwWqgTSl5YzdOvi0OSuLkh9yHbLK2G26I5pIDmKWEBf7IaaWb0J2D_f-qKjQ9Mq9p9XrXlnGPPnk32EMtti4zt9SYvgBeGwR0g-6CVKiO_YNgCK8xAaaq7TRJfOb4nxpaPswNpUtG4A4BihiJcg0DsriqMOGSy2HmYPWSUW0kSi2DTGqLIuFyTrO7APZwBzsiSI0ObHzw9h8gbNK5PIYhXUtxnY-razcU7wtZgxWj0s08Q1cNZk8dwlEd1v6_b6Csvg'
//   );

//   const { getByTestId } = render(
//     <MemoryRouter>
//       <Routes />
//     </MemoryRouter>
//   );

//   await wait(() => expect(
//     getByTestId('menu-workspaces').getAttribute('href')).toContain('/charlescd')
//   );
// });