package update

import (
	"latticexyz/mud/packages/services/pkg/mode"
	pb_mode "latticexyz/mud/packages/services/protobuf/go/mode"
	"strings"
)

// UpdateBuilder is a builder for updating records in a table.
type UpdateBuilder struct {
	Request     *pb_mode.UpdateRequest
	TableSchema *mode.TableSchema
}

// NewUpdateBuilder creates a new instance of UpdateBuilder and initializes it with the specified UpdateRequest and TableSchema objects.
//
// Parameters:
//   - request (*pb_mode.UpdateRequest): a pointer to an UpdateRequest object containing the details of the update operation to be performed
//   - tableSchema (*mode.TableSchema): a pointer to a TableSchema object containing the details of the table to be updated
//
// Returns:
//   - (*UpdateBuilder): a pointer to a newly created UpdateBuilder instance initialized with the provided UpdateRequest and TableSchema objects
func NewUpdateBuilder(request *pb_mode.UpdateRequest, tableSchema *mode.TableSchema) *UpdateBuilder {
	return &UpdateBuilder{
		Request:     request,
		TableSchema: tableSchema,
	}
}

// Validate validates the request specified in the UpdateBuilder instance. It returns an error
// if the request is invalid, and nil otherwise.
//
// Returns:
// - (error): An error, if the request is invalid, and nil otherwise.
func (builder *UpdateBuilder) Validate() error {
	return nil
}

// BuildUpdateRowFromKV constructs a string representing an update row for an SQL query from a map of field-value pairs and a list of field names.
// The resulting string has the format "field1 = 'value1', field2 = 'value2', ...", where each field-value pair corresponds to a field name and a
// value in the row map. The list of field names is used to ensure that the fields in the resulting string are ordered consistently.
//
// Parameters:
//   - row (map[string]string): a map of field-value pairs representing the updated row
//   - fieldNames ([]string): a list of field names corresponding to the fields in the updated row
//
// Returns:
//   - (string): a string representing the updated row in the format "field1 = 'value1', field2 = 'value2', ..."
func (builder *UpdateBuilder) BuildUpdateRowFromKV(row map[string]string, fieldNames []string) string {
	rowStr := ""
	for idx, field := range fieldNames {
		// Skip fields that are not being updated.
		if _, ok := row[field]; !ok {
			continue
		}
		// Handle array fields.
		if strings.Contains(builder.TableSchema.PostgresTypes[field], "[]") {
			rowStr = rowStr + field + ` = ` + `ARRAY['` + row[field] + `']`
		} else
		// Handle bytea raw byte fields.
		if builder.TableSchema.PostgresTypes[field] == "bytea" {
			rowStr = rowStr + field + ` = ` + "'\\" + row[field][1:] + `'`
		} else {
			rowStr = rowStr + field + ` = ` + `'` + row[field] + `'`
		}
		if idx != len(fieldNames)-1 {
			rowStr = rowStr + `, `
		}
	}
	return rowStr
}

// BuildUpdate constructs an UPDATE SQL query string based on the values specified in the UpdateBuilder's Request field.
// The table to be updated is specified in the Request's Target field, while the updated row is specified in the Request's Row field.
//
// Returns:
//   - (string): a string representing the UPDATE SQL query generated by the function
func (builder *UpdateBuilder) BuildUpdate() string {
	request := builder.Request

	var query strings.Builder
	query.WriteString("UPDATE " + request.Target + " SET " + builder.BuildUpdateRowFromKV(request.Row, builder.TableSchema.FieldNames))
	return query.String()
}

// BuildFilter constructs a WHERE clause for the UpdateBuilder's SQL query string based on the filter
// criteria specified in the Request's Filter field. If the Request's Filter field is empty, an empty string is returned.
// Otherwise, the function constructs a WHERE clause string consisting of one or more filter conditions joined by logical
// AND operators.
//
// Returns:
//   - (string): a string representing the WHERE clause of the UPDATE SQL query generated by the function
func (builder *UpdateBuilder) BuildFilter() string {
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
		query.WriteString(" '")
		query.WriteString(filter.Value)
		query.WriteString("' ")

		if idx < len(request.Filter)-1 {
			query.WriteString(" AND ")
		}
	}

	return query.String()
}

// ToSQLQuery returns the complete SQL query string generated by the UpdateBuilder, which consists of
// the UPDATE statement constructed by BuildUpdate() and the WHERE clause constructed by BuildFilter().
//
// Returns:
//   - (string): a string representing the complete SQL query generated by the function
func (builder *UpdateBuilder) ToSQLQuery() string {
	var query strings.Builder
	query.WriteString(builder.BuildUpdate())
	query.WriteString(builder.BuildFilter())
	return query.String()
}
