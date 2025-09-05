export const inicialData = {
    users:[
        {
            id: 1,
            name: "Admin",
            email: "admin@example.com",
            password: "admin123",
            role: "admin"
        }
    ],

    servicos:[
        {
            id: 1,
            name: "Banho e Tosa",
            description: "Serviço completo de banho e tosa para seu pet.",
            preco: 100.00,
            categoria: "Higiene",
            duracao: "1 hora"
        },
        {
            id: 2,
            name: "Consulta Veterinária",
            description: "Consulta completa com nosso veterinário especializado.",
            preco: 150.00,
            categoria: "Saúde",
            duracao: "30 minutos"

        },
        {
            id: 3,
            name: "Adestramento Básico",
            description: "Aulas de adestramento básico para seu cão.",
            preco: 200.00,
            categoria: "Treinamento",
            duracao: "1 hora"

        },
        {
            id: 4,
            name: "Hospedagem",
            description: "Hospedagem confortável e segura para seu pet.",
            preco: 80.00,
            categoria: "Hospedagem",
            duracao: "Por dia"

        },
        {
            id: 5,
            name: "Pet Sitting",
            description: "Cuidadores experientes para cuidar do seu pet em casa.",
            preco: 60.00,
            categoria: "Cuidados",
            duracao: "Por hora"
        }
    ]
}
