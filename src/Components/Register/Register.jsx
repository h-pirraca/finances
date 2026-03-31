import React, { useState } from 'react';
import Reg from './Register.module.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment-timezone';

const Register = () => {
  const [selectedTipo, setSelectedTipo] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedSub, setSelectedSub] = useState('');
  const [valor, setValor] = useState('')
  const [selectedDate, setSelectedDate] = useState(moment.tz('Europe/London').toDate());
  const [descricao, setDescricao] = useState('');
  const [username, setUsername] = useState('');
  const [selectedDespesaType, setSelectedDespesaType] = useState('');

  const usernames = [
    { id: 'casa', name: 'casa' },
    { id: 'hpirraca', name: 'hpirraca' },
    { id: 'nunokakoo', name: 'nunokakoo' },
  ]

  const tipoOptions = [
    { id: 'Despesas', name: 'Despesas' },
    { id: 'Rendimentos', name: 'Rendimentos' },
    { id: 'Investimentos', name: 'Investimentos' },
    { id: 'Transferências', name: 'Transferências' },
  ];

  const categoriaOptions = {
    Despesas: [
      'Casa',
      'Banco',
      'Impostos e Documentos',
      'Seguros',
      'Pet',
      'Saúde',
      'Transportes',
      'Automóvel',
      'Refeições',
      'Compras',
      'Entretenimento',
      'Subscrições',
      'Formações',
      'Despesas Esporádicas',
      'Miscelânea',
    ],
    Rendimentos: ['Salário', 'Subsídio', 'Estado', 'Passivos', 'Miscelâneo',],
    Investimentos: ['Investimentos'],
    Transferências: ['Transferências'],
  };

  const subcategoriaOptions = {
    Casa: [
      'Prestação',
      'Amortização',
      'Condominio',
      'Água',
      'Eletricidade',
      'Gás',
      'Telecomunicações',
      'Serviços',
      'Outros',
    ],
    Banco: [
      'Manutenção de Conta', 
      'Comissões', 
      'Outros'
    ],
    'Impostos e Documentos': [
      'Documentos Legais', 
      'IRS', 
      'Segurança Social', 
      'IMI', 
      'IUC', 
      'Multas', 
      'Outros'
    ],
    Seguros: [
      'Saúde', 
      'Vida', 
      'Multirriscos', 
      'Automóvel', 
      'Responsabilidade Civil', 
      'Acidentes de Trabalho', 
      'Pet', 
      'Outros'
    ],    
    Pet: [
      'Creche', 
      'Treino', 
      'Veterinário', 
      'Medicamentos', 
      'Alimentação', 
      'Treats', 
      'Brinquedos', 
      'Higiene', 
      'Outros'
    ],
    Saúde: [
      'Consultas', 
      'Urgências', 
      'Internamento', 
      'Cirurgias', 
      'Exames', 
      'Medicamentos', 
      'Materiais Farmácia', 
      'Dentista', 
      'Ginásio e Desporto', 
      'Personal Trainer', 
      'Massagem e Spa', 
      'Outros'
    ],
    Transportes: [
      'Passe', 
      'Zapping', 
      'TVDE', 
      'Outros'
    ],
    Automóvel: [
      'Combustível',
      'Estacionamento',
      'Portagens',
      'Revisão',
      'Inspeção',
      'Manutenção',
      'ACP',
      'Outros',
    ],
    Refeições: [
      'Pequeno-Almoço', 
      'Almoço', 
      'Lanche', 
      'Jantar', 
      'Ceia', 
      'Snacks', 
      'Outros'
    ],
    Compras: [
      'Supermercado', 
      'Roupa', 'Calçado', 
      'Acessórios', 
      'Bagagem', 
      'Mobília', 
      'Utensílios e Têxteis', 
      'Eletrodomésticos', 
      'Tecnologia', 
      'Materiais Obras', 
      'Peças Automóvel', 
      'Dispositivos Médicos', 
      'Outros'
    ],
    Entretenimento: [
      'Viagens e Férias',
      'Hotel',      
      'Jogos',
      'Cinema',
      'Teatro',
      'Concerto',
      'Museus',
      'Parques',
      'Passeios',
      'Atividades Radicais',
      'Outros',
    ],
    Subscrições: [
      'Telemóvel',
      'Streaming',
      'Youtube Premium',
      'Apple',
      'Office 365',
      'Antivirus e VPN',
      'Bimby Cookidoo',
      'Tractive',
      'Gaming',
      'Vigilância',
      'Entregas',
      'Outros',
      /* 
      'Telemóvel',
      'Streaming',
      'Música',
      'Servidor e Cloud',
      'Produtividade',
      'Segurança',
      'Entregas',
      'Outros'
      */
    ],
    Formações: [
      'Medicina', 
      'Engenharia', 
      'Outros'
    ],
    'Despesas Esporádicas': [
      'Prendas', 
      'Ordem dos Médicos', 
      'Cabeleireiro', 
      'Outros'
    ],
    Miscelânea: [
      'Levantamentos', 
      'Outros'
    ],
    Salário: [
      'Trabalho Dependente', 
      'Trabalho Independente', 
      'Bónus', 
      'Mesada', 
      'Pensão'
    ],
    Subsídio: [
      'Refeição', 
      'Férias', 
      'Natal'
    ],
    Estado: [
      'IRS', 
      'Doença'
    ],
    Passivos: [
      'Contas Poupança', 
      'Depósito a Prazo', 
      'Certificados Aforro', 
      'Certificados Tesouro', 
      'Lucros', 
      'Dividendos'
    ],
    Miscelâneo: [
      'Depósitos', 
      'Prendas', 
      'Prémios', 
      'Outros'
    ],
  };

  const subTipoOptions = [
    { id: 'Fixa', name: 'Fixa' },
    { id: 'Variável', name: 'Variável' },
  ]

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleTipoChange = (e) => {
    const selectedTipo = e.target.value;
    setSelectedTipo(selectedTipo);
    setSelectedCategoria('');
    setSelectedSub('');
  };

  const handleCategoriaChange = (e) => {
    const selectedCategoria = e.target.value;
    setSelectedCategoria(selectedCategoria);
    setSelectedSub('');
  };

  const handleSubChange = (e) => {
    setSelectedSub(e.target.value);
  };

  /*const handleRefChange = (e) => {
    setSelectedRef(e.target.value);
  };*/

  const handleDespesaTypeChange = (event) => {
    setSelectedDespesaType(event.target.value);
  };

  const handleValorChange = (event) => {
    setValor(event.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDescricaoChange = (event) => {
    setDescricao(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedDateISO = moment(selectedDate).format();

      const response = await fetch(process.env.REACT_APP_SERVER_LINK+'/registoFinances', { 
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({username, selectedTipo, selectedCategoria, selectedSub, selectedDespesaType, valor, selectedDate: selectedDateISO, descricao}),
      });

      if (!response.ok) {
          throw new Error('Invalid data.');
      }

      alert("Registo efetuado com sucesso");
      // Reset the form by updating the state values to their initial state
      setUsername('')
      setSelectedTipo('');
      setSelectedCategoria('');
      setSelectedSub('');
      setSelectedDespesaType('');
      setValor('');
      setSelectedDate(new Date());

  } catch (err) {
    console.log("Failed to register: " + err);
  }
  };

  return (
    <div className={Reg.FormDiv}>
      <form className={Reg.Formulario} onSubmit={handleSubmit}>
        <div>
          <select value={username} onChange={handleUsernameChange} className={Reg.Tipo}>
            <option value="">Utilizador</option>
            {usernames.map((username) => (
              <option key={username.id} value={username.id}>
                {username.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select value={selectedTipo} onChange={handleTipoChange} className={Reg.Tipo}>
            <option value="">Tipo</option>
            {tipoOptions.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select value={selectedCategoria} onChange={handleCategoriaChange} className={Reg.Categoria}>
            <option value="">Categoria</option>
            {categoriaOptions[selectedTipo]?.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select value={selectedSub} onChange={handleSubChange} className={Reg.Subcategoria}>
            <option value="">Subcategoria</option>
            {subcategoriaOptions[selectedCategoria]?.map((subcategoria) => (
              <option key={subcategoria} value={subcategoria}>
                {subcategoria}
              </option>
            ))}
          </select>
        </div>
        {/*selectedCategoria === 'Refeições' && (
          <div>
            <select value={selectedRef} onChange={handleRefChange} className={Reg.Refeicao}>
              <option value="">Refeição</option>
              {refeicaoOptions[selectedCategoria]?.map((refeicao) => (
                <option key={refeicao} value={refeicao}>
                  {refeicao}
                </option>
              ))}
            </select>
          </div>
        )*/}
        {selectedTipo === 'Despesas' && (
        <div>
          <select value={selectedDespesaType} onChange={handleDespesaTypeChange} className={Reg.Tipo}>
            <option value="">Subtipo</option>
            {subTipoOptions.map((subtipo) => (
              <option key={subtipo.id} value={subtipo.id}>
                {subtipo.name}
              </option>
            ))}
          </select>
        </div>
        )}
        <input value={valor} onChange={handleValorChange} type="text" className={Reg.Option} name="Valor" placeholder="Valor" required />
        <br />
        <div>
          <DatePicker
            wrapperClassName={Reg.DatePicker}
            className={Reg.DatePicker}
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
          />
        </div>
        <input descricao={descricao} onChange={handleDescricaoChange} type="text" className={Reg.Option} placeholder="Descrição" pattern="[^()/><\][\\\x22,;|]+" name="Descricao"/>
        <br />
        <button type="submit" onClick={handleSubmit} className={Reg.Button}>
          Registar
        </button>
      </form>
      <div>
        {/* Display selected values if needed */}
        {/* <p>Selected Tipo: {selectedTipo}</p>
        <p>Selected Categoria: {selectedCategoria}</p>
        <p>Selected Subcategoria: {selectedSub}</p>
        <p>Selected Date: {selectedDate.toLocaleDateString()}</p> */}
      </div>
    </div>
  );
};

export default Register;