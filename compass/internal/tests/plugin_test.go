/*
 *
 *  Copyright 2020 ZUP IT SERVICOS EM TECNOLOGIA E INOVACAO SA
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

package tests

import (
	"compass/internal/plugin"
	"os"
	"testing"

	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
)

type SuitePlugins struct {
	suite.Suite

	repository plugin.UseCases
}

func (s *SuitePlugins) SetupSuite() {
	os.Setenv("ENV", "TEST")
	s.repository = plugin.NewMain()
}

func TestInitPlugins(t *testing.T) {
	suite.Run(t, new(SuitePlugins))
}

func (s *SuitePlugins) TestFindAll() {
	expectedPlugins := []plugin.Plugin{
		{
			Name: "Google Analytics",
			Src:  "google_analytics",
		},
		{
			Name: "Prometheus",
			Src:  "prometheus",
		},
	}

	os.Setenv("PLUGINS_DIR", "../../plugins")
	plugins, err := s.repository.FindAll()
	require.NoError(s.T(), err)

	for i, p := range plugins {
		require.Equal(s.T(), expectedPlugins[i], p)
	}
}

func (s *SuitePlugins) TestFindAllNoSuchDirectory() {
	os.Setenv("PLUGINS_DIR", "./plugin")

	_, err := s.repository.FindAll()
	require.Error(s.T(), err)
}
