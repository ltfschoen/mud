package mode

import (
	"latticexyz/mud/packages/services/protobuf/go/mode"
	"strings"
)

type FindBuilder struct {
	Request *mode.FindRequest
}

func NewFindBuilder(request *mode.FindRequest) *FindBuilder {
	return &FindBuilder{
		Request: request,
	}
}

func (builder *FindBuilder) Validate() error {
	return nil
}

/*
grpcurl -plaintext -d '{"from": "component_position", "filter": [{"field": {"table_name": "test", "table_field": "x"}, "operator": ">", "value": "0" }, {"field": {"table_name": "test", "table_field": "y"}, "operator": ">", "value": "0" }],  "project": [{"field": {"table_name": "test", "table_field": "x"}}, {"field": {"table_name": "test", "table_field": "y"}}] }' localhost:50091 mode.QueryLayer/Find
grpcurl -plaintext -d '{"from": "component_stake", "filter": [],  "project": [] }' localhost:50091 mode.QueryLayer/Find
*/

func (builder *FindBuilder) BuildFilter() string {
	request := builder.Request

	if len(request.Filter) == 0 {
		return ""
	}

	var query strings.Builder
	query.WriteString(" WHERE ")
	for idx, filter := range request.Filter {
		query.WriteString(filter.Field.TableName + "." + filter.Field.TableField)
		query.WriteString(" ")
		query.WriteString(filter.Operator)
		query.WriteString(" ")
		query.WriteString(filter.Value)

		if idx < len(request.Filter)-1 {
			query.WriteString(" AND ")
		}
	}

	return query.String()
}

func (builder *FindBuilder) BuildFrom() string {
	var query strings.Builder
	query.WriteString(" FROM " + builder.Request.From)
	return query.String()
}

func (builder *FindBuilder) BuildProjection() string {
	request := builder.Request

	var query strings.Builder
	query.WriteString("SELECT ")

	if len(request.Project) == 0 {
		query.WriteString("*")
		return query.String()
	}

	for idx, projection := range request.Project {
		query.WriteString(projection.Field.TableName + "." + projection.Field.TableField)
		if projection.Rename != nil {
			query.WriteString(" AS " + *projection.Rename)
		}
		if idx < len(request.Project)-1 {
			query.WriteString(", ")
		}
	}
	return query.String()
}

// TODO: if favorable comments about query structure, then can refactor this to return an
// intermediary representation of MODE "stage" to reuse code for JOINs, etc.
func (builder *FindBuilder) ToSQLQuery() (string, error) {
	err := builder.Validate()
	if err != nil {
		return "", err
	}

	var query strings.Builder

	query.WriteString(builder.BuildProjection())
	query.WriteString(builder.BuildFrom())
	query.WriteString(builder.BuildFilter())

	return query.String(), nil
}
