package applicationhealth

import (
	"compass/internal/datasource"
	"compass/internal/plugin"
)

type UseCases interface {
	BasicHealth(circleID string, workspaceID string)
}

type Main struct {
	datasourceMain datasource.UseCases
	pluginMain     plugin.UseCases
}

func NewMain(
	datasourceMain datasource.UseCases, pluginMain plugin.UseCases,
) UseCases {
	return Main{datasourceMain, pluginMain}
}
