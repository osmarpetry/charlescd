package v1

import (
	"compass/internal/applicationhealth"
	"compass/web/api"
	"net/http"

	"github.com/julienschmidt/httprouter"
)

type ApplicationHealthApi struct {
	healthMain applicationhealth.UseCases
}

func (v1 V1) NewApplicationHealthApi(healthMain applicationhealth.UseCases) ApplicationHealthApi {
	apiPath := "/application-health"
	healthAPI := ApplicationHealthApi{healthMain}
	v1.Router.GET(v1.getCompletePath(apiPath+"/circle/:circleId"), api.HttpValidator(healthApi.basicHealth))
	return healthApi
}

func (applicationHealthApi ApplicationHealthApi) basicHealth(w http.ResponseWriter, r *http.Request, ps httprouter.Params, workspaceID string) {
	circleID := ps.ByName("circleId")
	applicationHealthApi.basicHealth(circleID, workspaceID)

}
