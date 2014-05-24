var _ = require('underscore');

var REGIOES = [
  { sigla: 'S',  nome: 'Sul'          },
  { sigla: 'SE', nome: 'Sudeste'      },
  { sigla: 'CO', nome: 'Centro-Oeste' },
  { sigla: 'N',  nome: 'Norte'        },
  { sigla: 'NE', nome: 'Nordeste'     },
];

var ESTADOS = [
  { sigla: "AC", regiao: 'N',  nome: "Acre"                },
  { sigla: "AL", regiao: 'NE', nome: "Alagoas"             },
  { sigla: "AM", regiao: 'N',  nome: "Amazonas"            },
  { sigla: "AP", regiao: 'N',  nome: "Amapá"               },
  { sigla: "BA", regiao: 'NE', nome: "Bahia"               },
  { sigla: "CE", regiao: 'NE', nome: "Ceará"               },
  { sigla: "DF", regiao: 'CO', nome: "Distrito Federal"    },
  { sigla: "ES", regiao: 'SE', nome: "Espírito Santo"      },
  { sigla: "GO", regiao: 'CO', nome: "Goiás"               },
  { sigla: "MA", regiao: 'NE', nome: "Maranhão"            },
  { sigla: "MG", regiao: 'SE', nome: "Minas Gerais"        },
  { sigla: "MS", regiao: 'CO', nome: "Mato Grosso do Sul"  },
  { sigla: "MT", regiao: 'CO', nome: "Mato Grosso"         },
  { sigla: "PA", regiao: 'N',  nome: "Pará"                },
  { sigla: "PB", regiao: 'NE', nome: "Paraíba"             },
  { sigla: "PE", regiao: 'NE', nome: "Pernambuco"          },
  { sigla: "PI", regiao: 'NE', nome: "Piauí"               },
  { sigla: "PR", regiao: 'S',  nome: "Paraná"              },
  { sigla: "RJ", regiao: 'SE', nome: "Rio de Janeiro"      },
  { sigla: "RN", regiao: 'NE', nome: "Rio Grande do Norte" },
  { sigla: "RO", regiao: 'N',  nome: "Rondônia"            },
  { sigla: "RR", regiao: 'N',  nome: "Roraima"             },
  { sigla: "RS", regiao: 'S',  nome: "Rio Grande do Sul"   },
  { sigla: "SC", regiao: 'S',  nome: "Santa Catarina"      },
  { sigla: "SE", regiao: 'NE', nome: "Sergipe"             },
  { sigla: "SP", regiao: 'SE', nome: "São Paulo"           },
  { sigla: "TO", regiao: 'N',  nome: "Tocantins"           }
];


var promisedRoute = require('../promised_route');
module.exports = function(app) {
  app.get('/regioes', promisedRoute(function(req, res) {
    return REGIOES;
  }));

  app.get('/estados', promisedRoute(function(req, res) {
    if (req.query.regiao) {
      return _(ESTADOS).where({ regiao: req.query.regiao.toUpperCase() });
    }
    return ESTADOS;
  }));
};
