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
import Text from 'core/components/Text';
import Styled from './styled';
import CircleRow from './CircleRow';
import { History } from '../interfaces';
import Loader from '../../Loaders/index';

type Props = {
  data: History[];
  loading: boolean;
};

const HistoryComponent = ({ data, loading }: Props) => {
  return (
    <Styled.Table>
      <Styled.TableHead>
        <Styled.TableColumn>
          <Text.h5 color="dark">Status</Text.h5>
        </Styled.TableColumn>
        <Styled.TableColumn width={2}>
          <Text.h5 color="dark">Circles</Text.h5>
        </Styled.TableColumn>
        <Styled.TableColumn>
          <Text.h5 color="dark">Last update</Text.h5>
        </Styled.TableColumn>
        <Styled.TableColumn>
          <Text.h5 color="dark">Life time</Text.h5>
        </Styled.TableColumn>
      </Styled.TableHead>
      {loading ? (
        <Loader.History />
      ) : (
        <>
          {data?.map(circle => (
            <CircleRow circle={circle} key={circle.id} />
          ))}
        </>
      )}
    </Styled.Table>
  );
};

export default HistoryComponent;
