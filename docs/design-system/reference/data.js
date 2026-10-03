/* Conteúdo e receitas de demonstração. Revisar antes de produção. */
(() => {
  const methods={
    v60:{
      name:'V60',ratio:16,grind:'Média-fina',time:'3–4 min',level:'Intermediário',icon:'coffee',desc:'Uma xícara limpa, com espaço para perceber cada nota.',steps:[['Prepare o filtro','Encaixe e enxágue o filtro. Descarte a água usada no enxágue.'],['Adicione o café','Use a quantidade da receita e umedeça todo o pó. Espere cerca de 30 segundos.'],['Complete a água','Despeje aos poucos, em movimentos circulares. Use o tempo como referência.']]
    }
    ,
    aeropress:{
      name:'AeroPress',ratio:15,grind:'Média-fina',time:'2–3 min',level:'Versátil',icon:'cylinder',desc:'Imersão e pressão para explorar diferentes receitas.',steps:[['Monte sobre a xícara','Coloque o filtro na tampa e encaixe na câmara, apoiada sobre uma xícara firme.'],['Misture café e água','Adicione o café e a água da receita. Mexa suavemente e deixe em infusão.'],['Pressione devagar','Encaixe o êmbolo e pressione com cuidado. Siga as orientações do seu equipamento.']]
    }
    ,
    prensa:{
      name:'Prensa francesa',ratio:15,grind:'Grossa',time:'4 min',level:'Fácil',icon:'glass-water',desc:'Mais corpo e uma rotina simples, sem filtro de papel.',steps:[['Adicione o café','Coloque o café de moagem grossa na prensa.'],['Deixe em infusão','Adicione a água da receita, mexa suavemente e aguarde cerca de 4 minutos.'],['Pressione e sirva','Abaixe o êmbolo devagar e transfira a bebida para a xícara.']]
    }
    ,
    coado:{
      name:'Coado de papel',ratio:16,grind:'Média',time:'3–4 min',level:'Fácil',icon:'filter',desc:'O ritual do dia a dia, com um resultado suave e familiar.',steps:[['Prepare o coador','Encaixe e enxágue o filtro de papel. Descarte a água.'],['Umedeça o café','Adicione o café e um pouco da água da receita. Espere cerca de 30 segundos.'],['Complete o preparo','Adicione o restante da água aos poucos e deixe filtrar.']]
    }
    ,
    moka:{
      name:'Moka italiana',ratio:null,grind:'Conforme fabricante',time:'Varia por tamanho',level:'Fogão',icon:'flame',desc:'Uma bebida concentrada. A medida acompanha o tamanho da cafeteira.',steps:[['Respeite o reservatório','Coloque água abaixo da válvula de segurança, conforme o fabricante.'],['Preencha o funil','Adicione café sem prensar e monte a cafeteira corretamente.'],['Aqueça com cuidado','Siga o tempo e a intensidade de fogo indicados para seu modelo.']]
    }
  }
  ;
  const grains=[{
    name:'Bourbon',profile:'Doçura e equilíbrio',notes:'Chocolate · caramelo · frutas',body:'Corpo mais presente'
  }
  ,{
    name:'Catuaí',profile:'Versátil na xícara',notes:'Frutas · doçura · equilíbrio',body:'Perfil varia com a origem'
  }
  ,{
    name:'Bourbon Amarelo',profile:'Doçura em destaque',notes:'Mel · frutas · caramelo',body:'Explore torras diferentes'
  }
  ,{
    name:'Geisha',profile:'Delicado e aromático',notes:'Floral · frutas · delicadeza',body:'Experimente em filtrados'
  }
  ,{
    name:'Acaiá',profile:'Um café para descobrir',notes:'Chocolate · frutas secas',body:'Perfil varia com a origem'
  }
  ,{
    name:'Icatu',profile:'Corpo e doçura',notes:'Cacau · chocolate',body:'Experimente seu método favorito'
  }
  ];
  const grainDetails={
    'Bourbon':{
      history:'O nome vem da antiga Ilha de Bourbon, hoje Reunião. A variedade foi levada do Iêmen à ilha no início do século XVIII e depois se espalhou pela África e pelas Américas. Sua chegada ao Brasil é situada por volta de 1860. É uma variedade importante na história do arábica e está na origem de outras variedades cultivadas hoje.',source:'https://varieties.worldcoffeeresearch.org/varieties/bourbon',publisher:'World Coffee Research',sensory:'Use chocolate, caramelo e frutas como pontos de partida. Perceba a relação entre doçura, acidez e a sensação de corpo, sem esperar que todo Bourbon tenha o mesmo sabor.',taste:'Comece procurando a doçura. Depois observe a acidez e a sensação que permanece na boca. Anotar suas impressões ajuda a comparar os próximos preparos.',cultivation:'Bourbon é cultivado em diferentes regiões. Ao escolher um lote, veja sua procedência e altitude específicas; uma faixa genérica da variedade não descreve todos os cafés que levam esse nome.',brew:'Comece com a receita base do método que você já usa. Compare uma mudança de cada vez: quantidade de café, moagem ou tempo. Registre o que deixou a xícara mais agradável para você.',pairing:'Experimente com chocolate ao leite, pão ou um queijo suave. Prove o café antes e depois de uma mordida para perceber como a combinação altera sua percepção.',methods:['v60','aeropress','prensa']
    }
    ,
    'Catuaí':{
      history:'Desenvolvido pelo Instituto Agronômico (IAC), em Campinas, o Catuaí vem do cruzamento entre Mundo Novo e Caturra. O cruzamento foi realizado em 1949 e a variedade foi lançada no Brasil em 1972. Existem seleções de frutos amarelos e vermelhos. Seu porte baixo e produtividade ajudaram a torná-lo importante na cafeicultura.',source:'https://varieties.worldcoffeeresearch.org/varieties/catuai',publisher:'World Coffee Research',sensory:'Explore a doçura e procure notas de frutas no seu lote. Use o corpo e a acidez para comparar origens e torras, em vez de esperar um perfil único para todos os Catuaís.',taste:'Faça dois preparos do mesmo lote e mude apenas uma variável. Compare o equilíbrio que você percebe em cada xícara.',cultivation:'Existem diversas linhagens e regiões produtoras de Catuaí. Anote a fazenda, a região e a altitude do lote para tornar suas comparações mais úteis.',brew:'Escolha seu método habitual e use a receita base. Um registro simples da quantidade de água, café e tempo ajuda a repetir o resultado de que você gostou.',pairing:'Como experiência, compare o café sozinho e acompanhado de pão, bolo simples ou frutas. Escolha sua combinação preferida a partir do lote que está provando.',methods:['coado','v60','aeropress']
    }
    ,
    'Bourbon Amarelo':{
      history:'O Bourbon Amarelo faz parte da história do melhoramento do café no Brasil. O IAC reúne diferentes linhagens dessa variedade entre suas cultivares de excelente qualidade de bebida. Suas seleções têm nomes próprios, como IAC J2 e IAC J9; por isso, saber a linhagem e o produtor acrescenta contexto à variedade.',source:'https://www.iac.sp.gov.br/produtoseservicos/orgulhonacional/programa_cafe.php?lang=pt',publisher:'Instituto Agronômico (IAC)',sensory:'Use mel, caramelo e frutas como referências para explorar a doçura. Compare o que você encontra na xícara com a descrição do produtor.',taste:'Observe a doçura ao longo dos goles. Tente separar aroma, textura e sabor para descrever melhor sua experiência.',cultivation:'Procure a altitude e a região informadas para o lote. O nome Bourbon Amarelo não substitui a identificação da fazenda, da linhagem e do processo.',brew:'Comece com um método conhecido e registre as medidas. Ajuste uma variável por vez até encontrar seu equilíbrio preferido.',pairing:'Experimente pão amanteigado ou bolo simples como acompanhamento. Use pequenas porções para continuar percebendo as nuances da bebida.',methods:['v60','coado','aeropress']
    }
    ,
    'Geisha':{
      history:'O Geisha associado ao Panamá tem origem em material coletado em florestas da Etiópia na década de 1930. Passou por instituições de pesquisa e chegou à América Central, sendo distribuído no Panamá nos anos 1960. A World Coffee Research distingue a linhagem panamenha T2722 de outros materiais também chamados Geisha ou Gesha.',source:'https://varieties.worldcoffeeresearch.org/varieties/geisha-panama',publisher:'World Coffee Research',sensory:'O Geisha panamenho é conhecido por aromas delicados, que podem lembrar flores, jasmim e pêssego. Use essas referências como convite à observação, sem tratar as notas como garantia de todo lote.',taste:'Dê atenção ao aroma e prove sem acompanhamento no primeiro momento. Compare a percepção em diferentes temperaturas de consumo.',cultivation:'A origem e a identificação do material importam: nem todos os cafés chamados Geisha são geneticamente iguais. Consulte também a região, altitude e informações do produtor.',brew:'Use uma receita que você consiga repetir e evite mudar várias medidas de uma vez. Um preparo conhecido facilita perceber as diferenças do grão.',pairing:'Prove primeiro o café sozinho. Depois, se quiser, compare com um biscoito simples ou fruta de sabor suave.',methods:['v60','coado','aeropress']
    }
    ,
    'Acaiá':{
      history:'Acaiá integra o conjunto de cultivares desenvolvidas pelo IAC. Seus registros incluem seleções de 1977, caracterizadas por produtividade elevada e sementes grandes. Conhecer o nome da seleção e sua origem ajuda a distinguir os diferentes lotes encontrados no mercado.',source:'https://www.iac.sp.gov.br/cultivares/inicio/resultados_quantitativos_view.php?pesquisa=Caf%C3%A9',publisher:'Instituto Agronômico (IAC)',sensory:'Procure referências de chocolate e frutas secas e observe o corpo. Compare suas impressões com as notas descritas para o lote.',taste:'Concentre-se na textura e no sabor que fica após o gole. Compare uma receita mais leve com outra mais intensa para descobrir sua preferência.',cultivation:'A região e a altitude pertencem à história do lote. Consulte a embalagem ou a torrefação para conhecer a procedência do café que você está preparando.',brew:'Comece pela receita base e anote as quantidades. Mantenha o método constante durante a comparação de diferentes grãos.',pairing:'Experimente com pão, castanhas ou um pedaço de chocolate. Trate a harmonização como uma descoberta pessoal.',methods:['coado','prensa','v60']
    }
    ,
    'Icatu':{
      history:'O grupo Icatu está entre as cultivares do programa de café do IAC. Inclui seleções de frutos vermelhos e amarelos, além do Icatu Precoce. O instituto registra diferentes características entre essas seleções; conhecer o nome completo e o produtor ajuda a identificar melhor cada café.',source:'https://www.iac.sp.gov.br/produtoseservicos/orgulhonacional/programa_cafe.php?lang=pt',publisher:'Instituto Agronômico (IAC)',sensory:'Explore referências de cacau e chocolate. Observe como a doçura e a textura aparecem no lote e na receita escolhidos.',taste:'Compare a sensação de corpo e o sabor residual. Uma anotação curta já ajuda a reconhecer o que você prefere.',cultivation:'Procure o nome completo da cultivar, a região e a altitude do lote. Essas informações contextualizam o grão além do nome Icatu.',brew:'Use o preparo que melhor combina com sua rotina. Ajuste o volume na calculadora e compare intensidades sem mudar as outras variáveis.',pairing:'Experimente uma pequena porção de chocolate ou um acompanhamento de sabor neutro e compare com o café puro.',methods:['prensa','coado','aeropress']
    }
    ,
    'Arábica':{
      history:'Arábica é o nome da espécie Coffea arabica. Dentro dela existe uma grande diversidade de variedades, como Bourbon e Catuaí. Por isso, uma embalagem que informa apenas “100% arábica” ainda deixa espaço para descobrir variedade, origem, processamento e torra.',source:'https://varieties.worldcoffeeresearch.org/arabica',publisher:'World Coffee Research',sensory:'Não existe um único perfil que represente todos os arábicas. Use as notas descritas para seu lote e suas próprias impressões como guia.',taste:'Comece anotando três coisas: aroma, sensação de corpo e sabor que fica depois do gole. Seu vocabulário pode crescer a cada café.',cultivation:'Arábica reúne cafés de regiões muito diferentes. Para conhecer a altitude e a origem do seu café, consulte a informação do lote, não apenas a espécie.',brew:'Você pode começar pela receita base do método mesmo sem saber a variedade. Use o grão que já tem e ajuste ao seu gosto.',pairing:'Primeiro prove o café sozinho. Depois compare com o acompanhamento que você já gosta, observando o que muda na experiência.',methods:['v60','coado','prensa']
    }
  }
  ;
  const arabicaInfo={
    name:'Arábica',profile:'Uma espécie, muitas descobertas.',notes:'Origens · variedades · diversidade',body:'Conheça a espécie'
  }
  ;
  window.CoffeeLoversData = {
    methods, grains, grainDetails, arabicaInfo
  }
  ;
}
)();
