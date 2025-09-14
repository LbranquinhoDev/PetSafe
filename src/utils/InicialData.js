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
            name: "Tosa Completa",
            description: "Tosa completa para deixar seu pet lindo e confortável.",
            preco: 80.00,
            categoria: "Higiene",
            duracao: "1 hora"

        },
        {
            id: 4,
            name: "Day Care",
            description: "Cuidados diários para seu pet enquanto você trabalha.",
            preco: 45.00,
            categoria: "Cuidados",
            duracao: "Por dia"

        }
        
    ]
}
export const inicializeData = () => {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(inicialData.users));
    }
    if (!localStorage.getItem("servicos")) {
        localStorage.setItem("servicos", JSON.stringify(inicialData.servicos));
    }
    
}
