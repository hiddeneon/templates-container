export type Template = {
    id: number;
    name: string;
    category: string;
    content: string;
    userid: string,
};

export type Symbol = {
    id: number;
    symbol: string;
    created_at: string;
};

export type Templates = Template[];