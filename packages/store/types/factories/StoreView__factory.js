/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { utils, Contract, ContractFactory } from "ethers";
const _abi = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "length",
                type: "uint256",
            },
        ],
        name: "SchemaLib_InvalidLength",
        type: "error",
    },
    {
        inputs: [],
        name: "SchemaLib_StaticTypeAfterDynamicType",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "table",
                type: "uint256",
            },
        ],
        name: "StoreCore_TableAlreadyExists",
        type: "error",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "table",
                type: "uint256",
            },
        ],
        name: "StoreCore_TableNotFound",
        type: "error",
    },
    {
        inputs: [],
        name: "StoreView_NotImplemented",
        type: "error",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "table",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes32[]",
                name: "key",
                type: "bytes32[]",
            },
        ],
        name: "StoreDeleteRecord",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "table",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes32[]",
                name: "key",
                type: "bytes32[]",
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "schemaIndex",
                type: "uint8",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "StoreSetField",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint256",
                name: "table",
                type: "uint256",
            },
            {
                indexed: false,
                internalType: "bytes32[]",
                name: "key",
                type: "bytes32[]",
            },
            {
                indexed: false,
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        name: "StoreSetRecord",
        type: "event",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
            },
        ],
        name: "deleteRecord",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "table",
                type: "uint256",
            },
            {
                internalType: "bytes32[]",
                name: "key",
                type: "bytes32[]",
            },
            {
                internalType: "uint8",
                name: "schemaIndex",
                type: "uint8",
            },
        ],
        name: "getField",
        outputs: [
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "table",
                type: "uint256",
            },
            {
                internalType: "bytes32[]",
                name: "key",
                type: "bytes32[]",
            },
            {
                internalType: "Schema",
                name: "schema",
                type: "bytes32",
            },
        ],
        name: "getRecord",
        outputs: [
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "table",
                type: "uint256",
            },
            {
                internalType: "bytes32[]",
                name: "key",
                type: "bytes32[]",
            },
        ],
        name: "getRecord",
        outputs: [
            {
                internalType: "bytes",
                name: "data",
                type: "bytes",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "table",
                type: "uint256",
            },
        ],
        name: "getSchema",
        outputs: [
            {
                internalType: "Schema",
                name: "schema",
                type: "bytes32",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "isStore",
        outputs: [],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "Schema",
                name: "",
                type: "bytes32",
            },
        ],
        name: "registerSchema",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "contract IStoreHook",
                name: "",
                type: "address",
            },
        ],
        name: "registerStoreHook",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
            },
            {
                internalType: "uint8",
                name: "",
                type: "uint8",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "setField",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "string",
                name: "",
                type: "string",
            },
            {
                internalType: "string[]",
                name: "",
                type: "string[]",
            },
        ],
        name: "setMetadata",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
            {
                internalType: "bytes32[]",
                name: "",
                type: "bytes32[]",
            },
            {
                internalType: "bytes",
                name: "",
                type: "bytes",
            },
        ],
        name: "setRecord",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
];
const _bytecode = "0x60806040523480156200001157600080fd5b50620000276200002d60201b620002ac1760201c565b62000d9c565b62000061600080516020620026cb83398151915260001c6200005b605f6200008d60201b620002ef1760201c565b62000110565b620000766200017360201b620003671760201c565b6200008b620001b360201b620003981760201c565b565b604080516001808252818301909252600091829190602080830190803683370190505090508281600081518110620000c957620000c962000bc3565b602002602001019060c5811115620000e557620000e562000bd9565b908160c5811115620000fb57620000fb62000bd9565b9052506200010981620001e2565b9392505050565b6200012681620003c460201b620003c41760201c565b6200013182620005b4565b156200015857604051632fe94bd160e11b8152600481018390526024015b60405180910390fd5b6200016f8282620005dd60201b620005921760201c565b5050565b6200008b7f06b5dc7e596fa43e25167e48d832e4c70496213f6ed3461c2907e02250aa88a7620001a2620006f9565b6200078860201b620006901760201c565b6200008b7f15985d03d398bf6f1a658e500e78fbbf35cd784646b3998d4f26a9a9e441a627620001a26200080d565b6000601c825111156200020e578151604051635318beb960e01b81526004016200014f91815260200190565b60008060008060005b865181101562000321576000620002698883815181106200023c576200023c62000bc3565b602002602001015160c581111562000258576200025862000bd9565b6200089860201b620007201760201c565b905061ffff811615620002ab5782156200029657604051633c795af960e21b815260040160405180910390fd5b83620002a28162000c05565b945050620002b0565b600192505b620002bc818662000c27565b94506200031586620002d084600462000c50565b8a8581518110620002e557620002e562000bc3565b602002602001015160c581111562000301576200030162000bd9565b60f81b6200095f60201b620007d11760201c565b95505060010162000217565b50600082875162000333919062000c6b565b9050600e8160ff1611156200036157604051635318beb960e01b815260ff821660048201526024016200014f565b6200037d8560008660f01b6200099560201b620008071760201c565b94506200039b8560028560f81b6200095f60201b620007d11760201c565b9450620003b98560038360f81b6200095f60201b620007d11760201c565b979650505050505050565b620003da81620009b360201b6200083d1760201c565b15620003fd57604051635318beb960e01b8152600060048201526024016200014f565b60006200041582620009b760201b620008411760201c565b60ff169050600e8111156200044157604051635318beb960e01b8152600481018290526024016200014f565b60006200045983620009da60201b620008521760201c565b60ff169050601c6200046c838362000c50565b11156200049c576200047f828262000c50565b604051635318beb960e01b81526004016200014f91815260200190565b60008060005b620004ae858562000c50565b81101562000562576000620004ea620004d68389620009f460201b6200085e1790919060201c565b60c581111562000258576200025862000bd9565b111562000527578381106200051257604051633c795af960e21b815260040160405180910390fd5b826200051e8162000c91565b93505062000559565b838110156200054957604051633c795af960e21b815260040160405180910390fd5b81620005558162000c91565b9250505b600101620004a2565b508282146200058857604051635318beb960e01b8152600481018390526024016200014f565b838114620005ad57604051635318beb960e01b8152600481018290526024016200014f565b5050505050565b6000620005d6620005c58362000a30565b620009b360201b6200083d1760201c565b1592915050565b604080516001808252818301909252600091602080830190803683370190505090508260001b8160008151811062000619576200061962000bc3565b6020908102919091010152600062000641600080516020620026cb8339815191528362000a4e565b90506200066f816200065e8562000aa660201b6200088a1760201c565b62000aa960201b6200060c1760201c565b7f89c69f1332d0769f7fc2e4abeff42a2e0fcbfe7116617ad379b620bf0e08879f600080516020620026cb83398151915260001c83620006ba8662000aa660201b6200088a1760201c565b604051602001620006cd91815260200190565b60408051601f1981840301815290829052620006eb93929162000cea565b60405180910390a150505050565b6040805160018082528183019092526000918291906020808301908036833701905050905060c38160008151811062000736576200073662000bc3565b602002602001019060c581111562000752576200075262000bd9565b908160c581111562000768576200076862000bd9565b815250506200078281620001e260201b6200088d1760201c565b91505090565b6200079262000aad565b15620007af576200016f82826200011060201b62000aba1760201c565b604051630440a07f60e51b8152600481018390526024810182905233906388140fe090604401600060405180830381600087803b158015620007f057600080fd5b505af115801562000805573d6000803e3d6000fd5b505050505050565b6040805160028082526060820183526000928392919060208301908036833701905050905060c5816000815181106200084a576200084a62000bc3565b602002602001019060c581111562000866576200086662000bd9565b908160c58111156200087c576200087c62000bd9565b8152505060c48160018151811062000736576200073662000bc3565b6000808260c5811115620008b057620008b062000bd9565b60ff1690506020811015620008cc576200010981600162000c50565b6040811015620008f1576020620008e582600162000c50565b62000109919062000d58565b60608110156200090a576040620008e582600162000c50565b60608360c581111562000921576200092162000bd9565b03620009305750600192915050565b60618360c581111562000947576200094762000bd9565b03620009565750601492915050565b50600092915050565b6008820281811c7fff0000000000000000000000000000000000000000000000000000000000000090911c198416179392505050565b6008820281811c6001600160f01b031990911c198416179392505050565b1590565b6000620009d182600362000b2260201b6200086f1760201c565b60f81c92915050565b6000620009d182600262000b2260201b6200086f1760201c565b600062000a198362000a0884600462000c50565b62000b2260201b6200086f1760201c565b60f81c60c581111562000109576200010962000bd9565b600062000a488262000b2960201b62000b101760201c565b92915050565b60007f86425bff6b57326c7859e89024fe4f238ca327a1ae4a230180dd2f0e88aaa7d9838360405160200162000a879392919062000d72565b60408051601f1981840301815291905280516020909101209392505050565b90565b9055565b6000303b80820362000ac157600191505090565b306001600160a01b031663a5c2f0076040518163ffffffff1660e01b815260040160006040518083038186803b15801562000afb57600080fd5b505afa92505050801562000b0d575060015b62000b1a57600091505090565b600191505090565b6008021b90565b604080516001808252818301909252600091829190602080830190803683370190505090508260001b8160008151811062000b685762000b6862000bc3565b602002602001018181525050600062000b9f600080516020620026cb83398151915260001c8362000a4e60201b62000b8d1760201c565b905062000bb78162000bbf60201b62000be31760201c565b949350505050565b5490565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600060ff821660ff810362000c1e5762000c1e62000bef565b60010192915050565b600061ffff80831681851680830382111562000c475762000c4762000bef565b01949350505050565b6000821982111562000c665762000c6662000bef565b500190565b600060ff821660ff84168082101562000c885762000c8862000bef565b90039392505050565b60006001820162000ca65762000ca662000bef565b5060010190565b600081518084526020808501945080840160005b8381101562000cdf5781518752958201959082019060010162000cc1565b509495945050505050565b8381526000602060608184015262000d06606084018662000cad565b8381036040850152845180825260005b8181101562000d3357868101840151838201850152830162000d16565b8181111562000d455760008483850101525b50601f01601f1916010195945050505050565b60008282101562000d6d5762000d6d62000bef565b500390565b83815282602082015260606040820152600062000d93606083018462000cad565b95945050505050565b61191f8062000dac6000396000f3fe608060405234801561001057600080fd5b50600436106100c95760003560e01c806391c45d2211610081578063a5c2f0071161005b578063a5c2f007146100e1578063d4a0126e1461016f578063d99ddc071461018257600080fd5b806391c45d2214610133578063971eb6cb14610141578063a2d3d4fb1461014f57600080fd5b80632b26fb29116100b25780632b26fb29146100f1578063651a0d1a1461011757806388140fe01461012557600080fd5b806307ff106e146100ce578063174e23be146100e3575b600080fd5b6100e16100dc366004611294565b610195565b005b6100e16100dc36600461136b565b6101046100ff3660046113e5565b6101c7565b6040519081526020015b60405180910390f35b6100e16100dc3660046113fe565b6100e16100dc366004611467565b6100e16100dc36600461149f565b6100e16100dc36600461152c565b61016261015d366004611578565b6101d8565b60405161010e9190611618565b61016261017d36600461162b565b610224565b61016261019036600461152c565b610265565b6040517fbf834eb800000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b60006101d282610be7565b92915050565b606061021985858580806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250879250610bf2915050565b95945050505050565b565b606061021985858580806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250879250610d57915050565b60606102a484848480806020026020016040519081016040528093929190818152602001838360200280828437600092019190915250610d7292505050565b949350505050565b6102df7f466b87090ce2bc34362737dab7b900dfc94a202aee6a6323f6813f7ce59d975e6102da605f6102ef565b610aba565b6102e7610367565b610222610398565b6040805160018082528183019092526000918291906020808301908036833701905050905082816000815181106103285761032861169f565b602002602001019060c5811115610341576103416116b5565b908160c5811115610354576103546116b5565b9052506103608161088d565b9392505050565b6102227f06b5dc7e596fa43e25167e48d832e4c70496213f6ed3461c2907e02250aa88a7610393610dc6565b610690565b6102227f15985d03d398bf6f1a658e500e78fbbf35cd784646b3998d4f26a9a9e441a627610393610e3e565b806103ea57604051635318beb960e01b8152600060048201526024015b60405180910390fd5b60006103f582610841565b60ff169050600e81111561041f57604051635318beb960e01b8152600481018290526024016103e1565b600061042a83610852565b60ff169050601c61043b83836116e1565b11156104675761044b82826116e1565b604051635318beb960e01b81526004016103e191815260200190565b60008060005b61047785856116e1565b8110156105445760006104a361048d888461085e565b60c581111561049e5761049e6116b5565b610720565b11156104f4578381106104e2576040517ff1e56be400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b826104ec816116f9565b93505061053c565b8381101561052e576040517ff1e56be400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b81610538816116f9565b9250505b60010161046d565b5082821461056857604051635318beb960e01b8152600481018390526024016103e1565b83811461058b57604051635318beb960e01b8152600481018290526024016103e1565b5050505050565b604080516001808252818301909252600091602080830190803683370190505090508260001b816000815181106105cb576105cb61169f565b602090810291909101015260006106027f466b87090ce2bc34362737dab7b900dfc94a202aee6a6323f6813f7ce59d975e83610b8d565b8381559050610610565b9055565b7f89c69f1332d0769f7fc2e4abeff42a2e0fcbfe7116617ad379b620bf0e08879f7f466b87090ce2bc34362737dab7b900dfc94a202aee6a6323f6813f7ce59d975e838560405160200161066691815260200190565b60408051601f198184030181529082905261068293929161174e565b60405180910390a150505050565b610698610ebd565b156106ab576106a78282610aba565b5050565b6040517f88140fe0000000000000000000000000000000000000000000000000000000008152600481018390526024810182905233906388140fe090604401600060405180830381600087803b15801561070457600080fd5b505af1158015610718573d6000803e3d6000fd5b505050505050565b6000808260c5811115610735576107356116b5565b60ff169050602081101561074e576103608160016116e1565b604081101561076e5760206107648260016116e1565b6103609190611783565b60608110156107845760406107648260016116e1565b60608360c5811115610798576107986116b5565b036107a65750600192915050565b60618360c58111156107ba576107ba6116b5565b036107c85750601492915050565b50600092915050565b6008820281811c7fff0000000000000000000000000000000000000000000000000000000000000090911c198416179392505050565b6008820281811c7fffff00000000000000000000000000000000000000000000000000000000000090911c198416179392505050565b1590565b6000601882901b5b60f81c92915050565b6000601082901b610849565b60006108768361086f8460046116e1565b6008021b90565b60f81c60c5811115610360576103606116b5565b90565b6000601c825111156108b7578151604051635318beb960e01b81526004016103e191815260200190565b60008060008060005b86518110156109de5760006108f98883815181106108e0576108e061169f565b602002602001015160c581111561049e5761049e6116b5565b905061ffff81161561094f57821561093d576040517ff1e56be400000000000000000000000000000000000000000000000000000000815260040160405180910390fd5b836109478161179a565b945050610954565b600192505b61095e81866117b9565b94506109d38661096f8460046116e1565b8a85815181106109815761098161169f565b602002602001015160c581111561099a5761099a6116b5565b60f81b6008820281811c7fff0000000000000000000000000000000000000000000000000000000000000090911c198416179392505050565b9550506001016108c0565b5060008287516109ee91906117df565b9050600e8160ff161115610a1a57604051635318beb960e01b815260ff821660048201526024016103e1565b60e01b7cff00000000000000000000000000000000000000000000000000000000167fffff0000ffffffffffffffffffffffffffffffffffffffffffffffffffffffff60f09490941b939093167bffffffffffffffffffffffffffffffffffffffffffffffffffffffff9094169390931760e89190911b7dff00000000000000000000000000000000000000000000000000000000001617179392505050565b610ac3816103c4565b610acc82610f3b565b15610b06576040517f5fd297a2000000000000000000000000000000000000000000000000000000008152600481018390526024016103e1565b6106a78282610592565b604080516001808252818301909252600091829190602080830190803683370190505090508260001b81600081518110610b4c57610b4c61169f565b60209081029190910101526000610b837f466b87090ce2bc34362737dab7b900dfc94a202aee6a6323f6813f7ce59d975e83610b8d565b90506102a4815490565b60007f86425bff6b57326c7859e89024fe4f238ca327a1ae4a230180dd2f0e88aaa7d98383604051602001610bc493929190611802565b60408051601f1981840301815291905280516020909101209392505050565b5490565b60006101d282610b10565b60606000610c008360f01c90565b905080600080610c0f86610841565b60ff1690508015610c5a57610c248888610f50565b91506000610c328360e01c90565b1115610c5a57610c428260e01c90565b610c4d9060206116e1565b610c5790846116e1565b92505b60008367ffffffffffffffff811115610c7557610c75611689565b6040519080825280601f01601f191660200182016040528015610c9f576020820181803683370190505b50905060208101610cb28a8a8884610f5d565b610cbc8460e01c90565b600003610cd0575094506103609350505050565b610cda86826116e1565b8481529050610cea6020826116e1565b905060005b838160ff161015610d48576000610d078c8c84610f84565b90506000610d188760ff8516610fdd565b9050610d27828260008761100f565b610d3181856116e1565b935050508080610d409061179a565b915050610cef565b50909998505050505050505050565b60606000610d6485610be7565b9050610219858585846110c4565b60606000610d7f84610be7565b905080610dbb576040517f3a545452000000000000000000000000000000000000000000000000000000008152600481018590526024016103e1565b6102a4848483610bf2565b6040805160018082528183019092526000918291906020808301908036833701905050905060c381600081518110610e0057610e0061169f565b602002602001019060c5811115610e1957610e196116b5565b908160c5811115610e2c57610e2c6116b5565b905250610e388161088d565b91505090565b6040805160028082526060820183526000928392919060208301908036833701905050905060c581600081518110610e7857610e7861169f565b602002602001019060c5811115610e9157610e916116b5565b908160c5811115610ea457610ea46116b5565b8152505060c481600181518110610e0057610e0061169f565b6000303b808203610ed057600191505090565b3073ffffffffffffffffffffffffffffffffffffffff1663a5c2f0076040518163ffffffff1660e01b815260040160006040518083038186803b158015610f1657600080fd5b505afa925050508015610f27575060015b610f3357600091505090565b600191505090565b6000610f4961083d83610be7565b1592915050565b600080610b8384846110fb565b8115610f7e576000610f6f8585610b8d565b905061058b818460008561100f565b50505050565b60007f86425bff6b57326c7859e89024fe4f238ca327a1ae4a230180dd2f0e88aaa7d9848484604051602001610fbd9493929190611821565b60408051601f198184030181529190528051602090910120949350505050565b600080610feb836002611854565b610ff69060046116e1565b905061100484826008021b90565b60f01c949350505050565b60208204840193506020828161102757611027611873565b06915081156110785760208290036000600019600883021c1990508554600885021b811984511682821617845250818511611063575050610f7e565b61106e6001876116e1565b9550509283900392015b602083106110a0578354815261108f6001856116e1565b9350601f1990920191602001611078565b8215610f7e576000600019600885021c198251865482169119161782525050505050565b60606110cf82610852565b60ff168360ff1610156110ef576110e885858585611132565b90506102a4565b6110e885858585611192565b60007f86425bff6b57326c7859e89024fe4f238ca327a1ae4a230180dd2f0e88aaa7d98383604051602001610bc493929190611889565b606060006111438360ff861661085e565b9050600061115c8260c581111561049e5761049e6116b5565b9050600061116a8888610b8d565b9050600061117886886111eb565b905061118582848361122e565b9998505050505050505050565b6060600061119f83610852565b6111a990856117df565b905060006111b8878784610f84565b905060006111d38360ff166111cd8a8a610f50565b90610fdd565b90506111df8282611286565b98975050505050505050565b600080805b8360ff168110156112265761120861048d868361085e565b61121290836116e1565b91508061121e816116f9565b9150506111f0565b509392505050565b60608267ffffffffffffffff81111561124957611249611689565b6040519080825280601f01601f191660200182016040528015611273576020820181803683370190505b509050602081016112268585858461100f565b60606103608383600061122e565b600080604083850312156112a757600080fd5b82359150602083013573ffffffffffffffffffffffffffffffffffffffff811681146112d257600080fd5b809150509250929050565b60008083601f8401126112ef57600080fd5b50813567ffffffffffffffff81111561130757600080fd5b60208301915083602082850101111561131f57600080fd5b9250929050565b60008083601f84011261133857600080fd5b50813567ffffffffffffffff81111561135057600080fd5b6020830191508360208260051b850101111561131f57600080fd5b60008060008060006060868803121561138357600080fd5b85359450602086013567ffffffffffffffff808211156113a257600080fd5b6113ae89838a016112dd565b909650945060408801359150808211156113c757600080fd5b506113d488828901611326565b969995985093965092949392505050565b6000602082840312156113f757600080fd5b5035919050565b60008060008060006060868803121561141657600080fd5b85359450602086013567ffffffffffffffff8082111561143557600080fd5b61144189838a01611326565b9096509450604088013591508082111561145a57600080fd5b506113d4888289016112dd565b6000806040838503121561147a57600080fd5b50508035926020909101359150565b803560ff8116811461149a57600080fd5b919050565b600080600080600080608087890312156114b857600080fd5b86359550602087013567ffffffffffffffff808211156114d757600080fd5b6114e38a838b01611326565b90975095508591506114f760408a01611489565b9450606089013591508082111561150d57600080fd5b5061151a89828a016112dd565b979a9699509497509295939492505050565b60008060006040848603121561154157600080fd5b83359250602084013567ffffffffffffffff81111561155f57600080fd5b61156b86828701611326565b9497909650939450505050565b6000806000806060858703121561158e57600080fd5b84359350602085013567ffffffffffffffff8111156115ac57600080fd5b6115b887828801611326565b9598909750949560400135949350505050565b6000815180845260005b818110156115f1576020818501810151868301820152016115d5565b81811115611603576000602083870101525b50601f01601f19169290920160200192915050565b60208152600061036060208301846115cb565b6000806000806060858703121561164157600080fd5b84359350602085013567ffffffffffffffff81111561165f57600080fd5b61166b87828801611326565b909450925061167e905060408601611489565b905092959194509250565b634e487b7160e01b600052604160045260246000fd5b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052602160045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600082198211156116f4576116f46116cb565b500190565b6000600019820361170c5761170c6116cb565b5060010190565b600081518084526020808501945080840160005b8381101561174357815187529582019590820190600101611727565b509495945050505050565b8381526060602082015260006117676060830185611713565b828103604084015261177981856115cb565b9695505050505050565b600082821015611795576117956116cb565b500390565b600060ff821660ff81036117b0576117b06116cb565b60010192915050565b600061ffff8083168185168083038211156117d6576117d66116cb565b01949350505050565b600060ff821660ff8416808210156117f9576117f96116cb565b90039392505050565b8381528260208201526060604082015260006102196060830184611713565b8481528360208201526080604082015260006118406080830185611713565b905060ff8316606083015295945050505050565b600081600019048311821515161561186e5761186e6116cb565b500290565b634e487b7160e01b600052601260045260246000fd5b8381528260208201526080604082015260006118a86080830184611713565b8281036060840152600681527f6c656e677468000000000000000000000000000000000000000000000000000060208201526040810191505094935050505056fea26469706673582212204c397323bfdc54503b1dbd759649b327c21c5290e4fc0c44d2e86f8debbc0dd864736f6c634300080d0033466b87090ce2bc34362737dab7b900dfc94a202aee6a6323f6813f7ce59d975e";
const isSuperArgs = (xs) => xs.length > 1;
export class StoreView__factory extends ContractFactory {
    constructor(...args) {
        if (isSuperArgs(args)) {
            super(...args);
        }
        else {
            super(_abi, _bytecode, args[0]);
        }
        this.contractName = "StoreView";
    }
    deploy(overrides) {
        return super.deploy(overrides || {});
    }
    getDeployTransaction(overrides) {
        return super.getDeployTransaction(overrides || {});
    }
    attach(address) {
        return super.attach(address);
    }
    connect(signer) {
        return super.connect(signer);
    }
    static createInterface() {
        return new utils.Interface(_abi);
    }
    static connect(address, signerOrProvider) {
        return new Contract(address, _abi, signerOrProvider);
    }
}
StoreView__factory.bytecode = _bytecode;
StoreView__factory.abi = _abi;
