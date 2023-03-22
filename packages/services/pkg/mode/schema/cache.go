package schema

import (
	"encoding/json"
	"latticexyz/mud/packages/services/pkg/mode"
	"latticexyz/mud/packages/services/pkg/mode/config"
	"latticexyz/mud/packages/services/pkg/mode/db"
	"latticexyz/mud/packages/services/pkg/mode/ops/find"
	pb_mode "latticexyz/mud/packages/services/protobuf/go/mode"

	"go.uber.org/zap"
)

func BuildInternalTableSchemas(chains []config.ChainConfig) map[string]*mode.TableSchema {
	// Create references to all of the internal table schemas.
	tableSchemas := map[string]*mode.TableSchema{}
	for _, chain := range chains {
		// Add the block number table schema.
		blockNumberTableSchema := Internal__BlockNumberTableSchema(chain.Id)
		tableSchemas[blockNumberTableSchema.TableName] = blockNumberTableSchema

		// Add the sync status table schema.
		syncStatusTableSchema := Internal__SyncStatusTableSchema(chain.Id)
		tableSchemas[syncStatusTableSchema.TableName] = syncStatusTableSchema

		// Add the schema table schema.
		schemaTableSchema := Internal__SchemaTableSchema(chain.Id)
		tableSchemas[schemaTableSchema.TableName] = schemaTableSchema
	}
	return tableSchemas
}

func NewCache(dl *db.DatabaseLayer, chains []config.ChainConfig, logger *zap.Logger) *SchemaCache {
	return &SchemaCache{
		dl:                   dl,
		logger:               logger,
		internalTableSchemas: BuildInternalTableSchemas(chains),
	}
}

func (cache *SchemaCache) Update() error {
	return nil
}

func (cache *SchemaCache) IsInternal__BlockNumberTable(chainId string, tableName string) bool {
	return tableName == Internal__BlockNumberTableSchema(chainId).TableName
}

func (cache *SchemaCache) IsInternalTable(tableName string) bool {
	_, ok := cache.internalTableSchemas[tableName]
	return ok
}

func (cache *SchemaCache) GetTableSchema(chainId string, worldAddress string, tableName string) (*mode.TableSchema, error) {
	// If the table name is for an internal table, return schema directly.
	if cache.IsInternalTable(tableName) {
		return cache.internalTableSchemas[tableName], nil
	}

	// Otherwise lookup the schema from the internal schemas table.
	schemaTableSchema := Internal__SchemaTableSchema(chainId)
	schemaTableName := schemaTableSchema.TableName

	// Create a request builder for the table schema query.
	request := &pb_mode.FindRequest{
		From: schemaTableName,
		Filter: []*pb_mode.Filter{
			{
				Field: &pb_mode.Field{
					TableName:  schemaTableName,
					TableField: "world_address",
				},
				Operator: "=",
				Value:    worldAddress,
			},
			{
				Field: &pb_mode.Field{
					TableName:  schemaTableName,
					TableField: "table_name",
				},
				Operator: "=",
				Value:    tableName,
				Function: "LOWER",
			},
		},
		Project: []*pb_mode.ProjectedField{
			{
				Field: &pb_mode.Field{
					TableName:  schemaTableName,
					TableField: "schema",
				},
			},
		},
	}
	// Query the DB for the schema.
	builder := find.New__FromFindRequest(request, schemaTableSchema.Namespace)
	query, err := builder.ToSQLQuery()
	if err != nil {
		cache.logger.Error("failed to build query", zap.Error(err))
		return nil, err
	}
	schemaResponse := &SchemaCacheResponse{}
	err = cache.dl.Get(schemaResponse, query)
	if err != nil {
		cache.logger.Error("failed to get schema", zap.Error(err), zap.String("query", query))
		return nil, err
	}

	// Convert the schema string to a TableSchema.
	tableSchema := &mode.TableSchema{}
	err = json.Unmarshal([]byte(schemaResponse.Schema), &tableSchema)
	if err != nil {
		cache.logger.Error("failed to unmarshal schema", zap.Error(err))
		return nil, err
	}
	cache.logger.Info("got table schema", zap.String("schema", schemaResponse.Schema))

	return tableSchema, nil
}

func (cache *SchemaCache) GetTableSchemas(chainId string, worldAddress string, tableNames []string) ([]*mode.TableSchema, error) {
	tableSchemas := []*mode.TableSchema{}
	for _, tableName := range tableNames {
		tableSchema, err := cache.GetTableSchema(chainId, worldAddress, tableName)
		if err != nil {
			return nil, err
		}
		tableSchemas = append(tableSchemas, tableSchema)
	}
	return tableSchemas, nil
}
